export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
  photo: string;
  emailConfirm?: boolean;
  description: string;
  active: boolean;
}

export interface IProvider {
  name: string;
  email: string;
  passsword: string;
  passwordConfirm: string;
  images: string[];
  emailConfirm: string;
  role: string;
  active: boolean;
  vat: string;
  address: string;
  photo: string;
  description: string;
  passwordChangeAt: Date;
}

export type IUserType = IUser | IProvider;
