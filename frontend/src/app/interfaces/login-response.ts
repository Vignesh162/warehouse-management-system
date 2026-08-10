export interface LoginResponse {
token: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
}
