import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import CardLayout from 'components/CardLayout/CardLayout';
import Button from 'components/shared/Button/Button';
import Modal from 'components/shared/Modal/Modal';
import Loading from 'components/shared/Loading/Loading';
import LineModal from 'components/LineModal/LineModal';
import CloseButton from 'components/shared/CloseButton/CloseButton';
import { useAppSelector } from 'modules/hooks';
import { ButtonType, Line, Station, User } from 'types';
import deleteIcon from 'assets/delete.png';
import editIcon from 'assets/edit.png';
import useFetch from 'hooks/useFetch';
import {
  ALERT_MESSAGE,
  API_METHOD,
  RESPONSE_STATE,
  CONFIRM_MESSAGE,
  END_POINT,
  ROUTE,
} from '../../constants';
import Styled from './styles';

const LinePage = () => {
  const user: User | undefined = useAppSelector((state) => state.authSlice.data);

  if (!user) return <Redirect to={ROUTE.HOME} />;

  const [lines, setLines] = useState<Line[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedLine, setSelectedLine] = useState<Line>();
  const [modalTitle, setModalTitle] = useState<string>('');

  const { fetchData: getStationsAsync, loading: getStationsLoading } = useFetch(API_METHOD.GET);
  const { fetchData: getLinesAsync, loading: getLinesLoading } = useFetch(API_METHOD.GET);
  const { fetchData: deleteLineAsync, loading: deleteLineLoading } = useFetch(API_METHOD.DELETE);

  const { enqueueSnackbar } = useSnackbar();

  const getLines = async () => {
    const res = await getLinesAsync(END_POINT.LINES);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_LINES);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      setLines(res.data);
    }
  };

  const getStations = async () => {
    const res = await getStationsAsync(END_POINT.STATIONS);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(ALERT_MESSAGE.FAIL_TO_GET_STATIONS);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
      setStations(res.data);
    }
  };

  const deleteLine = async (id: Line['id']) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    const res = await deleteLineAsync(`${END_POINT.LINES}/${id}`);

    if (res.state === RESPONSE_STATE.REJECTED) {
      enqueueSnackbar(res.message);
    } else if (res.state === RESPONSE_STATE.FULFILLED) {
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
          <Button styleType={ButtonType.YELLOW} onClick={openLineCreateModal}>
            노선 추가
          </Button>
        </Styled.AddButtonWrapper>
        <Styled.LinesContainer>
          {lines?.map((line) => (
            <Styled.LineItem key={line.id}>
              <Styled.Color color={line.color}></Styled.Color>
              {line.name}
              <Styled.ButtonsContainer>
                <Button styleType={ButtonType.TRANSPARENT} onClick={() => openLineEditModal(line)}>
                  <Styled.Icon src={editIcon} alt="edit" />
                </Button>
                <Button styleType={ButtonType.TRANSPARENT} onClick={() => deleteLine(line.id)}>
                  <Styled.Icon src={deleteIcon} alt="delete" />
                </Button>
              </Styled.ButtonsContainer>
            </Styled.LineItem>
          ))}
        </Styled.LinesContainer>
      </CardLayout>

      <Modal
        isOpen={isModalOpen}
        title={modalTitle}
        closeButton={<CloseButton closeModal={closeModal} />}
        onClose={closeModal}
      >
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
