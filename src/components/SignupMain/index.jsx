import React from "react";
import Main from "../@shared/Main";
import SignupForm from "../SignupForm";

const SignupMain = () => (
  <Main className="relative">
    <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        회원가입
      </h2>
      <SignupForm />
    </section>
  </Main>
);

export default SignupMain;
