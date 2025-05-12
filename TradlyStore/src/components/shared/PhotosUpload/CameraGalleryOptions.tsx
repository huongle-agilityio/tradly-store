import { memo, Ref, useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Portal } from '@gorhom/portal';
import { useTheme } from '@react-navigation/native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

// Components
import { SheetBackDrop, Text } from '@/components/common';

interface CameraGalleryOptionsProps {
  sheetRef: Ref<BottomSheetMethods>;
  openGallery: () => void;
  onCamera: () => void;
  onCloseSheet: () => void;
  openFiles: () => void;
}

export const CameraGalleryOptions = memo(
  ({
    sheetRef,
    openGallery,
    onCamera,
    onCloseSheet,
    openFiles,
  }: CameraGalleryOptionsProps) => {
    const { colors } = useTheme();

    const stylesDynamic = useMemo(
      () =>
        StyleSheet.create({
          borderButtonSheet: {
            borderColor: colors.placeholder,
            borderBottomWidth: 0.2,
          },
        }),
      [colors.placeholder],
    );

    return (
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={['50%']}
          enablePanDownToClose
          backdropComponent={SheetBackDrop}
        >
          <BottomSheetView style={styles.bottomSheetView}>
            <TouchableOpacity
              onPress={openGallery}
              style={[styles.buttonSheet, stylesDynamic.borderButtonSheet]}
            >
              <Text fontWeight="medium">From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openFiles}
              style={[styles.buttonSheet, stylesDynamic.borderButtonSheet]}
            >
              <Text fontWeight="medium">From Files</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCamera}
              style={[styles.buttonSheet, stylesDynamic.borderButtonSheet]}
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
    );
  },
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
});
