import { ITextPassword } from './textPassword.actions';

export interface IState {
  textType: boolean;
}
let INITIAL_STATE = {
  textType: true
};

export interface switchTextAction {
  type: ITextPassword;
}

export const textPasswordReducer = (
  state: IState = INITIAL_STATE,
  action: switchTextAction
) => {
  switch (action.type) {
    case ITextPassword.SWITH_TEXT:
      return {
        ...state,
        textType: !state.textType
      };
    default:
      return state;
  }
};
