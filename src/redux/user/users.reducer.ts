import { IUsersTypes } from './users.types';

import { AnyAction } from 'redux';
import { IUserType } from '../../types/user.types';

export interface IState {
  user: IUserType | null;
  err: string | null;
  isLoadingLogin: boolean;
  isLoadingSignup: boolean;
  isLoadingGet: boolean;
  isLoadingReset: boolean;
  isLoadingUpdate: boolean;
  isLoadingPass: boolean;
  changeSuccess: boolean;
  isLoadingPdf: boolean;
}

let INITIAL_STATE = {
  user: null,
  err: null,
  isLoadingLogin: false,
  isLoadingSignup: false,
  isLoadingGet: false,
  isLoadingReset: false,
  isLoadingUpdate: false,
  isLoadingPass: false,
  changeSuccess: false,
  isLoadingPdf: false
};

export const userReducer = (
  state: IState = INITIAL_STATE,
  action: AnyAction
) => {
  switch (action.type) {
    case IUsersTypes.START_GET_USER:
      return {
        ...state,
        isLoadingGet: true
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
        isLoadingReset: true
      };
    case IUsersTypes.START_UPDATE_ME:
      return {
        ...state,
        isLoadingUpdate: true
      };
    case IUsersTypes.START_CHANGE_PASSWORD:
      return {
        ...state,
        changePassword: false,
        isLoadingPass: true
      };
    case IUsersTypes.UPLOAD_START:
      return { ...state, isLoadingPdf: true };
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
    case IUsersTypes.UPDATE_ME_SUCCESS:
      return {
        ...state,
        user: action.user,
        err: null,
        isLoadingUpdate: false
      };
    case IUsersTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        err: null,
        user: action.user,
        changeSuccess: true,
        isLoadingPass: false
      };
    case IUsersTypes.UPLOAD_SUCCESS:
      return { ...state, err: null, user: action.user, isLoadingPdf: false };
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

    case IUsersTypes.UPDATE_ME_FAILURE:
      return {
        ...state,
        user: null,
        err: action.error,
        isLoadingUpdate: false
      };
    case IUsersTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        err: action.error,
        isLoadingPass: false
      };
    case IUsersTypes.UPLOAD_FAILURE:
      return { ...state, err: action.error, isLoadingPdf: false };
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
