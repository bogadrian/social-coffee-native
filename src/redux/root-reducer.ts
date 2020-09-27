import { combineReducers } from 'redux';

import infoReducer from './show-info/show-info.reducer';

import userReducer from './user/users.reducer';

export const rootReducer = combineReducers({
  isInfo: infoReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;
