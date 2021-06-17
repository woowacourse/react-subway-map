import axios from "axios";

const mockingAxiosError = () => {
  const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

  mockedAxiosGet.mockImplementation(async () => {
    throw Error("에러!");
  });

  const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

  mockedAxiosPost.mockImplementation(async () => {
    throw Error("에러!");
  });

  const mockedAxiosPut = axios.put as jest.MockedFunction<typeof axios.put>;

  mockedAxiosPut.mockImplementation(async () => {
    throw Error("에러!");
  });

  const mockedAxiosDelete = axios.delete as jest.MockedFunction<
    typeof axios.delete
  >;

  mockedAxiosDelete.mockImplementation(async () => {
    throw Error("에러!");
  });
};

export { mockingAxiosError };
