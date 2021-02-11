import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, colors, fontfamily } from '../globalstyles/Styles';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
        flex:1
    },
    imagebg: {
        width: width, 
        height: height, 
       resizeMode:'cover',
    },
    textcontainer:{
        //  marginTop:'110%'
        position:'absolute',
        bottom:0,
        padding: 20,
    },
    wlcmtxt:{
      fontSize: fontsize.label,
      fontFamily: fontfamily.regular,
      color:'#fff',
    },
    NWtxt:{
        fontSize: fontsize.heading,
        fontFamily: fontfamily.regular,
        color:'#fff',
        marginTop:5
    },
    bettertxt:{
        fontSize: fontsize.heading,
        fontFamily: fontfamily.medium,
        color:colors.warning,
        marginTop:5
    },
    circle1:{
        width: 100,
        height:100,
        borderRadius:100/2,
        backgroundColor: colors.warning,
        justifyContent:'center',
        alignItems: 'center',
        marginBottom:10
    },
    circle2:{
        width: 80,
        height:80,
        borderRadius:80/2,
        backgroundColor: '#F8D751',
        zIndex:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    center:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginLeft:'45%'
    },
    arrow:{
        width: 15,
        height:15,marginBottom:10
    },
    hitxt:{
        fontSize: fontsize.title,
        fontFamily: fontfamily.bold,
        color:'#000',
    },
    suggestion:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color:'rgba(255, 255, 255, 0.47)',
    }
})