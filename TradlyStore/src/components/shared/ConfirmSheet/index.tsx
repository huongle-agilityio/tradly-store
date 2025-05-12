import { memo, Ref, useCallback } from 'react';
import { Portal } from '@gorhom/portal';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import BottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

// Components
import { Button, SheetBackDrop, Text } from '@/components/common';

interface ConfirmSheetProps {
  title: string;
  description: string;
  buttonConfirmText?: string;
  backdropPress?: BackdropPressBehavior;
  sheetRef: Ref<BottomSheetMethods>;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmSheet = memo(
  ({
    title,
    description,
    buttonConfirmText,
    sheetRef,
    onConfirm,
    onCancel,
    backdropPress,
  }: ConfirmSheetProps) => {
    const { colors } = useTheme();

    const backdropComponent = useCallback(
      (props: BottomSheetBackdropProps) => {
        return <SheetBackDrop pressBehavior={backdropPress} {...props} />;
      },
      [backdropPress],
    );

    return (
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1}
          snapPoints={['50%']}
          enablePanDownToClose={backdropPress !== 'none'}
          backdropComponent={backdropComponent}
          backgroundStyle={{ backgroundColor: colors.bottomSheet.background }}
        >
          <BottomSheetView style={styles.bottomSheetView}>
            <View style={styles.contentWrapper}>
              <Text fontSize="lg" fontWeight="medium">
                {title}
              </Text>
              <Text>{description}</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <Button buttonStyles={styles.button} onPress={onConfirm}>
                {buttonConfirmText}
              </Button>
              <Button
                variant="bordered"
                buttonStyles={styles.button}
                onPress={onCancel}
              >
                Cancel
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetView: {
    padding: 20,
    gap: 60,
  },
  contentWrapper: {
    gap: 10,
  },
  buttonWrapper: {
    gap: 15,
  },
  button: {
    height: 45,
  },
});
