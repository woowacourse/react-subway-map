import Button from "../../components/Button/Button";
import Block from "../../components/Block/Block";
import { Flex, FlexCenter, FlexBetween } from "../../components/@shared/FlexContainer/FlexContainer";
import { lines } from "../../mocks/mocks";
import Select from "../../components/Select/Select";
import { useState } from "react";
import SectionAddModal from "./Modal/SectionAddModal";

const SectionManagementPage = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);

  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>🔁 구간 관리</h2>
          <Button
            type="button"
            onClick={() => {
              setIsAddModalOpened(!isAddModalOpened);
            }}
          >
            구간 추가
          </Button>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          <Select selectSize="block" options={lines.map(({ id, name }) => ({ value: id, text: name }))} />
        </Flex>
      </Block>
      {isAddModalOpened && (
        <SectionAddModal
          onClose={() => {
            setIsAddModalOpened(false);
          }}
        />
      )}
    </FlexCenter>
  );
};

export default SectionManagementPage;
