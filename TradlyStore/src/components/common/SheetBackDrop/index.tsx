import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

export const SheetBackDrop = (props: BottomSheetDefaultBackdropProps) => (
  <BottomSheetBackdrop
    disappearsOnIndex={-1}
    appearsOnIndex={0}
    pressBehavior="close"
    {...props}
  />
);
