import React, {useEffect, useRef} from 'react';
import BottomSheet from 'components/Basic/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {Modalize} from 'react-native-modalize';
import {View} from 'react-native';

export default function ModalScreen() {
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (modalizeRef.current) {
      modalizeRef.current?.open();
    }
  }, [modalizeRef.current]);

  return (
    <BottomSheet onClose={() => navigation.goBack()} modalizeRef={modalizeRef}>
      <View></View>
    </BottomSheet>
  );
}
