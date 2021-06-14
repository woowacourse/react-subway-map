import React, { useEffect, VFC } from 'react';
import { useSelector } from 'react-redux';
import CardTemplate from '../../components/@common/CardTemplate/CardTemplate';
import LineMap from '../../components/LineMap/LineMap';
import { PAGE_INFO } from '../../constants/appInfo';
import useCurrentAPIInfo from '../../hooks/@shared/useCurrentAPIInfo/useCurrentAPIInfo';
import { loadLines } from '../../redux/slice/lineSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { FullMapContents } from './FullMap.styles';

const FullMap: VFC = () => {
  const APIInfo = useCurrentAPIInfo();
  const dispatch = useAppDispatch();
  const { lines } = useSelector((state: RootState) => state.line);

  useEffect(() => {
    dispatch(loadLines());
  }, []);

  console.log(lines);

  return (
    <CardTemplate titleText={PAGE_INFO.FULL_MAP.text} templateColor={APIInfo.themeColor}>
      <FullMapContents>
        {lines.map((line) => (
          <LineMap key={line.id} line={line} />
        ))}
      </FullMapContents>
    </CardTemplate>
  );
};

export default FullMap;
