import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import {ActionButton} from 'components/ActionButton';
import GalleryList from 'components/GalleryList';
import FindUserProfile from 'components/FindUserProfile';
import {useForm} from 'react-hook-form';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import StarBlock from 'components/StarBlock';
import {MainContext} from 'providers/MainProvider';
import {AppContext, AppPostContextProvider} from 'providers/AppProvider';

export default function CompleteTattooScreen({
  route,
}: {
  route: {params: {isMaster: boolean; id: string; masterId: string}};
}) {
  const styles = makeStyles();
  const mainContext = useContext(MainContext);
  const postContext = useContext(AppPostContextProvider);

  const [reviewText, setReviewText] = useState('');
  const [opened, setOpened] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const {isMaster, masterId, id} = route.params || {};

  function removeImage(index: number) {
    setImages(images.filter((item, i) => i !== index));
  }

  function addImage(image: string) {
    setImages(images.concat([image]));
  }

  function onChangeUser(user) {
    setSelectedUser(user);
  }

  function submitTattoo() {
    const body = {
      reviewText,
      _id: id,
      images,
      starRating,
      masterId,
    };

    postContext.tattoo.submitTattoo(body);
  }
  function onOpen(opened: boolean) {
    setOpened(opened);
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  return (
    <>
      <ScrollView scrollEnabled={!opened}>
        <SafeAreaView style={styles.container}>
          <GalleryList
            onRemove={images?.length ? removeImage : undefined}
            onAdd={addImage}
            data={images}
          />

          {!isMaster && (
            <View style={styles.marginTopPaddingContainer}>
              <StarBlock
                noNumber
                imageSize={40}
                rating={starRating}
                onPress={isMaster ? undefined : number => setStarRating(number)}
              />
            </View>
          )}
          {/* {isMaster && (
            <FindUserProfile onOpen={onOpen} onChangeUser={onChangeUser} />
          )} */}
          <View style={styles.paddingContainer}>
            {!isMaster && (
              <StyledControlledTextInput
                containerStyle={styles.reviewInput}
                control={control}
                multiline
                editable={!isMaster}
                errorMessage={''}
                name={'Text'}
                staticHolder={'Review Text'}
                onChangeText={text => setReviewText(text)}
              />
            )}

            <ActionButton
              onPress={submitTattoo}
              style={[
                {width: '100%'},
                isMaster && styles.marginTopPaddingContainer,
              ]}
              roundButton
              title={
                isMaster ? 'Complete tattoo' : 'Leave review'
              }></ActionButton>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  container: {
    flex: 1,
    marginVertical: theme.space.s,
  },
  paddingContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.space.xs,
  },
  marginTopPaddingContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.space.xs,
    marginTop: theme.space.xs,
  },
  reviewInput: {
    marginBottom: theme.space.s,
  },
}));
