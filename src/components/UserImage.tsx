import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';

interface Props {
  user: any;
}

const UserImage: React.FC<Props> = ({ user }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      {user ? (
        <Image
          source={
            user.photo
              ? { uri: 'https://reactjs.org/logo-og.png' }
              : require('../assets/user-default.jpg')
          }
          style={{
            width: 40,
            height: 40,
            borderRadius: 40 / 2,
            marginLeft: 15,
            marginBottom: 5
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.user
});

export default connect(mapStateToProps)(UserImage);
