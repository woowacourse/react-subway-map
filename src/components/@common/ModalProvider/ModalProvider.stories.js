import React, { useEffect } from 'react';
import useModal from '../../../hooks/@shared/useModal/useModal';
import LineAddModal from '../../LinesAddModal/LineAddModal';
import ModalProvider from './ModalProvider';

export default {
  component: ModalProvider,
  title: 'common/ModalProvider',
};

const Template = (args) => {
  const Page = () => {
    const { openModal } = useModal();

    useEffect(() => {
      openModal(<LineAddModal />);
    }, []);

    return (
      <div>
        <h2>모달 테스트</h2>
        <button onClick={() => openModal(<LineAddModal />)}>모달 열기</button>
      </div>
    );
  };

  return (
    <ModalProvider {...args}>
      <Page />
    </ModalProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
