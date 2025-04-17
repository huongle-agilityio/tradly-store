import { useCallback } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Components
import { OptionItem } from './OptionItem';

// Interfaces
import { Option } from '@/interfaces';

// Themes
import { colors } from '@/themes';

interface SingleSelectModalProps {
  isModalVisible: boolean;
  selectedItem: string;
  data: Option[];
  handleCloseModal: () => void;
  onItemSelect: (value: string) => void;
}

export const SingleSelectModal = ({
  isModalVisible,
  data,
  selectedItem,
  onItemSelect,
  handleCloseModal,
}: SingleSelectModalProps) => {
  const keyExtractor = useCallback((item: Option) => item.value.toString(), []);

  const handleSelectItem = (value: string) => {
    onItemSelect(value);
    handleCloseModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="fade"
      onRequestClose={handleCloseModal}
    >
      <TouchableOpacity
        accessibilityRole="button"
        testID="modal-backdrop"
        style={styles.modalBackdrop}
        onPress={handleCloseModal}
        activeOpacity={1}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={({ item, index }) => {
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
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.opacity,
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '70%',
  },
});
