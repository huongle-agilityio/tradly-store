// Components
import { HeaderFilter } from '../HeaderFilter';

// Themes
import { HeaderWithTitle } from './HeaderWithTitle';

interface HeaderWithFilterButtonProps {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
}

export const HeaderWithFilterButton = ({
  title,
  onBack,
  onClose,
}: HeaderWithFilterButtonProps) => (
  <HeaderWithTitle onBack={onBack} onClose={onClose} title={title}>
    <HeaderFilter />
  </HeaderWithTitle>
);
