import { IUsersTypes } from './users.types';

import { UserAction } from './getMe/users.actions';

export interface IState {
  user: any;
  err: string | null;
  isLoading: boolean;
}

let INITIAL_STATE = {
  user: null,
  err: null,
  isLoading: false
};

export const userReducer = (
  state: IState = INITIAL_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case IUsersTypes.START_GET_USER:
    case IUsersTypes.START_LOGIN_USER:
    case IUsersTypes.START_LOGIN_PROVIDER:
    case IUsersTypes.START_SIGNUP_USER:
    case IUsersTypes.START_SIGNUP_PROVIDER:
      return {
        ...state,
        isLoading: true
      };

    case IUsersTypes.SUCCESS_LOGIN:
    case IUsersTypes.SUCCESS_SIGNUP:
    case IUsersTypes.SUCCESS_USER_GET:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoading: false
      };
    case IUsersTypes.FAILURE_LOGIN:
    case IUsersTypes.FAILURE_SIGNUP:
    case IUsersTypes.FAILURE_USER_GET:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoading: false
      };
    case IUsersTypes.CLEAN_ERRORS:
      return {
        ...state,
        err: null
      };
    default:
      return state;
  }
};

export default userReducer;
