import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import TextButton from 'components/shared/TextButton/TextButton';
import IconButton from 'components/shared/IconButton/IconButton';
import Modal from 'components/shared/Modal/Modal';
import LineModal from 'components/LineModal/LineModal';
import Loading from 'components/shared/Loading/Loading';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Line, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import { API_STATUS, END_POINT } from 'constants/api';
import { ALERT_MESSAGE, CONFIRM_MESSAGE } from 'constants/messages';
import ROUTE from 'constants/routes';
import useFetch from 'hooks/useFetch';
import Styled from './styles';

const LinePage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [lines, setLines] = useState<Line[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedLine, setSelectedLine] = useState<Line>();
  const [modalTitle, setModalTitle] = useState<string>('');

  const { fetchData: getStationsAsync, loading: getStationsLoading } = useFetch('GET');
  const { fetchData: getLinesAsync, loading: getLinesLoading } = useFetch('GET');
  const { fetchData: deleteLineAsync, loading: deleteLineLoading } = useFetch('DELETE');

  const { enqueueSnackbar } = useSnackbar();

  const getLines = async () => {
    const res = await getLinesAsync(END_POINT.LINES);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_LINES);
    } else if (res.status === API_STATUS.FULFILLED) {
      setLines(res.data);
    }
  };

  const getStations = async () => {
    const res = await getStationsAsync(END_POINT.STATIONS);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.status === API_STATUS.FULFILLED) {
      setStations(res.data);
    }
  };

  const deleteLine = async (id: Line['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await deleteLineAsync(`${END_POINT.LINES}/${id}`);

    if (res.status === API_STATUS.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.status === API_STATUS.FULFILLED) {
      await getLines();
      enqueueSnackbar(ALERT_MESSAGE.SUCCESS_TO_DELETE_LINE);
    }
  };

  const openLineCreateModal = async () => {
    setModalOpen(true);
    setModalTitle('노선 생성');

    await getStations();
  };

  const openLineEditModal = async (line: Line) => {
    setSelectedLine(line);
    setModalOpen(true);
    setModalTitle('노선 수정');
  };

  const closeModal = async () => {
    setModalOpen(false);
    setSelectedLine(undefined);
  };

  const selectedColors = lines.map((line) => line.color);

  const isLoading = getStationsLoading || getLinesLoading || deleteLineLoading;

  useEffect(() => {
    const fetchLines = async () => {
      await getLines();
    };

    fetchLines();
  }, []);

  return (
    <>
      <CardLayout title={'노선 관리'}>
        <Loading isLoading={isLoading} />
        <Styled.AddButtonWrapper>
          <TextButton
            text="노선 추가"
            styleType={ButtonType.YELLOW}
            onClick={openLineCreateModal}
          />
        </Styled.AddButtonWrapper>
        <Styled.LinesContainer data-testid="line-list">
          {lines?.map((line) => (
            <Styled.LineItem key={line.id} data-testid="line-item">
              <Styled.Color color={line.color}></Styled.Color>
              {line.name}
              <Styled.ButtonsContainer>
                <IconButton onClick={() => openLineEditModal(line)}>
                  <Styled.Icon src={editIcon} alt="edit" />
                </IconButton>
                <IconButton onClick={() => deleteLine(line.id)}>
                  <Styled.Icon src={deleteIcon} alt="delete" />
                </IconButton>
              </Styled.ButtonsContainer>
            </Styled.LineItem>
          ))}
        </Styled.LinesContainer>
      </CardLayout>

      <Modal isOpen={isModalOpen} title={modalTitle} onClose={closeModal}>
        <LineModal
          selectedLine={selectedLine}
          stations={stations}
          closeModal={closeModal}
          getLines={getLines}
          selectedColors={selectedColors}
        />
      </Modal>
    </>
  );
};

export default LinePage;
