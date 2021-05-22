import { Button } from '../../atoms';
import { Container, Wrapper } from './ListItem.styles';

export interface ListItemProps {
  content: string;
  onClickModify?: React.MouseEventHandler<HTMLButtonElement>;
  onClickDelete?: React.MouseEventHandler<HTMLButtonElement>;
}

const ListItem = ({ content, onClickModify, onClickDelete }: ListItemProps) => {
  return (
    <Container>
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
