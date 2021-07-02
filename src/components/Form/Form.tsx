import { FormHTMLAttributes } from "react";

import { useForm } from "../../hooks";

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = (props: Props) => {
  const { onSubmit } = useForm();

  return <form onSubmit={onSubmit} {...props} />;
};

export default Form;
