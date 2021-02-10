import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, colors, fontfamily } from '../globalstyles/Styles';

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content:{
        padding:20
    },
    title:{
        fontSize: fontsize.subtitle,
        fontFamily: fontfamily.medium,
    },
    subtitle:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular,
        color:'#000',
      },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15
     },
     img:{
         width:20,
         height:20,
     },
     categorybtn:{
         backgroundColor:'#E5E5E5',
         paddingHorizontal:15,
         paddingVertical:2,
         alignItems:'center',
         justifyContent:'center',
         borderRadius:45
     }
})