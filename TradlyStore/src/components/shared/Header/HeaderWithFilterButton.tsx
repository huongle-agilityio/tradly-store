import { memo } from 'react';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Components
import { HeaderFilter } from './HeaderFilter';

// Themes
import { HeaderWithTitle } from './HeaderWithTitle';

interface HeaderWithFilterButtonProps {
  title: string;
  navigation?: NativeStackNavigationProp<ParamListBase, string, undefined>;
  onClose?: () => void;
}

export const HeaderWithFilterButton = memo(
  ({ title, onClose, navigation }: HeaderWithFilterButtonProps) => (
    <HeaderWithTitle navigation={navigation} onClose={onClose} title={title}>
      <HeaderFilter />
    </HeaderWithTitle>
  ),
);
