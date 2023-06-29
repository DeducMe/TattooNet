import {View, Text, FlatList} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {AppContext} from 'providers/AppProvider';
import StyledControlledTextInput from 'components/StyledControlledTextInput';
import BottomSheet from 'components/Basic/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import CustomText from 'components/CustomText';
import Gravatar from 'components/Gravatar';
import {makeStyleSheet} from 'common/theme/makeStyleSheet';
import PressableStyled from 'components/PressableStyled';
import {useForm} from 'react-hook-form';
import UserItem from 'components/UserItem';

export default function FindUserProfile({
  onChangeUser,
  onOpen,
}: {
  onChangeUser: (user) => void;
  onOpen?: (opened: boolean) => void;
}) {
  const context = useContext(AppContext);
  const timeout = useRef<NodeJS.Timeout | any>(null);
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();
  const styles = makeStyles();

  const [user, setUser] = useState(null);
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (text) {
      context.profile.getUsers({
        query: text,
        page,
        limit: 10,
      });
    }
  }, [text]);

  function onChangeText(newText) {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setText(newText);
    }, 1000);
  }

  function openBottomSheet() {
    modalizeRef.current?.open();
    onOpen?.(true);
  }

  function closeBottomSheet() {
    modalizeRef.current?.close();
    onOpen?.(false);
  }

  function selectUser(item) {
    setUser(item);
    onChangeUser(item);
    closeBottomSheet();
  }

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();

  return (
    <>
      <PressableStyled onPress={openBottomSheet} style={styles.userContainer}>
        {!!user ? (
          <>
            <UserItem
              avatarStyle={styles.avatar}
              avatar={user.avatar}
              name={user.name}
            />
          </>
        ) : (
          <View>
            <CustomText>No user selected</CustomText>
          </View>
        )}
      </PressableStyled>

      <BottomSheet
        onClose={() => onOpen?.(false)}
        modalHeight={500}
        modalizeRef={modalizeRef}>
        <View style={styles.bottomSheetContainer}>
          <StyledControlledTextInput
            control={control}
            errorMessage={''}
            name={''}
            staticHolder={'Search'}
            onChangeText={onChangeText}
          />
          <FlatList
            renderItem={({item}) => {
              return (
                <PressableStyled
                  style={styles.userItemContainer}
                  onPress={() => selectUser(item)}>
                  <UserItem
                    avatarStyle={styles.avatar}
                    avatar={item.avatar}
                    name={item.name}
                  />
                </PressableStyled>
              );
            }}
            data={context.profile.users}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const makeStyles = makeStyleSheet(theme => ({
  avatar: {
    borderRadius: 30,
    width: 50,
    height: 50,
  },
  userContainer: {
    height: 60,
    marginHorizontal: theme.space.s,
    borderRadius: theme.space.s,
    marginTop: theme.space.xs,
    justifyContent: 'center',
    paddingHorizontal: theme.space.s,
    backgroundColor: theme.colors.background,
    ...theme.defaultShadow,
  },
  bottomSheetContainer: {
    paddingHorizontal: theme.space.xs,
  },
  userItemContainer: {marginTop: theme.space.xs},
}));
