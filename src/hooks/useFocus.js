import { useEffect, useRef } from "react";

const useFocus = (deps) => {
  if (deps !== undefined && !Array.isArray(deps)) {
    throw new Error(`Invalid dependencies array`);
  }

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};

export default useFocus;
