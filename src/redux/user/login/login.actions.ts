import { IUsersTypes } from '../users.types';

interface ILogin {
  email: string;
  password: string;
}

export const loginStartUser = (user: ILogin) => {
  return {
    type: IUsersTypes.START_LOGIN_USER,
    user
  };
};

export const loginStartProvider = (user: ILogin) => {
  return {
    type: IUsersTypes.START_LOGIN_PROVIDER,
    user
  };
};
