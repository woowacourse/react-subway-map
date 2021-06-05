export interface HttpResponse<T = void> {
  data: T;
  error: string | null;
}
