import { combineReducers } from 'redux';

import infoReducer from './show-info/show-info.reducer'

export const rootReducer = combineReducers({
   isInfo: infoReducer
});

export type AppState = ReturnType <typeof rootReducer>;
