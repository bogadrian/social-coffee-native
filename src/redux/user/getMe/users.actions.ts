import { IUsersTypes } from '../users.types';

export interface UserAction {
  type: IUsersTypes;
  user?: {};
  error?: string;
}

export interface StartActionType {
  type: IUsersTypes;
  error?: string;
}

export const userGetStart = (): StartActionType => {
  return { type: IUsersTypes.START_GET_USER };
};
