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
     },
     itemsContainerStyle:{
        borderColor:'#ccc',
        borderWidth:0.5,
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        maxHeight:200,
        marginTop:5
      },
      textInputStyle:{
        borderColor:'#ccc',
        borderWidth:0.5,
        height:45,
        borderRadius:5,
        padding:15,
       
    },
    button: {
 
        //  width: '90%',
          height: 40,
          padding: 10,
          backgroundColor: '#4CAF50',
          justifyContent:'center',
          alignItems:'center',
          borderBottomLeftRadius:5,
          borderBottomRightRadius:5
        },
        assignbutton:{
          height: 40,
          padding: 10,
          backgroundColor: '#536CBC',
          justifyContent:'center',
          alignItems:'center',
          width:100,
          borderRadius:5,
          marginTop:20
        },
        buttonText: {
          color: '#fff',
          textAlign: 'center',
          fontSize:fontsize.label,
          fontFamily: fontfamily.regular
        },
        center:{
            justifyContent:'center',
            alignItems:'center'
        },
})