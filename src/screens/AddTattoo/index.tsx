import {View, Text, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import GalleryList from 'components/GalleryList';
import {AppContext} from 'providers/AppProvider';
import useTheme from 'hooks/useTheme';
import ControlledTextInput from 'components/Basic/ControlledInputText';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from './validationSchema';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import {ActionButton} from 'components/ActionButton';
import SelectDropdown from 'react-native-select-dropdown';
import {MainContext} from 'providers/MainProvider';

export default function AddTattooScreen({
  route,
}: {
  route: {params: {type: 'completed' | 'available'}};
}) {
  const {type} = route.params;
  const context = useContext(AppContext);
  const mainContext = useContext(MainContext);
  const [selectedCurrency, setSelectedCurrency] = useState(
    mainContext.currency.currency?.[0]?._id,
  );

  const theme = useTheme();

  function addImage(image: string) {
    context.newTattoo.addImage(image);
  }

  function removeImage(index: number) {
    console.log(index);
    context.newTattoo.deleteImage(index);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({resolver: yupResolver(schema)});

  const onSubmit = async (payload: any) => {
    const {name, price, text: description} = payload;
    console.log(payload);

    if (!context.newTattoo.newTattoo?.images?.length) {
      return mainContext.toast.showError('You need to add at least one image!');
    }
    context.newTattoo.updateAndSave({
      name,
      price,
      description,
      currency: selectedCurrency,
      type,
    });

    // context.newTattoo.save();

    // await context.auth.login(payload);
  };

  const currencies = mainContext.currency.currency?.map(
    item => item.symbol + ' ' + item.name,
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!context.newTattoo.newTattoo.images?.length && (
        <>
          <View
            style={{
              backgroundColor: '#000',
              height: 350,
              width: theme.dimensions.width,
            }}></View>
        </>
      )}
      <GalleryList
        onRemove={
          context.newTattoo.newTattoo.images?.length ? removeImage : undefined
        }
        onAdd={addImage}
        data={context.newTattoo.newTattoo.images}
      />
      <View
        style={{
          width: theme.dimensions.width - theme.space.xs * 2,
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: theme.space.s,
            width: '100%',
          }}>
          <StyledControlledTextInput
            containerStyle={{width: '50%'}}
            hideTitle
            control={control}
            name="name"
            label="name"
            keyboardType={'default'}
            errorMessage={''}
            staticHolder={'Name'}></StyledControlledTextInput>
          <View
            style={{
              flexDirection: 'row',
              width: '45%',
              justifyContent: 'space-between',
            }}>
            <StyledControlledTextInput
              containerStyle={{width: '65%'}}
              hideTitle
              control={control}
              name="price"
              label="price"
              keyboardType={'number-pad'}
              errorMessage={''}
              staticHolder={'Price'}></StyledControlledTextInput>
            <SelectDropdown
              defaultButtonText={mainContext.currency.currency?.[0]?.symbol}
              defaultValue={selectedCurrency}
              rowTextStyle={{
                fontSize: theme.fontSizes.small,
                textAlign: 'left',
              }}
              selectedRowStyle={{
                height: 35,
              }}
              buttonTextStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: theme.fontSizes.small,
                width: '100%',
                marginHorizontal: 0,
              }}
              dropdownStyle={{
                marginLeft: -100,
                width: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              rowStyle={{
                width: 150,
                height: 35,
              }}
              buttonStyle={{
                width: 50,
                height: 35,
                borderWidth: 1,
                borderRadius: theme.space.xs,
              }}
              data={currencies}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setSelectedCurrency(
                  mainContext.currency.currency?.[index]?._id,
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                console.log(selectedItem);

                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return (
                  mainContext.currency.currency?.[index]?.symbol || selectedItem
                );
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>
        <StyledControlledTextInput
          containerStyle={{
            marginTop: theme.space.xs,
          }}
          hideTitle
          staticHolder="Text"
          errorMessage=""
          control={control}
          name="text"
          multiline
          inputStyle={{height: 150}}
          label="Text"></StyledControlledTextInput>
        <ActionButton
          onPress={handleSubmit(onSubmit)}
          style={{marginVertical: theme.space.s}}
          roundButton
          title="Save"></ActionButton>
      </View>
    </ScrollView>
  );
}
