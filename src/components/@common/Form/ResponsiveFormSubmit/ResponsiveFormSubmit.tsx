import React, { FC, useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { useForm } from '../Form';

const ResponsiveFormSubmit: FC = ({ children }) => {
  const { formInfo } = useForm();
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  useEffect(() => {
    setIsReadyToSubmit(formInfo.every((inputInfo) => inputInfo.canSubmit));
  }, [formInfo]);

  return <Button disabled={!isReadyToSubmit}>{children}</Button>;
};

export default ResponsiveFormSubmit;
