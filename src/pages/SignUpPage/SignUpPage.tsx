import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Input, Button } from '../../components';
import * as Styled from './SignUpPage.styles';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope-solid.svg';
import { ReactComponent as KeyIcon } from '../../assets/icons/key-solid.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user-solid.svg';

const SignUpPage = () => {
  return (
    <Styled.SignUpPage>
      <Styled.CardWrapper>
        <Card>
          <Styled.Form>
            <Styled.HeaderText>회원가입</Styled.HeaderText>
            <Styled.FormItem>
              <Input icon={<EmailIcon />} placeholder="이메일을 입력해주세요" autoFocus />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input icon={<UserIcon />} placeholder="나이를 입력해주세요" />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input icon={<KeyIcon />} type="password" placeholder="비밀번호를 입력해주세요" />
            </Styled.FormItem>
            <Styled.FormItem>
              <Input
                icon={<KeyIcon />}
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
              />
            </Styled.FormItem>
            <Styled.FormItem>
              <Styled.SignUpButton>
                <Button fullWidth variant="primary">
                  회원가입
                </Button>
              </Styled.SignUpButton>
              <Link to="/">로그인으로 돌아가기</Link>
            </Styled.FormItem>
          </Styled.Form>
        </Card>
      </Styled.CardWrapper>
    </Styled.SignUpPage>
  );
};

export default SignUpPage;
