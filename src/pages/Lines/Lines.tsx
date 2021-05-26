import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import Add from '../../components/@common/Icon/Add';
import ListItem from '../../components/@common/ListItem/ListItem';
import ButtonOnLine from '../../components/@shared/ButtonOnLine/ButtonOnLine';
import { API_INFO } from '../../constants/api';
import { PAGE_INFO, THEME_COLOR } from '../../constants/appInfo';
import PALETTE from '../../constants/palette';
import { loadLines } from '../../redux/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { LineColorDot, LineList } from './Lines.styles';

const Lines: FC = () => {
  const apiOwner = useSelector((state: RootState) => state.api.owner);
  const { lines } = useSelector((state: RootState) => state.line);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadLines(API_INFO[apiOwner].endPoint));
  }, []);

  return (
    <CardTemplate titleText={PAGE_INFO.LINES.text} templateColor={THEME_COLOR[400]}>
      <ButtonOnLine>
        <Add width="80%" color={PALETTE.GRAY[600]} />
      </ButtonOnLine>
      {lines && (
        <LineList>
          {lines.map((line) => (
            <ListItem
              key={line.id}
              onDelete={() => console.log(line.name)}
              onModify={() => console.log(line.name)}
            >
              <LineColorDot dotColor={line.color} />
              {line.name}
            </ListItem>
          ))}
        </LineList>
      )}
    </CardTemplate>
  );
};

export default Lines;
