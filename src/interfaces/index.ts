export interface HTTPResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
}
