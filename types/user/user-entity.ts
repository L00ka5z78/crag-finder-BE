export enum UserRole {
  User = 1,
  Senior = 2, // might be unnecessary we'll see later
  Admin = 3,
}

export type UserEntity = {
  id?: string;
  role?: UserRole;
  email: string;
  password: string;
  currentToken?: string | null;
  refreshToken?: string | null;
};

/** User Requests & Responses */

export type UserLoginRequest = {
  email: string;
  password: string;
};
export type UserRegisterRequest = UserLoginRequest;

export type UserLoginResponse = Omit<UserEntity, 'password' | 'currentToken'>;
export type UserRegisterResponse = UserLoginResponse;
