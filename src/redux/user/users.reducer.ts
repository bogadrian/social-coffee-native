import { IUsersTypes } from './users.types';

import { UserAction } from './getMe/users.actions';

export interface IState {
  user: any;
  err: string | null;
  isLoadingLogin: boolean;
  isLoadingSignup: boolean;
  isLoadingGEt: boolean;
  isLoadingReset: boolean;
}

let INITIAL_STATE = {
  user: null,
  err: null,
  isLoadingLogin: false,
  isLoadingSignup: false,
  isLoadingGEt: false,
  isLoadingReset: false
};

export const userReducer = (
  state: IState = INITIAL_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case IUsersTypes.START_GET_USER:
      return {
        ...state,
        isLoadingGEt: true
      };
    case IUsersTypes.START_LOGIN_USER:
    case IUsersTypes.START_LOGIN_PROVIDER:
      return {
        ...state,
        isLoadingLogin: true
      };
    case IUsersTypes.START_SIGNUP_USER:
    case IUsersTypes.START_SIGNUP_PROVIDER:
      return {
        ...state,
        isLoadingSignup: true
      };
    case IUsersTypes.START_RESET_PASSWORD:
      return {
        ...state,
        err: null,
        user: null,
        isLoadingReset: true
      };

    case IUsersTypes.SUCCESS_LOGIN:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoadingLogin: false
      };
    case IUsersTypes.SUCCESS_SIGNUP:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoadingSignup: false
      };
    case IUsersTypes.SUCCESS_USER_GET:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoadingGet: false
      };
    case IUsersTypes.SUCCESS_RESET_PASSWORD:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoadingReset: false
      };
    case IUsersTypes.FAILURE_LOGIN:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoadingLogin: false
      };
    case IUsersTypes.FAILURE_SIGNUP:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoadingSignup: false
      };
    case IUsersTypes.FAILURE_USER_GET:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoadingGet: false
      };
    case IUsersTypes.FAILURE_RESET_PASSWORD:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoadingReset: false
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
