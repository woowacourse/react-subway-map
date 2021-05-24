import { Link } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components/@shared/FlexContainer/FlexContainer";
import Block from "../../components/Block/Block";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { PAGE_PATH } from "../../constants/route";

const LoginPage = () => {
  return (
    <FlexCenter>
      <Block style={{ marginTop: "2.5rem", width: "540px", flexDirection: "column", alignItems: "flex-start" }}>
        <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>👋 로그인</h2>
        </FlexBetween>
        <Flex style={{ width: "100%", flexDirection: "column" }}>
          <Input placeholder="이메일" style={{ marginBottom: "15px" }} />
          <Input placeholder="비밀번호" style={{ marginBottom: "15px" }} />
          <Button size="block" style={{ marginBottom: "15px" }}>
            확인
          </Button>
          <p>
            아직 회원이 아니신가요? <Link to={PAGE_PATH.SIGN_UP}>회원가입</Link>
          </p>
        </Flex>
      </Block>
    </FlexCenter>
  );
};

export default LoginPage;
