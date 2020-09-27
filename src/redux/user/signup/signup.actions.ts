import { IUsersTypes } from '../users.types';

interface ILocation {
  latitude: number;
  longitude: number;
}

interface IValuesProvider {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  address: string;
  vat: string;
  position: ILocation;
}

interface IValuesUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type IData = IValuesUser | IValuesProvider;

export const signupStartUser = (user: IValuesUser) => {
  return {
    type: IUsersTypes.START_SIGNUP_USER,
    user
  };
};
export const signupStartProvider = (user: IValuesProvider) => {
  return {
    type: IUsersTypes.START_SIGNUP_PROVIDER,
    user
  };
};
