import {
  View,
  Text,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapSkeleton from 'components/Skeletons/Map';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import useTheme from 'hooks/useTheme';
import Geolocation from '@react-native-community/geolocation';
import PressableStyled from 'components/PressableStyled';
import IconComponent from 'components/Basic/IconComponent';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {useNavigation} from '@react-navigation/native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export default function MapScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const styles = makeStyles();

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  async function goToUserLocation() {
    if (Platform.OS === 'android')
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        });

        // do some action after the gps has been activated by the user
      } catch (error) {
        console.log(error);
      }
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      const newPosition = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };
      setPosition(newPosition);
      mapRef.current && mapRef.current.animateToRegion(newPosition, 1000);
    });
  }

  function goToFeed() {
    navigation.navigate('Feed');
  }

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === 'ios') {
        const granted = await Geolocation.requestAuthorization();
        Geolocation.setRNConfiguration({
          skipPermissionRequests: false,
          authorizationLevel: 'whenInUse',
        });
        if (granted) {
          goToUserLocation();
        }
      }

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log(granted, 'ALO');
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          goToUserLocation();
        }
      }
    }
    requestPermissions();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.floatingContainer}>
        <PressableStyled
          style={styles.floatingButton}
          onPress={goToUserLocation}>
          <IconComponent
            color={theme.colors.textColor}
            size={20}
            iconSet="FontAwesome5"
            name="location-arrow"></IconComponent>
        </PressableStyled>
        <PressableStyled style={styles.floatingButton} onPress={goToFeed}>
          <IconComponent
            color={theme.colors.textColor}
            size={25}
            iconSet="MaterialIcons"
            name="filter-list"></IconComponent>
        </PressableStyled>
      </View>

      <MapView
        ref={mapRef}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        style={{
          width: theme.dimensions.width,
          height: theme.dimensions.height,
        }}
        initialRegion={position}></MapView>
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingContainer: {
    position: 'absolute',
    bottom:
      (Platform.OS === 'android'
        ? theme.common.tabNavigationHeight * 2
        : theme.common.tabNavigationHeight) + theme.common.tabNavigationInset,

    right: theme.space.s,
    justifyContent: 'center',
    width: 50,
    zIndex: 1,
  },
  floatingButton: {
    width: 50,
    height: 50,
    marginBottom: theme.space.s,
    backgroundColor: theme.colors.background,
    borderRadius: 25,
    justifyContent: 'center',
  },
}));
