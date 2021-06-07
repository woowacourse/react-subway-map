export interface HTTPResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
