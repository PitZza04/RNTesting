import {useModalControls, useModals} from '#/state/modals';
import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useRef} from 'react';

import * as ConfirmModal from './Confirm';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createCustomBackdrop} from '../util/BottomSheetCustomBackdrop';

const HANDLE_HEIGHT = 24;
const DEFAULT_SNAPPOINTS = ['90%'];

export function ModalContainer() {
  const {isModalActive, activeModals} = useModals();
  const {closeModal} = useModalControls();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const activeModal = activeModals[activeModals.length - 1];
  const onBottomSheetChange = async (snapPoint: number) => {
    if (snapPoint === -1) {
      closeModal();
    }
  };

  const onClose = () => {
    bottomSheetRef.current?.close();
    closeModal();
  };

  useEffect(() => {
    if (isModalActive) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isModalActive, bottomSheetRef, activeModal?.name]);

  let snapPoints: (string | number)[] = DEFAULT_SNAPPOINTS;
  let element;
  if (activeModal?.name === 'confirm') {
    snapPoints = ConfirmModal.snapPoints;
    element = <ConfirmModal.Component {...activeModal} />;
  } else {
    return null;
  }

  if (snapPoints[0] === 'fullscreen') {
    return (
      <SafeAreaView
        style={[styles.fullscreenContainer, {backgroundColor: '#fff'}]}>
        {element}
      </SafeAreaView>
    );
  }
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleHeight={HANDLE_HEIGHT}
      index={isModalActive ? 0 : -1}
      enablePanDownToClose
      android_keyboardInputMode="adjustResize"
      keyboardBlurBehavior="restore"
      onClose={onClose}
      backdropComponent={
        isModalActive ? createCustomBackdrop(onClose) : undefined
      }
      handleIndicatorStyle={{backgroundColor: '#000'}}
      handleStyle={[styles.handle, {backgroundColor: '#fff'}]}
      onChange={onBottomSheetChange}>
      {element}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  handle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
