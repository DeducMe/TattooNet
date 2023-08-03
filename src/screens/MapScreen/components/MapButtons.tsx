import {View, Text, Platform} from 'react-native';
import React from 'react';
import PressableStyled from 'components/PressableStyled';
import IconComponent from 'components/Basic/IconComponent';
import useTheme from 'hooks/useTheme';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';

export type Position = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export default function MapButtons({
  mapRef,
  setPosition,
}: {
  mapRef: React.RefObject<MapView>;
  setPosition: (position: Position) => void;
}) {
  const styles = makeStyles();
  const theme = useTheme();
  const navigation = useNavigation();

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

  return (
    <View style={styles.floatingContainer}>
      <PressableStyled style={styles.floatingButton} onPress={goToUserLocation}>
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
  );
}

const makeStyles = makeStyleSheet(theme => ({
  floatingContainer: {
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
