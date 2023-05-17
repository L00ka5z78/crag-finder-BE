export interface IJwtPayload {
  id: string;
  token: string;
}

export interface IRefreshJwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

export interface ITokenData {
  token: string;
  expiresIn: number;
}

export enum CookiesNames {
  AUTHORIZATION = 'Authorization',
  REFRESH = 'Refresh',
}
