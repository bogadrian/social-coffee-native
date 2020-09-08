import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

const token = SecureStore.getItemAsync('jwt')

import {URL} from '../../constants/variables'

 export const getUserToken = async() => {
   
   const user: any = await axios.get(`${URL}/api/v1/users/getMe`,
  {  
      headers: {
      Authorization: `Bearer ${token}`,
     'Access-Control-Allow-Origin': '*'
    }}
  );
  
  console.log('This is my user:', user.data.data.user)
  if (user.emailConfirm === false) {
      console.log('Please confirm your email first!')
  }
        return user.data.data.user
}


export const getProviderToken = async() => { 

const provider = await axios.get(`${URL}/api/v1/provider/getMe`, {  
    headers: {
    Authorization: `Bearer ${token}`,
   'Access-Control-Allow-Origin': '*'
  }}
);

console.log('this is the provider', provider.data.data.user)
return provider.data.data.user
}