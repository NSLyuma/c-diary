export type AuthState = {
  userName: string;
  isAuth: boolean;
  error: string | undefined;
  enterError: string | undefined;
};

export interface InputData {
  userName: string | null;
  email: string | null;
  password: string | null;
}

export interface UserData extends InputData {
  authType: string;
}

export interface UserFormData extends InputData {
  required?: boolean;
}
