import {Audio}  from 'expo-av';

const playSound = async () => {
  try {
    await Audio.setAudioModeAsync({
     allowsRecordingIOS: false,
     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
     playsInSilentModeIOS: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    shouldDuckAndroid: true,
    staysActiveInBackground: false,
    playThroughEarpieceAndroid: false
   })
   
   const sound = new Audio.Sound()
   const status = {
     shouldPlay: false,
   }
   
    await sound.loadAsync(require('../assets/sounds/click3.mp3'), status, false) 
  
    return sound.playAsync() 
  }catch (err) {
    console.log(err)
  }
  } 
   
   export default playSound