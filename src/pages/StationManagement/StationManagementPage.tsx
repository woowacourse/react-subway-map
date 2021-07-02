import { useStation } from "../../hooks";

import {
  Flex,
  FlexCenter,
} from "../../components/Layout/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import FormProvider from "../../components/Form/FormProvider";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import ListItem from "../../components/ListItem/ListItem";
import InputField from "../../components/Input/InputField";

import { validateStationName } from "../../validations/station";
import { SIZE } from "../../constants/size";

const StationManagementPage = () => {
  const { stations, addStation, deleteStation } = useStation();

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
        <FormProvider
          submit={async ({ name }) => {
            await addStation(name);
          }}
          validators={{ name: validateStationName }}
        >
          <Form css={{ width: "100%" }}>
            <Flex css={{ width: "100%", marginBottom: "1rem" }}>
              <Flex
                css={{
                  width: "100%",
                  flexDirection: "column",
                  marginRight: "0.625rem",
                }}
              >
                <InputField name="name" placeholder="역 이름" required />
              </Flex>
              <Button>확인</Button>
            </Flex>
          </Form>
        </FormProvider>
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
