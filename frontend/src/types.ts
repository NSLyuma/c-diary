export type AuthState = {
  userName: string;
  isAuth: boolean;
  error: string | undefined;
};

export type UserData = {
  authType: string;
  userName: string | null;
  email: string | null;
  password: string | null;
};
