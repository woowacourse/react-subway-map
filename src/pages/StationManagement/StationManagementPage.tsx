import { Input, Button, Block, ListItem } from "../../components";
import { Flex, FlexCenter } from "../../components";

import { useStation, useInput } from "../../hooks";

import { validateStationName } from "../../validations/station";

import { SIZE } from "../../constants/size";

const StationManagementPage = () => {
  const { stations, addStation, deleteStation } = useStation();
  const {
    inputValue: stationName,
    errorMessage: stationNameErrorMessage,
    setValueOnChange: onStationNameChange,
    setInputValue: setStationName,
  } = useInput(validateStationName);

  const onAddStation: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (stationNameErrorMessage) {
      alert("역을 추가할 수 없습니다");
      return;
    }

    await addStation(stationName);

    setStationName("");
  };

  return (
    <FlexCenter>
      <Block
        style={{
          marginTop: "2.5rem",
          width: SIZE.PAGE_CONTAINER_WIDTH,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>🚉역 관리</h2>
        <form onSubmit={onAddStation} style={{ width: "100%" }}>
          <Flex style={{ width: "100%", marginBottom: "1rem" }}>
            <Flex
              style={{
                width: "100%",
                flexDirection: "column",
                marginRight: "0.625rem",
              }}
            >
              <Input
                value={stationName}
                errorMessage={stationNameErrorMessage}
                placeholder="역 이름"
                onChange={onStationNameChange}
                required
              ></Input>
            </Flex>
            <Button>확인</Button>
          </Flex>
        </form>
        <Flex
          style={{
            width: "100%",
            flexDirection: "column",
            height: SIZE.PAGE_CONTAINER_HEIGHT,
            overflow: "auto",
          }}
        >
          {stations.map(({ id, name }) => (
            <ListItem
              key={id}
              style={{ padding: "0.5625rem" }}
              onDelete={async () => {
                await deleteStation(id);
              }}
            >
              {name}
            </ListItem>
          ))}
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default StationManagementPage;
