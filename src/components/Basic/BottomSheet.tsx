import {View, Text} from 'react-native';
import React from 'react';
import {Modalize} from 'react-native-modalize';

export default function BottomSheet({
  modalizeRef,
  children,
  onClose,
  modalHeight = 250,
}: {
  modalizeRef: any;
  children: React.ReactNode;
  onClose?: () => void;
  modalHeight?: number;
}) {
  return (
    <>
      <Modalize
        onClose={onClose}
        ref={modalizeRef}
        avoidKeyboardLikeIOS={true}
        modalHeight={modalHeight}
        scrollViewProps={{keyboardShouldPersistTaps: 'handled'}}>
        {children}
      </Modalize>
    </>
  );
}
