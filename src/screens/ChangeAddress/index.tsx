import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import useTheme from 'hooks/useTheme';
import PressableStyled from 'components/PressableStyled';
import IconComponent from 'components/Basic/IconComponent';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import CountryPicker, {ICountryPickerRef} from 'components/CountryPicker';
import {Animated} from 'react-native';
import {Platform} from 'react-native';
import {Easing} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from './validationSchema';
import {ActionButton} from 'components/ActionButton';
import {Picker} from '@react-native-picker/picker';
import {MainContext} from 'providers/MainProvider';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import Separator from 'components/Basic/Separator';
import CustomText from 'components/CustomText';
import {AppContext, CityT} from 'providers/AppProvider';
import {config} from 'common/config';
import {useNavigation} from '@react-navigation/native';

Geocoder.init('AIzaSyC0sNPvGP7hcw5OJdUwyMDQueBpaXbDlbM');

export default function ChangeAddress() {
  const mapRef = useRef<MapView>(null);
  const theme = useTheme();
  const styles = makeStyles();
  const navigation = useNavigation();
  const context = useContext(MainContext);
  const appContext = useContext(AppContext);
  const cities = context.country.city;
  const countries = context.country.country;

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [marker, setMarker] = useState({
    latitude: 10,
    longitude: 10,
  });
  const countryPickerRef = useRef<ICountryPickerRef | null>(null);
  const animCountry = useRef(new Animated.Value(0)).current;
  const [countryOpened, setCountryOpened] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
  const openingCountry = Animated.timing(animCountry, {
    toValue: Platform.OS === 'ios' ? 220 : 50,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: false,
  });
  const closingCountry = Animated.timing(animCountry, {
    toValue: 0,
    duration: 300,
    easing: Easing.ease,
    useNativeDriver: false,
  });
  const opacityCountry = animCountry.interpolate({
    inputRange: [0, Platform.OS === 'ios' ? 220 : 50],
    outputRange: [0, 1],
  });
  function handleCountryPicker() {
    countryPickerRef.current?.toggleCountry();
    if (!countryOpened) openingCountry.start();
    else closingCountry.start();
    setCountryOpened(!countryOpened);
  }

  function getCoordsFromAddress(addressString: string) {
    return Geocoder.from(addressString)
      .then(json => {
        let location = json.results[0].geometry.location;
        if (!location?.lat && !location.lng) return;
        setPosition({
          ...position,

          latitude: location.lat,
          longitude: location.lng,
        });
        setMarker({
          latitude: location.lat,
          longitude: location.lng,
        });
        mapRef.current?.animateToRegion({
          ...position,

          latitude: location.lat,
          longitude: location.lng,
        });
      })
      .catch(error => console.log(error, 'ERROR'));
  }

  function getAddressFromCoordinates({latitude, longitude}) {
    return new Promise<void>(resolve => {
      const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&lang=en-US&apiKey=${config.geocodingKey}`;
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(resJson => {
          console.log(resJson?.items[0]);
          // the response had a deeply nested structure :/
          if (resJson?.items?.[0]) {
            const foundCountry = countries.find(
              item =>
                item.name
                  .toLowerCase()
                  .includes(
                    resJson.items[0].address.countryName.toLowerCase(),
                  ) ||
                item.ISO.toLowerCase().includes(
                  resJson.items[0].address.countryCode.toLowerCase(),
                ) ||
                item.code
                  .toLowerCase()
                  .includes(resJson.items[0].address.countryCode.toLowerCase()),
            ) || {name: resJson.items[0].address.countryName};

            setMarker({
              latitude: resJson.items[0].access[0].lat,
              longitude: resJson.items[0].access[0].lng,
            });
            setSelectedCountry(foundCountry?.name);
            setValue('address', resJson.items[0].title);
            setValue('city', resJson.items[0].address.city);
            setValue('country_code', foundCountry?.name);
            resolve();
          } else {
            resolve();
          }
        })
        .catch(e => {
          console.log('Error in getAddressFromCoordinates', e);
          resolve();
        });
    });
  }

  function goToUserLocation() {
    Geolocation.getCurrentPosition(async pos => {
      const crd = pos.coords;
      const newPosition = {
        ...position,
        latitude: crd.latitude,
        longitude: crd.longitude,
      };
      setPosition(newPosition);
      mapRef.current && mapRef.current.animateToRegion(newPosition, 1000);

      await getAddressFromCoordinates({
        latitude: crd.latitude,
        longitude: crd.longitude,
      });
    });
  }

  useEffect(() => {
    handleCountryPicker();
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function checkAddress(payload: any) {
    console.log(payload);
    const {
      country_code,
      state,
      city,
      address: addressString,
      postcode,
    } = payload;
    let searchString = ``;
    if (country_code) searchString += country_code;
    if (city) searchString += `, ${city}`;
    if (addressString) searchString += `, ${addressString}`;

    await getCoordsFromAddress(searchString);
  }

  async function saveAddress(payload: any) {
    const {
      country_code,
      state,
      city,
      address: addressString,
      postcode,
    } = payload;

    let searchString = ``;
    if (country_code) searchString += country_code;
    if (city) searchString += `, ${city}`;
    if (addressString) searchString += `, ${addressString}`;

    await checkAddress(payload);
    await appContext.profile.updateAddress({
      address: searchString,
      location: marker,
    });

    navigation.goBack();
  }

  function chooseCity(item: CityT) {
    console.log(item);
    setValue('city', item.name);
    if (item.country) {
      setSelectedCountry(item.country.name);
      setValue('country_code', item.country.name);
    }
  }

  function Helper({textInput = ''}: {textInput: string}) {
    let filteredCities = cities
      .filter(item => {
        return item.country?.name === selectedCountry;
      })
      .filter(item =>
        item.name.toLowerCase().includes(textInput.toLowerCase()),
      );

    if (filteredCities?.length < 5)
      filteredCities = cities.filter(item =>
        item.name.toLowerCase().includes(textInput.toLowerCase()),
      );

    filteredCities = filteredCities.slice(0, 5);
    return (
      <View style={{width: '100%', marginTop: theme.space.xxs}}>
        {filteredCities.map(item => {
          return (
            <View style={{marginBottom: theme.space.xxs, height: 22}}>
              <PressableStyled
                onPress={() => chooseCity(item)}
                style={{width: '100%'}}>
                <CustomText>{item.name}</CustomText>
              </PressableStyled>
              <Separator style={{backgroundColor: theme.colors.contrast}} />
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <PressableStyled
          style={styles.floatingButton}
          onPress={goToUserLocation}>
          <IconComponent
            color={theme.colors.textColor}
            size={20}
            iconSet="FontAwesome5"
            name="location-arrow"></IconComponent>
        </PressableStyled>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          style={{
            width: theme.dimensions.width,
            height: 200,
          }}
          onRegionChange={region => {
            setPosition(region);
          }}
          initialRegion={position}>
          <Marker coordinate={marker} title={'Your Address'} />
        </MapView>
      </View>
      <CountryPicker
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setValue={setValue}
        ref={countryPickerRef}
        dialCode={false}
      />
      <StyledControlledTextInput
        disabledButton
        renderHelper={textInput => <Helper textInput={textInput} />}
        containerStyle={{
          marginVertical: theme.space.xs,
          paddingHorizontal: theme.space.s,
        }}
        staticHolder="City"
        errorMessage=""
        control={control}
        name="city"
        label="City"
      />
      <StyledControlledTextInput
        disabledButton
        containerStyle={{
          marginVertical: theme.space.xs,
          paddingHorizontal: theme.space.s,
        }}
        staticHolder="Address"
        errorMessage=""
        control={control}
        name="address"
        label="Address"
      />
      <ActionButton
        style={{
          marginHorizontal: theme.space.s,
          marginBottom: theme.space.xs,
        }}
        roundButton
        title="Check address"
        onPress={handleSubmit(checkAddress)}
      />
      <ActionButton
        style={{
          marginHorizontal: theme.space.s,
          marginBottom: theme.space.l,
        }}
        roundButton
        title="Save address"
        onPress={handleSubmit(saveAddress)}
      />
    </ScrollView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingButton: {
    position: 'absolute',
    top: 130 + theme.insets.top - theme.space.s,
    right: theme.space.s,
    width: 50,
    height: 50,
    backgroundColor: theme.colors.background,
    zIndex: 1,
    borderRadius: 25,
    justifyContent: 'center',
  },
}));
