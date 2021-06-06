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

export interface ServerInfo {
  serverName: string;
  baseURL: string;
}
