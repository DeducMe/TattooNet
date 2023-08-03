import {
  View,
  Text,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import MapSkeleton from 'components/Skeletons/Map';
import {SafeAreaView} from 'react-native-safe-area-context';
import MapView, {Marker} from 'react-native-maps';
import useTheme from 'hooks/useTheme';
import Geolocation from '@react-native-community/geolocation';
import PressableStyled from 'components/PressableStyled';
import IconComponent from 'components/Basic/IconComponent';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import {useNavigation} from '@react-navigation/native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {AppContext} from 'providers/AppProvider';
import MapButtons from './components/MapButtons';
import MasterAround from './components/MasterAround';

export default function MapScreen() {
  const theme = useTheme();
  const styles = makeStyles();
  const navigation = useNavigation();
  const mapRef = useRef<MapView>(null);
  const context = useContext(AppContext);

  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    if (!context.feed.feed?.length) context.feed.getFeed();
  }, []);

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

  function setChosenItem(number: number) {
    const location = context.feed.feed?.[number]?.master?.location;
    if (!location) return;
    const coords = {
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
    };

    mapRef.current?.animateToRegion(coords, 200);
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

  const masterMarkers = useMemo(
    () =>
      context.feed.feed.map((item, index) => ({
        key: index,
        title: item.master.name,
        coordinate: {
          latitude: item.master.location.coordinates[1],
          longitude: item.master.location.coordinates[0],
        },
      })),
    [context.feed.feed],
  );

  return (
    <>
      <View style={styles.floatingContainer}>
        <MapButtons mapRef={mapRef} setPosition={setPosition} />
        <MasterAround setChosenItem={setChosenItem}></MasterAround>
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
        initialRegion={position}>
        {masterMarkers.map((item, index) => (
          <Marker
            key={item.key}
            coordinate={item.coordinate}
            title={item.title}
          />
        ))}
      </MapView>
    </>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingContainer: {
    position: 'absolute',
    bottom: theme.common.tabNavigationHeight + theme.common.tabNavigationInset,
    justifyContent: 'center',
    zIndex: 1,
    width: theme.dimensions.width,
    alignItems: 'flex-end',
  },
}));
