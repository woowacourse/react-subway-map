import { Line } from "../@types";

export const stations = [
  {
    id: 1,
    name: "지하철역 1",
  },
  {
    id: 2,
    name: "지하철역 2",
  },
  {
    id: 3,
    name: "지하철역 3",
  },
  {
    id: 4,
    name: "지하철역 4",
  },
  {
    id: 5,
    name: "지하철역 5",
  },
  {
    id: 6,
    name: "지하철역 6",
  },
  {
    id: 7,
    name: "지하철역 7",
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
    ],
  },
  {
    id: 2,
    name: "2호선",
    color: "bg-green-600",
    stations: [
      {
        id: 1,
        name: "강남역",
      },
      {
        id: 2,
        name: "광교역",
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
    ],
  },
];
