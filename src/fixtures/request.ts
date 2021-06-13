import { Line, Station } from "../@types/types";

export const stations: Station[] = [
  {
    id: 1,
    name: "혜화역",
  },
  {
    id: 2,
    name: "동대문역",
  },
  {
    id: 3,
    name: "동대문역사문화공원역",
  },
  {
    id: 4,
    name: "충무로역",
  },
  {
    id: 5,
    name: "명동역",
  },
  {
    id: 6,
    name: "회현역",
  },
  {
    id: 7,
    name: "서울역",
  },
];

export const lines: Line[] = [
  {
    id: 1,
    name: "신분당선",
    color: "bg-red-600",
    stations: [
      {
        id: 1,
        name: "강남역",
      },
      {
        id: 2,
        name: "광교역",
      },
      {
        id: 5,
        name: "충무로역",
      },
    ],
    sections: [
      {
        upStation: {
          id: 1,
          name: "강남역",
        },
        downStation: {
          id: 2,
          name: "광교역",
        },
        distance: 10,
      },
      {
        upStation: {
          id: 2,
          name: "광교역",
        },
        downStation: {
          id: 5,
          name: "충무로역",
        },
        distance: 10,
      },
    ],
  },
  {
    id: 2,
    name: "2호선",
    color: "bg-green-600",
    stations: [
      {
        id: 3,
        name: "혜화역",
      },
      {
        id: 4,
        name: "동대문역",
      },
    ],
    sections: [
      {
        upStation: {
          id: 3,
          name: "혜화역",
        },
        downStation: {
          id: 4,
          name: "동대문역",
        },
        distance: 10,
      },
    ],
  },
];
