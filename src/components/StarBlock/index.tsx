import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

import FastImage from 'react-native-fast-image';
import MaskedView from '@react-native-masked-view/masked-view';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import useTheme from 'hooks/useTheme';
import CustomText from 'components/CustomText';
export default function StarBlock({
  rating,
  noNumber,
  imageSize,
  onPress,
}: {
  rating: number;
  noNumber?: boolean;
  imageSize: number;
  onPress?: (value: number) => void;
}) {
  const theme = useTheme();
  const styles = makeStyles();
  const [value, setValue] = useState(Math.floor(rating));

  const starFull = require('./star_full.png');
  const starEmpty = require('./star.png');

  const starIconStyle = {
    width: imageSize,
    height: imageSize,
  };

  const StarClickable = ({value, source}: {value: number; source: any}) => {
    return (
      <View style={{width: imageSize + 1}}>
        {!!onPress ? (
          <TouchableOpacity
            onPress={() => {
              setValue(value);
              onPress(value);
            }}>
            <FastImage style={starIconStyle} source={source || starEmpty} />
          </TouchableOpacity>
        ) : (
          <FastImage style={starIconStyle} source={source || starEmpty} />
        )}
      </View>
    );
  };

  return (
    <View style={[styles.flexRow, styles.justifyBetween, styles.alignCenter]}>
      {!noNumber && (
        <CustomText style={styles.ratingText}>{rating.toFixed(1)}</CustomText>
      )}

      <View style={styles.flexRow}>
        {Array.from({length: value}, (x, index) => {
          return (
            <StarClickable key={index} value={index + 1} source={starFull} />
          );
        })}

        {Array.from({length: 5 - value}, (x, index) => {
          return (
            <StarClickable
              key={index}
              value={value + index + 1}
              source={starEmpty}
            />
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: theme.space.xs,
  },
  mainHeaderContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15,
  },
  mainHeaderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  blockSeparator: {
    alignSelf: 'center',
    marginVertical: 15,
    height: 1,
    width: '80%',
    backgroundColor: '#C4C4C4',
  },
  logo: {
    position: 'absolute',
    top: 130,
    left: 10,
    zIndex: 1,
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#fff',
  },
  fullImageBtn: {
    position: 'absolute',
    top: 184,
    right: 10,
    zIndex: 1,
    borderRadius: 60,

    padding: 5,
    backgroundColor: '#fff',
  },
  fullImageBtnIcon: {
    width: 15,
    zIndex: 1,
    height: 15,
  },
  logoImage: {
    borderRadius: 15,

    width: 70,
    zIndex: 1,
    height: 70,
  },
  mainInfoBlockContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainInfoBlockLeftContainer: {
    width: '60%',
  },
  mainInfoBlockRightContainer: {
    width: '35%',
    maxWidth: 145,
    marginBottom: 5,
  },
  mainInfoBlockAddress: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  hoursInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openMenuBtn: {
    marginLeft: 5,
    width: 9,
    height: 5,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    marginRight: theme.space.xxs,
    alignSelf: 'flex-end',
  },
}));
