import axios, { AxiosRequestConfig } from "axios";

type Method = "get" | "post" | "put" | "delete";

interface options {
  method?: Method;
  data?: any;
  config?: AxiosRequestConfig;
}

interface SuccessShape<T> {
  success: true;
  result: T;
}

interface FailureShape<T extends string> {
  success: false;
  code: string;
  result: T;
}

type Response<T> = SuccessShape<T> | FailureShape<string>;

const request = async <T>(
  path: string,
  { method = "get", data, config }: options = { method: "get" }
): Promise<Response<T>> => {
  try {
    const response =
      method === "get" || method === "delete"
        ? await axios[method]<T>(path, config)
        : await axios[method]<T>(path, data, config);

    return {
      success: true,
      result: response.data,
    };
  } catch (error) {
    return {
      success: false,
      code: error.response.code,
      result: error.response.data,
    };
  }
};

export { request };
