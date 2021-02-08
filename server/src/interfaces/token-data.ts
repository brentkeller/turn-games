export interface AuthToken {
  token: string;
  expiresIn: number;
}

export interface AuthTokenData {
  _id: string;
  name: string;
}
