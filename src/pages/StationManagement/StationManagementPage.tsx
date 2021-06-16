import { Button, Block, ListItem, InputField } from "../../components";
import { Flex, FlexCenter } from "../../components";

import { useForm, useStation } from "../../hooks";

import { validateStationName } from "../../validations";
import { SIZE } from "../../constants";

const StationManagementPage = () => {
  const { stations, addStation, deleteStation } = useStation();

  const {
    values: { name },
    isValid,
  } = useForm();

  const onAddStation: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (!isValid) {
      alert("역을 추가할 수 없습니다");
      return;
    }

    await addStation(name);
  };

  return (
    <FlexCenter>
      <Block
        css={{
          marginTop: "2.5rem",
          width: SIZE.PAGE_CONTAINER_WIDTH,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h2 css={{ marginBottom: "1rem" }}>🚉역 관리</h2>
        <form onSubmit={onAddStation} css={{ width: "100%" }}>
          <Flex css={{ width: "100%", marginBottom: "1rem" }}>
            <Flex
              css={{
                width: "100%",
                flexDirection: "column",
                marginRight: "0.625rem",
              }}
            >
              <InputField
                name="name"
                validator={validateStationName}
                placeholder="역 이름"
                required
              />
            </Flex>
            <Button>확인</Button>
          </Flex>
        </form>
        <Flex
          css={{
            width: "100%",
            flexDirection: "column",
            height: SIZE.PAGE_CONTAINER_HEIGHT,
            overflow: "auto",
          }}
        >
          {stations.map(({ id, name }) => (
            <ListItem
              key={id}
              css={{ padding: "0.5625rem" }}
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
