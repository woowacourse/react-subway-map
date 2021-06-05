import { ChangeEventHandler, Dispatch, SetStateAction } from 'react';
import { ColorDot, InputContainer, Select } from '../../components/shared';
import { APIReturnTypeLine } from '../../hooks/useLines';

interface LineSelectProps {
  lines: APIReturnTypeLine[];
  currentLine: APIReturnTypeLine | undefined;
  setSelectedLineId: Dispatch<SetStateAction<number>>;
}

const LineSelect = ({ lines, currentLine, setSelectedLineId }: LineSelectProps) => {
  const onLineSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedLineId(Number(event.target.value));
  };

  return (
    <InputContainer labelText="노선 선택">
      <ColorDot size="s" backgroundColor={currentLine?.color} />
      <Select onChange={onLineSelect} aria-label="노선 선택">
        <option value="/" hidden>
          노선 선택
        </option>
        {lines?.map((line) => (
          <option key={line.id} value={line.id}>
            {line.name}
          </option>
        ))}
      </Select>
    </InputContainer>
  );
};

export default LineSelect;
