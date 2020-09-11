import axios from 'axios'
import * as SecureStore from 'expo-secure-store';

import {URL} from '../../constants/variables'

 export const getUserToken = async() => {
   try {
     const token = await SecureStore.getItemAsync('jwt')
   
     if (token) {
          const user: any = await axios.get(`${URL}/api/v1/users/getMe`,
      {  
          headers: {
          Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
        }}
      );
      
  
      if (user.emailConfirm === false) {
          console.log('Please confirm your email first!')
      }
            return user.data.data.user 
     }
  }catch (err) {
    console.log(err)
  }

  
}


export const getProviderToken = async() => { 
  
  try {
      const token = await SecureStore.getItemAsync('jwt')
      
      if (token) {
           const provider = await axios.get(`${URL}/api/v1/provider/getMe`, {  
        headers: {
        Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
      }}
        )
       return provider.data.data.user 
      }
  }catch (err) {
    console.log(err)
  }

}