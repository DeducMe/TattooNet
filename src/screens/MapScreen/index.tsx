import {View, Text, Pressable} from 'react-native';
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

  function goToUserLocation() {
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
    goToUserLocation();
  }, []);

  return (
    <SafeAreaView>
      <PressableStyled style={styles.floatingButton} onPress={goToUserLocation}>
        <IconComponent
          color={theme.colors.textColor}
          size={20}
          iconSet="FontAwesome5"
          name="location-arrow"></IconComponent>
      </PressableStyled>
      <PressableStyled
        style={[
          styles.floatingButton,
          {
            bottom:
              theme.common.tabNavigationHeight +
              theme.common.tabNavigationInset +
              50 +
              theme.space.xs,
          },
        ]}
        onPress={goToFeed}>
        <IconComponent
          color={theme.colors.textColor}
          size={25}
          iconSet="MaterialIcons"
          name="filter-list"></IconComponent>
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
          height: theme.dimensions.height,
        }}
        initialRegion={position}></MapView>
    </SafeAreaView>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingButton: {
    position: 'absolute',
    bottom: theme.common.tabNavigationHeight + theme.common.tabNavigationInset,
    right: theme.space.s,
    width: 50,
    height: 50,
    backgroundColor: theme.colors.background,
    zIndex: 1,
    borderRadius: 25,
    justifyContent: 'center',
  },
}));
