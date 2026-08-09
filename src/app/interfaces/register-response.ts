export interface RegisterResponse {
    message: string;
  token: string;
  user: {
    id : string ;
    name : string;
    username : string
  }
}
