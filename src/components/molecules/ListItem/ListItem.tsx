import { Button } from '../../atoms';
import { Container, Wrapper } from './ListItem.styles';

export interface ListItemProps {
  content: string;
  onClickModify?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDelete?: () => void;
  option?: { [key: string]: string };
}

const ListItem = ({ content, onClickModify, onClickDelete, ...props }: ListItemProps) => {
  return (
    <Container {...props}>
      <span>{content}</span>
      <Wrapper>
        {onClickModify && (
          <Button type="button" buttonTheme="edit" onClick={onClickModify}>
            수정
          </Button>
        )}
        {onClickDelete && (
          <Button type="button" buttonTheme="edit" onClick={onClickDelete}>
            삭제
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};

export default ListItem;
