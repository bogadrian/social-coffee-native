import { combineReducers } from 'redux';

import infoReducer from './show-info/show-info.reducer'
import getUserReducer from './getUser/users.reducer'

export const rootReducer = combineReducers({
   isInfo: infoReducer, 
   me: getUserReducer
});

export type AppState = ReturnType <typeof rootReducer>;
