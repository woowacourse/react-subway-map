import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const SignupPage = () => {
  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>📝 회원가입</h2>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          <Input placeholder="이메일" style={{ marginBottom: "15px" }} />
          <Input placeholder="나이" style={{ marginBottom: "15px" }} />
          <Input placeholder="비밀번호" style={{ marginBottom: "15px" }} />
          <Input placeholder="비밀번호 확인" style={{ marginBottom: "25px" }} />
          <Button size="block">확인</Button>
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default SignupPage;
