import { useState } from "react";

const useToggle = (initialBool) => {
  const [bool, setBool] = useState(Boolean(initialBool));

  const toggle = (...args) =>
    setBool(args.length > 0 ? Boolean(args[0]) : !bool);

  return [bool, toggle];
};

export default useToggle;
