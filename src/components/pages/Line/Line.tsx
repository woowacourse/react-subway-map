import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { ROUTE } from '../../../constants';
import { useChangeEvent, useModal, useServerAPI } from '../../../hooks';
import { RootState } from '../../../store';
import { ILineReq, ILineRes, IStationRes, ModeType } from '../../../type';
import { Button, Header } from '../../atoms';
import { Modal, LineEditForm } from '../../molecules';
import { LineColor } from '../../molecules/ColorSelector/ColorSelector';
import { Container, LineListContainer, LineItemWithCircle } from './Line.styles';

// TODO: type, enum, interface 한곳으로 몰기

const isValidLineName = (lineName: string) => {
  return /^[가-힣0-9]{2,10}$/.test(lineName);
};

const Line = () => {
  const {
    signedUser: { id: signedUserId },
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { signedUser: state.signedUserReducer, hostState: state.hostReducer };
  });

  const {
    allData: lines,
    getAllData: getAllLines,
    getAllDataResponse: getAllLineResponse,

    postData: addLine,
    postDataResponse: addLineResponse,

    putData: editLine,
    putDataResponse: editLineResponse,

    deleteData: deleteLine,
    deleteDataResponse: deleteLineResponse,
  } = useServerAPI<ILineRes>(`${host}/lines`);
  const { allData: stations, getAllData: getAllStations } = useServerAPI<IStationRes>(
    `${host}/stations`,
  );

  const { isModalOpen, open: openModal, onClickClose, close: closeModal } = useModal(false);

  const [mode, setMode] = useState<ModeType>('ADD');
  const [color, setColor] = useState<LineColor>(LineColor.COLOR_1);

  const [lineId, setLineId] = useState<number>();

  // TODO: 이름을 lineNameInput이라고 변경하면 어떨까?
  const { value: lineName, onChange: onChangeLineName, setValue: setLineName } = useChangeEvent('');

  const {
    value: distance,
    onChange: onChangeDistance,
    setValue: setDistance,
  } = useChangeEvent('1');

  const {
    value: upStationId,
    onChange: onChangeUpStationId,
    setValue: setUpStationId,
  } = useChangeEvent('');

  const {
    value: downStationId,
    onChange: onChangeDownStationId,
    setValue: setDownStationId,
  } = useChangeEvent('');

  const resetForm = () => {
    setLineName('');
    setUpStationId('');
    setDownStationId('');
    setDistance('1');
  };

  const openAddModal = () => {
    openModal();
    setMode('ADD');
    setLineName('');
  };

  const openEditModal = (name: string) => {
    openModal();
    setMode('EDIT');
    setLineName(name);
  };

  const onAddLine = () => {
    const body: ILineReq = {
      name: lineName,
      color: color,
      upStationId: Number(upStationId),
      downStationId: Number(downStationId),
      distance: Number(distance),
    };

    addLine<ILineReq>(body);
  };

  const onEditLine = () => {
    const body: ILineReq = {
      name: lineName,
      color: color,
    };

    editLine<ILineReq>(body, `${lineId}`);
  };

  const onDeleteLine = (lineId: number) => {
    if (!window.confirm('해당 노선을 정말로 삭제하시겠습니까?')) return;

    deleteLine(`${lineId}`);
  };

  const onSubmitLineInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: 유효성 검사 함수로 분리

    if (!isValidLineName(lineName)) {
      window.alert(
        '노선 이름은 공백이 포함되지 않은 2자 이상 10자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      setLineName('');

      return;
    }

    if (mode === 'ADD') {
      if (upStationId === '' || downStationId === '') {
        window.alert('상행선, 하행선을 선택해주세요');

        return;
      }

      if (upStationId === downStationId) {
        window.alert('상행선, 하행선은 달라야 합니다');

        return;
      }
    }

    mode === 'EDIT' ? onEditLine() : onAddLine();

    resetForm();
    closeModal();
  };

  if (!signedUserId) {
    window.alert('로그인이 필요합니다.');
    return <Redirect to={ROUTE.LOGIN} />;
  }

  useEffect(() => {
    if (addLineResponse?.isError === true) {
      window.alert(addLineResponse.message);
    } else if (addLineResponse?.isError === false) {
      window.alert('노선 추가 성공');
    }
  }, [addLineResponse]);

  useEffect(() => {
    if (editLineResponse?.isError === true) {
      window.alert(editLineResponse.message);
    } else if (editLineResponse?.isError === false) {
      window.alert('노선 수정 성공');
    }
  }, [editLineResponse]);

  useEffect(() => {
    if (deleteLineResponse?.isError === true) {
      window.alert(deleteLineResponse.message);
    } else if (deleteLineResponse?.isError === false) {
      window.alert('노선 제거 성공');
    }
  }, [deleteLineResponse]);

  useEffect(() => {
    if (getAllLineResponse?.isError === true) {
      window.alert(getAllLineResponse.message);
    }
  }, [getAllLineResponse]);

  useEffect(() => {
    getAllLines();
  }, [addLineResponse, editLineResponse, deleteLineResponse]);

  useEffect(() => {
    getAllStations();
    getAllLines();
  }, []);

  return (
    <Container>
      <Header hasExtra>
        <h3>🚉 노선 관리</h3>
        <Button onClick={openAddModal}>노선 추가</Button>
      </Header>

      <LineListContainer>
        {lines?.map(({ id, name, color }) => {
          return (
            <LineItemWithCircle
              key={id}
              content={name}
              onClickModify={() => {
                setLineId(id);
                openEditModal(name);
              }}
              onClickDelete={() => {
                onDeleteLine(id);
              }}
              option={{ color }}
            />
          );
        })}
      </LineListContainer>
      {isModalOpen && (
        <Modal onClickClose={onClickClose}>
          <Header>
            <h3>{mode === 'ADD' ? '🛤️ 노선 추가' : '🛤️ 노선 수정'}</h3>
          </Header>
          <LineEditForm
            lineName={lineName}
            onChangeLineName={onChangeLineName}
            setColor={setColor}
            onSubmitLineInfo={onSubmitLineInfo}
            addFormProps={
              mode === 'ADD'
                ? {
                    stations: stations || [],
                    onChangeUpStationId,
                    upStationId: upStationId,
                    onChangeDownStationId,
                    downStationId: downStationId,
                    onChangeDistance,
                    distance: distance,
                  }
                : null
            }
          />
        </Modal>
      )}
    </Container>
  );
};

export default Line;
