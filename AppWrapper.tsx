import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as Network from 'expo-network';

import {
  infoGetStart,
  ActionType
} from './src/redux/show-info/show-info.actions';
import { userGetStart } from './src/redux/user/getMe/users.actions';

import AppNavigator from './src/navigation/AppNavigator';

export const { width, height } = Dimensions.get('window');

import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomLayout from './src/custom/CustomLayout';
import CustomTextAnimated from './src/custom/CustomTextAnimated';

interface Props {
  infoGetStart: () => ActionType;
  userGetStart: () => AnyAction;
}

const styles = StyleSheet.create({
  layout: { flex: 1, justifyContent: 'center', alignItems: 'center', height },
  text: {
    fontSize: 20,
    color: 'white',
    width: width * 0.8,
    textAlign: 'center',
    marginBottom: 30
  }
});

const AppWrapper: React.FC<Props> = ({ infoGetStart, userGetStart }) => {
  const [connected, setIsConnected] = useState<boolean>(true);

  if (!connected) {
    return (
      <CustomLayout style={styles.layout}>
        <CustomTextAnimated
          animation="pulse"
          type="extra-bold-italic"
          style={styles.text}
        >
          Oh Boy! Looks like you have no intenet connection! We are sorry but we
          can't make this app work without a connection to internet!
        </CustomTextAnimated>
        <MaterialCommunityIcons
          color="white"
          name="emoticon-angry-outline"
          size={80}
        />
      </CustomLayout>
    );
  }

  useEffect(() => {
    infoGetStart();
    userGetStart();
  }, []);

  useEffect(() => {
    let run: boolean = true;
    const getNet = async () => {
      const res: any = await Network.getNetworkStateAsync();

      if (run) {
        setIsConnected(res.isConnected);
      }
      getNet();

      return () => {
        run = false;
      };
    };
  }, []);

  return <AppNavigator />;
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      infoGetStart,
      userGetStart
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AppWrapper);
