// Components
import { HeaderFilter } from '../HeaderFilter';

// Themes
import { HeaderWithTitle } from './HeaderWithTitle';

interface HeaderWithFilterButtonProps {
  title: string;
  hasBackButton?: boolean;
}

export const HeaderWithFilterButton = ({
  title,
  hasBackButton,
}: HeaderWithFilterButtonProps) => (
  <HeaderWithTitle hasBackButton={hasBackButton} title={title}>
    <HeaderFilter />
  </HeaderWithTitle>
);
