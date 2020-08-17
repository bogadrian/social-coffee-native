import React, {useEffect} from 'react'

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import  { connect } from 'react-redux';

import { infoGetStart, ActionType } from './src/redux/show-info/show-info.actions';

import AppNavigator from './src/navigation/AppNavigator';

interface Props {
    infoGetStart: () => ActionType
}

const AppWrapper: React.FC<Props> = ({infoGetStart}) => {
    useEffect(() => {
    infoGetStart()
  }, [])
    return <AppNavigator />
    
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
bindActionCreators(
  {
    infoGetStart,
  },
  dispatch,
);
export default connect(null, mapDispatchToProps)(AppWrapper)