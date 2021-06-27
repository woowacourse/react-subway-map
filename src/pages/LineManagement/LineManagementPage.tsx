import Template from '../../components/@common/Template/Template';
import Title from '../../components/@common/Title/Title.styles';
import LineAddModal from '../../components/LineManagement/LineAddModal/LineAddModal';
import LineList from '../../components/LineManagement/LineList/LineList';
import { LineAddButton } from '../../components/LineManagement/LineList/LineList.styles';
import useModal from '../../service/hooks/useModal';

const LineManagementPage = () => {
  const { isModalOpen, closeModal, openModal } = useModal();

  return (
    <>
      <Template type="vertical">
        <Title>노선관리</Title>
        <LineAddButton onClick={openModal}>노선 추가</LineAddButton>
        <LineList />
      </Template>
      {isModalOpen && <LineAddModal closeModal={closeModal} />}
    </>
  );
};

export default LineManagementPage;
