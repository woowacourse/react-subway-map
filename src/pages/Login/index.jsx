import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Login = () => (
  <main className="min-w-screen-lg flex place-items-center h-screen-80">
    <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        로그인
      </h2>
      <form className="flex flex-col px-8 space-y-8">
        <label className="sr-only" htmlFor="email">
          이메일 입력란
        </label>
        <Input id="email" type="email" placeholder="✉️ 이메일을 입력해주세요" />
        <label className="sr-only" htmlFor="password">
          비밀번호 입력란
        </label>
        <Input
          id="password"
          type="password"
          placeholder="🔒 비밀번호를 입력해주세요"
        />
        <Button type="submit" disabled={false}>
          로그인
        </Button>
        <Link to="/signup" className="mt-8 text-center text-gray-700">
          <span>아직 회원이 아니신가요?</span>
        </Link>
      </form>
    </section>
  </main>
);

export default Login;
