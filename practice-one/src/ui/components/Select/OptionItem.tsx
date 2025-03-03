import { memo } from 'react';
import { TouchableOpacity } from 'react-native';

// Components
import { Text } from '../Text';

// Themes
import { styles } from './styles';

interface OptionItemProps {
  value: string;
  label: string;
  onSelect: (value: string) => void;
}

export const OptionItem = memo(
  ({ value, label, onSelect }: OptionItemProps) => {
    const handleSelect = () => {
      onSelect(value);
    };

    return (
      <TouchableOpacity onPress={handleSelect} style={styles.option}>
        <Text fontSize="sm" textStyle={styles.text}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

OptionItem.displayName = 'OptionItem';
