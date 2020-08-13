import React from 'react'
import {View, StyleSheet, Button} from 'react-native'
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import  { connect } from 'react-redux';



import Color from '../../constants/Color'
import {startToggleInfo} from '../../redux/show-info/show-info.actions';

interface Props {
    startToggleInfo?: any
}

const InfoCard4: React.FC<Props> = ({startToggleInfo}) => {
    
    return (
    <View style={styles.container}>
        
        <Button title="close" onPress={startToggleInfo} />
        
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: '95%',
        borderWidth: 1,
        marginTop: 30,
        borderColor: 'white',
        backgroundColor: Color.backGroundPrimary,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 40
    }
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
        startToggleInfo
    },
    dispatch
  );

  
  export default connect(null, mapDispatchToProps)(InfoCard4)
