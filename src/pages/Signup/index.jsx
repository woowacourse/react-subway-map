import React from "react";
import Main from "../../components/Main";
import Button from "../../components/Button";
import Input from "../../components/Input";

const Signup = () => (
  <Main>
    <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        회원가입
      </h2>
      <form className="flex flex-col px-8 space-y-8">
        <label className="sr-only" htmlFor="email">
          이메일 입력란
        </label>
        <Input id="email" type="email" placeholder="✉️ 이메일을 입력해주세요" />
        <label className="sr-only" htmlFor="age">
          나이 입력란
        </label>
        <Input id="age" type="number" placeholder="👤 나이를 입력해주세요" />
        <label className="sr-only" htmlFor="password">
          비밀번호 입력란
        </label>
        <Input
          id="password"
          type="password"
          placeholder="🔒 비밀번호를 입력해주세요"
        />
        <label className="sr-only" htmlFor="password-confirm">
          비밀번호 확인 입력란
        </label>
        <Input
          id="password-confirm"
          type="password"
          placeholder="🔒 비밀번호를 한번 더 입력해주세요"
        />
        <Button type="submit" disabled={false}>
          회원가입
        </Button>
      </form>
    </section>
  </Main>
);

export default Signup;
