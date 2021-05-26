import { VFC } from 'react';
import { StyledStationListItem } from './StationListItem.styles';
import IconButton from '../../../@common/IconButton/IconButton';

interface Props {
  name: string;
  onDelete: () => void;
}

const StationListItem: VFC<Props> = ({ name, onDelete }) => {
  return (
    <StyledStationListItem>
      <span>{name}</span>
      <IconButton
        onClick={onDelete}
        iconUrl={`${process.env.PUBLIC_URL}/icons/trash-bin.svg`}
      />
    </StyledStationListItem>
  );
};

export default StationListItem;
