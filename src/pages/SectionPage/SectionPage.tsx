import { useContext, useState } from 'react';
import { MdAdd, MdArrowForward } from 'react-icons/md';

import Box from '../../components/shared/Box/Box';
import Button from '../../components/shared/Button/Button';
import PALETTE from '../../constants/palette';
import Input from '../../components/shared/Input/Input';
import Select from '../../components/shared/Select/Select';
import InputContainer from '../../components/shared/InputContainer/InputContainer';
import { ThemeContext } from '../../contexts/ThemeContextProvider';
import {
  Container,
  Icon,
  TitleBox,
  Heading1,
  Form,
  FormBox,
  List,
  StationSelects,
} from './SectionPage.style';
import RoundButton from '../../components/shared/Button/RoundButton';

const SectionPage = () => {
  const themeColor = useContext(ThemeContext)?.themeColor ?? PALETTE.WHITE;
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [list, setList] = useState([]);

  return (
    <Container>
      <TitleBox hatColor={themeColor} backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Heading1>지하철 구간 관리</Heading1>
        <InputContainer labelText="노선 선택">
          <Select>
            <option value="/" hidden>
              노선 선택
            </option>
          </Select>
        </InputContainer>
        <RoundButton
          type="button"
          size="m"
          backgroundColor={themeColor}
          color={PALETTE.WHITE}
          onClick={() => setFormOpen(!formOpen)}
        >
          <MdAdd size="1.5rem" />
        </RoundButton>
      </TitleBox>
      <FormBox backgroundColor={PALETTE.WHITE} isOpen={formOpen}>
        <Form>
          <StationSelects>
            <InputContainer labelText="상행 종점">
              <Select>
                <option value="/" hidden>
                  역 선택
                </option>
                <option value="Hi">안녕하세요</option>
              </Select>
            </InputContainer>
            <Icon>
              <MdArrowForward size="1.5rem" />
            </Icon>
            <InputContainer labelText="하행 종점">
              <Select>
                <option value="/" hidden>
                  역 선택
                </option>
              </Select>
            </InputContainer>
          </StationSelects>
          <InputContainer labelText="거리 (단위:km)">
            <Input />
          </InputContainer>
          <Button type="submit" size="m" backgroundColor={themeColor} color={PALETTE.WHITE}>
            추가
          </Button>
          {/* TODO: 색상 팔레트 추가 */}
        </Form>
      </FormBox>
      <Box backgroundColor={PALETTE.WHITE}>
        <List></List>
      </Box>
    </Container>
  );
};

export default SectionPage;
