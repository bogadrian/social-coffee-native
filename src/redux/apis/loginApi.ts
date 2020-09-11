import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { URL} from '../../constants/variables'

export const makeCallLoginWithUser = async(user: any) => {

  const data = user.user
    try { 
      const axiosInstance = await axios.create({
        baseURL: `${URL}/api/v1/users/login`,
        headers: {
          'Content-Type': `application/json`
        }
      });
    
      const userLoggedIn = await axiosInstance({
        method: 'POST',
        data
      });
      
    SecureStore.setItemAsync('jwt', userLoggedIn.data.token)
     return userLoggedIn.data.data.user
    
    }catch (err) {
        console.log(err)
    }
  
}

export const makeCallLoginProvider = async(user: any) => {
    
    const data = user.user
    
    
    try { 
        const axiosInstance = await axios.create({
        baseURL: `${URL}/api/v1/provider/login`,
        headers: {
          'Content-Type': `application/json`
        }
      });
    
      const userLoggedIn = await axiosInstance({
        method: 'POST',
        data
      });
      
    SecureStore.setItemAsync('jwt', userLoggedIn.data.token)
     return userLoggedIn.data.data.user
    }catch (err) {
        console.log(err)
    }
  
}
