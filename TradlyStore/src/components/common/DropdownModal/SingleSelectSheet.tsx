import { Ref, useCallback, useMemo } from 'react';
import { Portal } from '@gorhom/portal';
import { useTheme } from '@react-navigation/native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { SheetBackDrop } from '../SheetBackDrop';
import { modalStyles } from './styles';

// Components
import { OptionItem } from './OptionItem';

// Interfaces
import { Option } from '@/interfaces';

interface SingleSelectSheetProps {
  selectedItem: string;
  data: Option[];
  sheetRef: Ref<BottomSheetMethods>;
  handleCloseModal: () => void;
  onItemSelect: (value: string) => void;
}

export const SingleSelectSheet = ({
  sheetRef,
  data,
  selectedItem,
  onItemSelect,
  handleCloseModal,
}: SingleSelectSheetProps) => {
  const { colors } = useTheme();
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const keyExtractor = useCallback((item: Option) => item.value.toString(), []);

  const handleSelectItem = useCallback(
    (value: string) => {
      onItemSelect(value);
      handleCloseModal();
    },
    [handleCloseModal, onItemSelect],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Option; index: number }) => {
      const isLastItem = index === data.length - 1;

      return (
        <OptionItem
          onItemSelect={handleSelectItem}
          selectedItems={selectedItem}
          isLastItem={isLastItem}
          value={item.value}
          label={item.label}
        />
      );
    },
    [data.length, handleSelectItem, selectedItem],
  );

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDynamicSizing={false}
        backdropComponent={SheetBackDrop}
        backgroundStyle={{ backgroundColor: colors.bottomSheet.background }}
      >
        <BottomSheetFlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={modalStyles.contentContainerStyle}
        />
      </BottomSheet>
    </Portal>
  );
};
