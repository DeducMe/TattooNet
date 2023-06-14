import {View, Text} from 'react-native';
import React from 'react';
import {Modalize} from 'react-native-modalize';

export default function BottomSheet({
  modalizeRef,
  children,
  onClose,
}: {
  modalizeRef: any;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <>
      <Modalize
        onClose={onClose}
        ref={modalizeRef}
        avoidKeyboardLikeIOS={true}
        modalHeight={250}
        scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
        {children}
      </Modalize>
    </>
  );
}
