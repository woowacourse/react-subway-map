import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStations, reset } from "../Stations/slice";
import {
  fetchLines,
  fetchLinesDetail,
  reset as resetLines,
} from "../Lines/slice";
import Main from "../../components/@shared/Main";
import EntryCrewListItem from "../../components/EntryCrewListItem";

const Entry = () => {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      Promise.all([
        dispatch(fetchStations()),
        dispatch(fetchLines()),
        dispatch(fetchLinesDetail()),
      ]).then(() => {
        Promise.all([dispatch(reset()), dispatch(resetLines())]);
      });
    },
    [dispatch]
  );

  const crews = [
    { name: "검프", baseURL: "https://gump-subway.p-e.kr" },
    { name: "포츈", baseURL: "https://fortune-subway.p-e.kr" },
    { name: "에어", baseURL: "https://air-subway.p-e.kr" },
    { name: "바다", baseURL: "https://bada-subway.kro.kr" },
    { name: "우기", baseURL: "https://woogie-subway.kro.kr" },
  ];

  return (
    <Main>
      <h2 className="flex justify-center mb-4 mt-6 p-4 text-gray-700 text-2xl font-medium">
        가장 취약할 것 같은 백엔드 크루의 API를 선택해주세요: 공개처형 🔫
      </h2>
      <ul className="flex space-x-4">
        {crews.map(({ name, baseURL }) => (
          <EntryCrewListItem key={name} name={name} baseURL={baseURL} />
        ))}
      </ul>
    </Main>
  );
};

export default Entry;
