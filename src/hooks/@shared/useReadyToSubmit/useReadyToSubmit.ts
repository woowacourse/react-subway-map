import { useEffect, useState } from 'react';

type UseReadyToSubmit = (formInputs: string[], errorMessage: string[]) => boolean;

const useReadyToSubmit: UseReadyToSubmit = (formInputs, errorMessages) => {
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    if (
      formInputs.every((input) => input !== '') &&
      errorMessages.every((errorMessage) => errorMessage === '')
    ) {
      setIsReadyToSubmit(true);
      return;
    }

    setIsReadyToSubmit(false);
  }, [formInputs, errorMessages]);

  return isReadyToSubmit;
};

export default useReadyToSubmit;
