import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import IconComponent from './IconComponent';
import {IconPack} from 'common/getIcon';

// TODO этот компонент точно в папку профиля и также переименуй чтобы было ясно что эта штука меняет аватар

export default function PopUpMenu() {
  const [visible, setVisible] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;
  const [avatar, setAvatar] = useState('');

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      setAvatar('data:image/jpeg;base64,' + image.data);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropperCircleOverlay: true,
      cropping: true,
      includeBase64: true,
    }).then((image: any) => {
      setAvatar('data:image/jpeg;base64,' + image.data);
    });
  };

  const options: {
    iconType: IconPack;
    action: () => void;
    title: String;
    iconName: string;
  }[] = [
    {
      title: 'Open Camera',
      iconName: 'camerao',
      iconType: 'AntDesign',
      action: () => openCamera(),
    },
    {
      title: 'Media',
      iconName: 'photo',
      iconType: 'FontAwesome',
      action: () => selectImage(),
    },
  ];

  function resizeBox(to: number) {
    to === 1 && setVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setVisible(false));
  }

  return (
    <>
      <TouchableOpacity onPress={() => resizeBox(1)}>
        <Image
          source={
            !!avatar
              ? {uri: avatar}
              : require('../../assets/default_profile_icon.png')
          }
          style={styles.image}
        />
        <Modal transparent visible={visible}>
          <SafeAreaProvider
            style={{flex: 1}}
            onTouchStart={() => {
              resizeBox(0);
            }}>
            <Animated.View
              style={[
                styles.popup,
                {
                  transform: [{scale}],
                  opacity: scale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ]}>
              {options.map((op, i) => (
                <TouchableOpacity
                  style={[
                    styles.options,
                    {borderBottomWidth: i === options.length - 1 ? 0 : 1},
                  ]}
                  key={i}
                  onPress={op.action}>
                  <Text>{op.title}</Text>
                  <IconComponent
                    iconSet={op.iconType}
                    name={op.iconName}
                    color={'black'}
                    size={25}
                  />
                </TouchableOpacity>
              ))}
            </Animated.View>
          </SafeAreaProvider>
        </Modal>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  popup: {
    width: 200,
    borderRadius: 15,
    borderColor: '#333',
    borderWidth: 1,
    // TODO юзай тему для цветов, добавляй туда по необходимости

    backgroundColor: '#fff',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 173,
    left: 160,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomColor: '#ccc',
  },
});
