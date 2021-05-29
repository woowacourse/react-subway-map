import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PATH from "../../constants/path";
import STATUS from "../../constants/status";
import Main from "../../components/@shared/Main";
import Loading from "../../components/@shared/Loading";
import SignupForm from "../../components/SignupForm";
import { reset } from "./slice";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { status, message } = useSelector((state) => state.signup);

  useEffect(() => {
    if (status === STATUS.SUCCEED) {
      alert(message);
      dispatch(reset());
      history.push(PATH.LOGIN);
    }

    if (status === STATUS.FAILED) {
      alert(message);
      dispatch(reset());
    }

    return () => dispatch(reset());
  }, [status, message, dispatch, history]);

  return (
    <>
      <Loading isLoading={status === STATUS.LOADING} />
      <Main>
        <section className="m-auto pb-8 w-120 border-t-8 border-yellow-300 rounded-sm shadow-md">
          <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
            회원가입
          </h2>
          <SignupForm />
        </section>
      </Main>
    </>
  );
};

export default Signup;
