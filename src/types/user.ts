export type Role = "USER" | "ADMIN";

export interface IUserItem {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  address: string;
  contact: string;
  DOB: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
