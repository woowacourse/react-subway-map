export interface SignUpRequest {
  url: string;
  email: string;
  password: string;
  age: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
