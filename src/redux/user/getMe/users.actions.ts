import { IUsersTypes } from '../users.types';

export interface StartActionType {
  type: IUsersTypes;
  error?: string;
}

export const userGetStart = (): StartActionType => {
  return { type: IUsersTypes.START_GET_USER };
};
