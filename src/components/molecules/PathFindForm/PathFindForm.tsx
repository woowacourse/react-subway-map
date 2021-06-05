import { useChangeEvent } from '../../../hooks';
import { IStationRes } from '../../../type';
import { Button, Select } from '../../atoms';
import { IOption } from '../../atoms/Select/Select';
import { PathFindFormWrapper, SelectWrapper } from './PathFindForm.styles';

interface IPathFindFormProp {
  stations: IStationRes[] | undefined | null;
  doPathFind: (departmentStationId: number, destStationId: number) => void;
}

const PathFindForm = ({ stations, doPathFind }: IPathFindFormProp) => {
  const { value: departmentStationId, onChange: onChangeDepartmentStation } = useChangeEvent('');
  const { value: destStationId, onChange: onChangeDestStation } = useChangeEvent('');

  const optionOfStations: IOption[] =
    stations?.map(station => ({
      value: station.id,
      name: station.name,
    })) || [];

  const onSubmitPathFind: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (departmentStationId === destStationId) {
      window.alert('출발역과 도착역은 같을 수 없습니다.');

      return;
    }

    doPathFind(Number(departmentStationId), Number(destStationId));
  };

  return (
    <PathFindFormWrapper onSubmit={onSubmitPathFind}>
      <SelectWrapper>
        <Select
          defaultName="출발역"
          options={optionOfStations}
          onChange={onChangeDepartmentStation}
          selectValue={departmentStationId}
        />
        <Select
          defaultName="도착역"
          options={optionOfStations}
          onChange={onChangeDestStation}
          selectValue={destStationId}
        />
      </SelectWrapper>
      <Button>길 찾기</Button>
    </PathFindFormWrapper>
  );
};

export default PathFindForm;
