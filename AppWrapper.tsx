import React, {useEffect} from 'react'

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import  { connect } from 'react-redux';

import { infoGetStart, ActionType } from './src/redux/show-info/show-info.actions';
import { userGetStart } from './src/redux/user/getMe/users.actions'


import AppNavigator from './src/navigation/AppNavigator';

interface Props {
    infoGetStart: () => ActionType
    userGetStart: () => AnyAction
    
}

const AppWrapper: React.FC<Props> = ({infoGetStart, userGetStart}) => {
    useEffect(() => {
    infoGetStart()
    userGetStart()
  }, [])
    return <AppNavigator />  
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
bindActionCreators(
  {
    infoGetStart,
    userGetStart,
  },
  dispatch,
);
export default connect(null, mapDispatchToProps)(AppWrapper)