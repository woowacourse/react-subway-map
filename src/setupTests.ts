import axios from "axios";

import "@testing-library/jest-dom/extend-expect";

import { useAppSelector } from "./hooks";
import initialState from "./fixtures/redux";
import { cleanup } from "@testing-library/react";

jest.mock("axios");
jest.mock("./hooks");

jest.spyOn(window, "alert").mockImplementation(() => true);

const axiosMock = () => {
  const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
  const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
  const mockedAxiosPut = axios.put as jest.MockedFunction<typeof axios.put>;
  const mockedAxiosDelete = axios.delete as jest.MockedFunction<
    typeof axios.delete
  >;

  mockedAxiosGet.mockImplementation(async () => ({
    data: { stations: [], lines: [] },
  }));
  mockedAxiosPost.mockImplementation(async () => ({
    data: { stations: [], lines: [], accessToken: "" },
  }));
  mockedAxiosPut.mockImplementation(async () => ({
    data: { stations: [], lines: [] },
  }));
  mockedAxiosDelete.mockImplementation(async () => ({
    data: { stations: [], lines: [] },
  }));
};

const useSelectorMock = () => {
  const mockedUseAppSelector = useAppSelector as jest.MockedFunction<
    typeof useAppSelector
  >;

  mockedUseAppSelector.mockImplementation((selector) => selector(initialState));
};

beforeEach(() => {
  axiosMock();
  useSelectorMock();
});

afterEach(() => {
  cleanup();
});
