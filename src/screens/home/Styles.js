import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, colors, fontfamily } from '../globalstyles/Styles';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        padding: 20,
    },
    imagebg: {
        flex:1 
    },
    header:{
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop:15
    },
    humbrgrmenu:{
        width:20,
        height:20
    },
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    NWtxt:{
        marginTop:40,
        fontSize: fontsize.subheading,
        fontFamily: fontfamily.light,
        color:'#fff',
    },
    bettertxt:{
        marginTop:40,
        fontSize: fontsize.subheading,
        fontFamily: fontfamily.medium,
        color:'#fff',
    },
    cardsty:{
        borderRadius:15
    },
    card: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        backgroundColor: '#fff',
      marginTop:'40%',
    
      },
      blackCard:{
          backgroundColor:'#3D3D3D',
          padding:30,
          position:'absolute',
          bottom:10,
          marginHorizontal:20,
          borderRadius: 20,
          width:"90%"
      },
      crdtext:{
          fontFamily:fontfamily.regular,
          fontSize: fontsize.label,
          color:'#ccc',
          textAlign:'center'
      },
      swipecrdsty:{
          flexDirection:'row',
          justifyContent:'space-between',
          padding:20,
          marginTop:10
      },
      title:{
          fontSize: fontsize.title,
          fontFamily: fontfamily.medium,
      },
      subtitle:{
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color:'#A7A7A7',
      },
      plusicon:{
          width:40,
          height:40,
          borderRadius:40/2,
          backgroundColor:'#fff',
          elevation:5,
          borderWidth:0.3,
          borderColor:'#ccc',
          justifyContent:'center',
          alignItems:'center'
      },
      plus:{
          width:15,
          height:15,
          color:'#ccc'
      },
      row:{
          flexDirection:'row',
      }
})