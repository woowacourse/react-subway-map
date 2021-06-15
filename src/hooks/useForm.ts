import { useContext } from "react";

import FormContext from "../context/form";

const useForm = () => {
  const context = useContext(FormContext);

  if (!context) throw Error("FormContext가 존재하지 않습니다");

  return context;
};

export default useForm;
