import useToggle from "./useToggle";

const useBoolean = (initialBool) => {
  const [bool, toggle] = useToggle(initialBool);

  const setTrue = () => toggle(true);

  const setFalse = () => toggle(false);

  return [bool, setTrue, setFalse, toggle];
};

export default useBoolean;
