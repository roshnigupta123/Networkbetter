import { StyleSheet, Dimensions } from 'react-native';
import { fontsize, colors, fontfamily } from '../globalstyles/Styles';

const { width, height } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {

        padding: 20
    },
    heading: {
        fontFamily: fontfamily.medium,
        fontSize: fontsize.title
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    plus: {
        width: 15, height: 15
    },
    border: {
        height: 1.3,
        backgroundColor: '#ccc', marginBottom: 20,marginTop:20
    },
    title: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.medium,
        marginBottom:15
    },
    box: {
        paddingVertical: 5,
        backgroundColor: '#E5E5E5',
        height: 30,
        borderRadius: 3, marginRight: 10,marginBottom:10,
        paddingHorizontal: 10,

    },
    boxtext: {
        fontFamily: fontfamily.regular,
        fontSize: fontsize.label,
        color: '#fff',
        textAlign: 'center'
    },
    activebox: {
        paddingVertical: 5,
        backgroundColor: '#536CBC',
        height: 30,
        borderRadius: 3, margin: 5,
        paddingHorizontal: 10,
    },
    filterbtn: {
        height: 40,
        padding: 10,
        backgroundColor: '#536CBC',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 5,
        marginTop: 20,
        marginRight:10
    },
    disabledbtn:{
        height: 40,
        padding: 10,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 5,
        marginTop: 20,
        marginRight:10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular
    },
    boxtextdis:{
        color: '#A7A7A7',
        textAlign: 'center',
        fontSize: fontsize.label,
        fontFamily: fontfamily.regular
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    row:{
        flexDirection:'row',
    }
})
