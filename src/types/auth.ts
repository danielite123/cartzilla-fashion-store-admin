export interface IRegisterPayload {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
