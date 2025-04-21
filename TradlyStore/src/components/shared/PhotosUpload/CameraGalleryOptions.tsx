import { memo, Ref } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Portal } from '@gorhom/portal';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// Components
import { SheetBackDrop, Text } from '@/components/common';

// Themes
import { colors } from '@/themes';

interface CameraGalleryOptionsProps {
  sheetRef: Ref<BottomSheetMethods>;
  openGallery: () => void;
  onCamera: () => void;
  onCloseSheet: () => void;
}

export const CameraGalleryOptions = memo(
  ({
    sheetRef,
    openGallery,
    onCamera,
    onCloseSheet,
  }: CameraGalleryOptionsProps) => (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['25%']}
        enablePanDownToClose
        backdropComponent={SheetBackDrop}
      >
        <BottomSheetView style={styles.bottomSheetView}>
          <TouchableOpacity
            onPress={openGallery}
            style={[styles.buttonSheet, styles.borderButtonSheet]}
          >
            <Text fontWeight="medium">From Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCamera}
            style={[styles.buttonSheet, styles.borderButtonSheet]}
          >
            <Text fontWeight="medium">Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCloseSheet} style={styles.buttonSheet}>
            <Text fontWeight="medium" color="error">
              Cancel
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  ),
);

const styles = StyleSheet.create({
  bottomSheetView: {
    padding: 20,
  },
  buttonSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  borderButtonSheet: {
    borderColor: colors.placeholder,
    borderBottomWidth: 0.2,
  },
});
