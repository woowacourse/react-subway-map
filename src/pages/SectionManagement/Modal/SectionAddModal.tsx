import { TEST_ID } from "../../../@test/testId";
import { INPUT_PLACEHOLDER } from "../../../constants/placeholder";
import { Line, SectionAddRequestItem, Station } from "../../../@types/types";
import { Flex } from "../../../components/@shared/FlexContainer/FlexContainer";
import { CIRCLE_COLOR } from "../../../constants/color";

import Block from "../../../components/Block/Block";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import Select from "../../../components/Select/Select";
import useInput from "../../../hooks/@common/useInput";
import useSelect from "../../../hooks/@common/useSelect";
import { getSectionDistanceValidator } from "../../../validations/section";
import { isLineHasStation } from "../../../utils/line";
import { MAX_SECTION_DISTANCE } from "../../../constants/config";

interface Props {
  closeModal: () => void;
  line: Line;
  stations: Station[];
  addSection: (sectionAddRequestItem: SectionAddRequestItem) => Promise<void>;
  deleteSection: ({ lineId, stationId }: { lineId: number; stationId: number }) => Promise<void>;
}

const SectionAddModal = ({ closeModal, line, stations, addSection }: Props) => {
  const { selectValue: upStationId, setValueOnChange: setUpStationIdOnChange } = useSelect("");
  const { selectValue: downStationId, setValueOnChange: setDownStationIdOnChange } = useSelect("");

  const isStationExist = (stationId: Station["id"]) => {
    return stations.some((station) => station.id === stationId);
  };

  const getExistingDistance = () => {
    if (isStationExist(Number(upStationId))) {
      const existingSection = line.sections.find((section) => section.upStation.id === Number(upStationId));

      if (existingSection) {
        return existingSection.distance;
      }
    }

    if (isStationExist(Number(downStationId))) {
      const existingSection = line.sections.find((section) => section.upStation.id === Number(downStationId));

      if (existingSection) {
        return existingSection.distance;
      }
    }

    return MAX_SECTION_DISTANCE;
  };

  const { inputValue: distance, errorMessage: distanceErrorMessage, setValueOnChange: setDistanceOnChange } = useInput(
    getSectionDistanceValidator(getExistingDistance())
  );

  const getProcessedStations = (line: Line, otherStationId: Station["id"]) => {
    if (!isStationExist(otherStationId)) {
      return stations;
    }

    if (isLineHasStation(line, otherStationId)) {
      return stations.filter((station) => !line.stations.some((stationInLine) => stationInLine.id === station.id));
    }

    return line.stations;
  };

  const getStationOptions = (stations: Station[]) => {
    return stations.map(({ id, name }) => ({
      value: id,
      text: name,
      backgroundColor: line.stations.some((station) => station.id === id) ? CIRCLE_COLOR[line.color] : "#eee",
    }));
  };

  const upStationOptions = getStationOptions(getProcessedStations(line, Number(downStationId)));
  const downStationOptions = getStationOptions(getProcessedStations(line, Number(upStationId)));

  const onAddSection: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (distanceErrorMessage) {
      alert("구간을 추가할 수 없습니다");
      return;
    }

    try {
      await addSection({
        lineId: line.id,
        upStationId: Number(upStationId),
        downStationId: Number(downStationId),
        distance: Number(distance),
      });
      closeModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Modal onClose={closeModal}>
      <form onSubmit={onAddSection}>
        <Block style={{ flexDirection: "column", maxWidth: "40.625rem" }}>
          <h3 style={{ marginBottom: "1.5rem", fontSize: "1.6875rem" }}>🔁 구간 추가</h3>
          <Input value={line.name} placeholder="노선 이름" style={{ marginBottom: "0.9375rem" }} disabled />
          <Flex style={{ width: "100%", marginBottom: "0.9375rem" }}>
            <Select
              data-testid={TEST_ID.SECTION_UP_STATION_SELECT}
              value={upStationId}
              onChange={setUpStationIdOnChange}
              defaultOption="이전역"
              options={upStationOptions}
              required
              style={{ marginRight: "0.625rem" }}
            />
            <Select
              data-testid={TEST_ID.SECTION_DOWN_STATION_SELECT}
              value={downStationId}
              onChange={setDownStationIdOnChange}
              defaultOption="다음역"
              options={downStationOptions}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", flexDirection: "column", marginBottom: "0.9375rem" }}>
            <Input
              data-testid={TEST_ID.SECTION_DISTANCE_INPUT}
              value={distance}
              onChange={setDistanceOnChange}
              errorMessage={distanceErrorMessage}
              type="number"
              min="0.1"
              max="1000"
              step="0.1"
              placeholder={INPUT_PLACEHOLDER.SECTION_DISTANCE}
              required
            />
          </Flex>
          <Flex style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button data-testid={TEST_ID.SECTION_ADD_BUTTON}>구간 추가</Button>
          </Flex>
        </Block>
      </form>
    </Modal>
  );
};

export default SectionAddModal;
