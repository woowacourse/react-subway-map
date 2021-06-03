import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL, LineColor, RESPONSE_MESSAGE } from '../../../constants';
import {
  useDeleteRequest,
  useGetAllRequest,
  useLineInput,
  useModal,
  usePostRequest,
  usePutRequest,
} from '../../../hooks';
import { RootState } from '../../../store';
import { FullVerticalCenterBox } from '../../../styles/shared';
import { ILineReq, ILineRes, IStationRes, ModeType } from '../../../type';
import { isValidUpDownStation } from '../../../utils';
import { Button, Header } from '../../atoms';
import { LineEditForm, Modal, LineLookUp } from '../../molecules';
import {
  LineItemWithCircle,
  LineTitle,
  ListItemContainer,
  LookUpButtonWrapper,
} from './Line.styles';

const isValidLineName = (lineName: string) => {
  return /^[가-힣0-9]{2,10}$/.test(lineName);
};

const Line = () => {
  const {
    hostState: { host },
  } = useSelector((state: RootState) => {
    return { hostState: state.hostReducer };
  });

  const { allData: lines, getAllData: getAllLines } = useGetAllRequest<ILineRes>(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );
  const { postData: addLine, dataResponse: addLineResponse } = usePostRequest(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );
  const { putData: editLine, dataResponse: editLineResponse } = usePutRequest(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.STATION,
  );
  const { deleteData: deleteLine, dataResponse: deleteLineResponse } = useDeleteRequest(
    BASE_URL.LINE(host),
    RESPONSE_MESSAGE.LINE,
  );
  const { allData: stations, getAllData: getAllStations } = useGetAllRequest<IStationRes>(
    BASE_URL.STATION(host),
    RESPONSE_MESSAGE.STATION,
  );

  const { isModalOpen, open: openModal, onClickClose, close: closeModal } = useModal(false);

  const [mode, setMode] = useState<ModeType>('ADD');
  const [color, setColor] = useState<string>(LineColor.COLOR_1);
  const [selectedLineId, setSelectedLineId] = useState<number>();

  const {
    lineInput: lineName,
    onChangeLineInput: onChangeLineName,
    setLineInput: setLineName,

    distance,
    onChangeDistance,

    upStationId,
    onChangeUpStationId,

    downStationId,
    onChangeDownStationId,

    resetForm,
  } = useLineInput();

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

    editLine<ILineReq>(body, `${selectedLineId}`);
  };

  const onDeleteLine = (lineId: number) => {
    if (!window.confirm('해당 노선을 정말로 삭제하시겠습니까?')) return;

    deleteLine(`${lineId}`);
  };

  const onSubmitLineInfo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidLineName(lineName)) {
      window.alert(
        '노선 이름은 공백이 포함되지 않은 2자 이상 10자 이하의 한글/숫자로 이루어진 문자열이어야 합니다.',
      );
      setLineName('');

      return;
    }

    if (mode === 'ADD') {
      if (!isValidUpDownStation(upStationId, downStationId)) {
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

  const onClickLookUpButton = () => {
    if (mode === 'LOOKUP') {
      setMode('ADD');
      return;
    }

    setMode('LOOKUP');
  };

  useEffect(() => {
    getAllLines();
  }, [addLineResponse, editLineResponse, deleteLineResponse]);

  useEffect(() => {
    getAllStations();
    getAllLines();
  }, []);

  return (
    <FullVerticalCenterBox>
      <LookUpButtonWrapper>
        <Button type="button" buttonTheme="menu" onClick={() => onClickLookUpButton()}>
          {mode === 'LOOKUP' ? '노선 관리 보기' : '노선 전체 보기'}
        </Button>
      </LookUpButtonWrapper>

      <ListItemContainer>
        {mode === 'LOOKUP' ? (
          <LineLookUp lines={lines} />
        ) : (
          <>
            <LineTitle hasExtra>
              <h3>🚉 노선 관리</h3>
              <Button onClick={openAddModal}>노선 추가</Button>
            </LineTitle>

            {lines?.map(({ id, name, color }) => (
              <LineItemWithCircle
                key={id}
                content={name}
                onClickModify={() => {
                  setSelectedLineId(id);
                  openEditModal(name);
                }}
                onClickDelete={() => {
                  onDeleteLine(id);
                }}
                option={{ color }}
              />
            ))}
          </>
        )}
      </ListItemContainer>

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
    </FullVerticalCenterBox>
  );
};

export default Line;
