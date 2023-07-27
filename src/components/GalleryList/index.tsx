import {View, Text, FlatList, Image, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import FastImage from 'react-native-fast-image';
import useTheme from 'hooks/useTheme';
import {ActionButton} from 'components/ActionButton';
import IconComponent from 'components/Basic/IconComponent';
// import {launchImageLibrary} from 'react-native-image-picker';
import {AppContext} from 'providers/AppProvider';
import {createFormData} from 'screens/SalonScreen/MasterScreen/components/MasterProfileHeader';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';

export default function GalleryList({
  data,
  onAdd,
  onRemove,
}: {
  data: any[];
  onAdd?: (ImageOrVideo: ImageOrVideo) => void;
  onRemove?: (index: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  function loadImage() {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      onAdd && onAdd(image);
    });
    // launchImageLibrary({mediaType: 'photo'}, async response => {
    //   if (response && response.assets && response.assets[0]) {
    //     const usrphoto = response.assets[0];
    //     const image = await createFormData(usrphoto);

    //     onAdd && onAdd('data:image/jpeg;base64,' + image);
    //   }
    // });
  }

  function removeImage() {
    onRemove && onRemove(currentPage);
  }
  const theme = useTheme();
  return (
    <View style={{height: 350, backgroundColor: theme.colors.textColor}}>
      {!!onAdd && (
        <ActionButton
          onPress={loadImage}
          roundButton
          style={{
            position: 'absolute',
            zIndex: 1,
            bottom: theme.space.m,
            right: theme.space.m,
            width: 50,
            height: 50,
            borderRadius: 25,
            ...theme.defaultShadow,
            borderWidth: 2,
            borderColor: '#fff',
          }}>
          <IconComponent
            iconSet="FontAwesome5"
            name={'plus'}
            size={25}
            color={'#fff'}
          />
        </ActionButton>
      )}
      {!!onRemove && (
        <ActionButton
          onPress={removeImage}
          roundButton
          style={{
            backgroundColor: theme.colors.error,
            position: 'absolute',
            zIndex: 1,
            bottom: theme.space.m + 50 + theme.space.s,
            right: theme.space.m,
            width: 50,
            height: 50,
            borderRadius: 25,
            ...theme.defaultShadow,
            borderWidth: 2,
            borderColor: '#fff',
          }}>
          <IconComponent
            iconSet="AntDesign"
            name={'delete'}
            color={'#fff'}
            size={25}
          />
        </ActionButton>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        onMomentumScrollEnd={e =>
          setCurrentPage(e.nativeEvent.contentOffset.x / theme.dimensions.width)
        }
        renderItem={({item, index}) => {
          let width = Math.round(300 * Math.random() * 2);
          if (width < 150) width = 150;
          if (width > theme.dimensions.width) width = theme.dimensions.width;

          let height = Math.round(300 * Math.random() * 2);
          if (height < 150) height = 150;
          if (height > theme.dimensions.width) height = theme.dimensions.width;
          return (
            <View
              style={{
                width: theme.dimensions.width,
                height: 350,
                backgroundColor: '#000',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                source={{
                  uri:
                    item ||
                    `https://picsum.photos/${width}/${height}?random=${index}`,
                }}
              />
            </View>
          );
        }}
        pagingEnabled
        data={data}
      />
    </View>
  );
}
