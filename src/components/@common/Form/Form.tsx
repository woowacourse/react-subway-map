import React, {
  FC,
  FormEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface InputInfo<T> {
  data: T;
  canSubmit: boolean;
}

type SetFormInfo = (inputId: number, inputInfo: Partial<InputInfo<unknown>>) => void;

type PushNewInputInfo = <T>(initialInputValue: T, canSubmit?: boolean) => { id: number };

interface FormContextType {
  formInfo: InputInfo<unknown>[];
  setFormInfo: SetFormInfo;
  pushNewInputInfo: PushNewInputInfo;
}

export type SubmitFormInfoHandler = (inputValues: unknown[], clearFormInfo: () => void) => void;

interface Props {
  children: ReactNode;
  onSubmitFormInfo: SubmitFormInfoHandler;
  className?: string;
}

export const CAN_SUBMIT_DEFAULT_VALUE = false;

export const FormContext = React.createContext<FormContextType | null>(null);

const Form: FC<Props> = ({ children, onSubmitFormInfo, className }) => {
  const [info, setInfo] = useState<InputInfo<unknown>[]>([]);
  const newInputInfoQueue = useRef<InputInfo<unknown>[]>([]);
  const initialFormInfo = useRef<InputInfo<unknown>[]>([]);
  const endIndexOfInfo = useRef(-1);

  const clearFormInfo = () => {
    setInfo(initialFormInfo.current);
  };

  const setFormInfo: SetFormInfo = (inputId, inputInfo) => {
    const modifiedInfo = info.map((originalInputInfo, index) => {
      if (index !== inputId) {
        return originalInputInfo;
      }

      return {
        ...originalInputInfo,
        ...inputInfo,
      };
    });

    setInfo(modifiedInfo);
  };

  const pushNewInputInfo: PushNewInputInfo = (
    initialInputValue,
    canSubmit = CAN_SUBMIT_DEFAULT_VALUE
  ) => {
    const newInputInfo: InputInfo<unknown> = {
      data: initialInputValue,
      canSubmit: canSubmit,
    };

    endIndexOfInfo.current++;
    newInputInfoQueue.current = [...newInputInfoQueue.current, newInputInfo];

    return {
      id: endIndexOfInfo.current,
    };
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    onSubmitFormInfo(
      info.map(({ data }) => data),
      clearFormInfo
    );
  };

  useEffect(() => {
    if (newInputInfoQueue.current.length === 0) {
      return;
    }

    const newFormInfo = [...info, ...newInputInfoQueue.current];

    setInfo(newFormInfo);

    initialFormInfo.current = newFormInfo;
    newInputInfoQueue.current = [];
  }, [newInputInfoQueue.current]);

  return (
    <FormContext.Provider value={{ formInfo: info, setFormInfo, pushNewInputInfo }}>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;

export const useForm = (): FormContextType => {
  const formContext = useContext(FormContext);

  if (!formContext) {
    throw Error('FormContext 내부에서만 useFormInfo를 사용할 수 있습니다.');
  }

  return formContext;
};
