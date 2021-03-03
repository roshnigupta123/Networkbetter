import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, colors, fontfamily } from '../globalstyles/Styles';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: fontsize.subtitle,
    fontFamily: fontfamily.medium,
  },
  subtitle: {
    fontSize: fontsize.label,
    fontFamily: fontfamily.regular,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  img: {
    width: 20,
    height: 20,
  },
  plus: {
    width: 15,
    height: 15,
  },
  categorybtn: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45
  },
  itemsContainerStyle: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    maxHeight: 200,
    marginTop: 5
  },
  textInputStyle: {
    borderColor: '#ccc',
    borderWidth: 0.5,
    height: 45,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 15,
    fontSize:fontsize.label,
   
  },
  inputcontainer:{
   margin:10
  },
  button: {
    //  width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  assignbutton: {
    height: 40,
    padding: 10,
    backgroundColor: '#536CBC',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 5,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: fontsize.label,
    fontFamily: fontfamily.regular
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle:{
    backgroundColor:"transparent",
    borderTopWidth:0,
    borderBottomWidth:0,
   
  },
  inputContainerStyle:{
    backgroundColor:"transparent",
    borderWidth:1,
    borderBottomWidth:1,
    borderColor: '#ccc',
    borderRadius:45,
    height:45
  },
  inputStyle:{
    color:'#000',
     fontSize:15,
    // fontFamily: fontfamily.regular
  }
})