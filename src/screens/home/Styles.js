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
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    humbrgrmenu: {
        width: 20,
        height: 20
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    NWtxt: {
        marginTop: 40,
        fontSize: fontsize.subheading,
        fontFamily: fontfamily.light,
        color: '#fff',
    },
    bettertxt: {
        marginTop: 40,
        fontSize: fontsize.subheading,
        fontFamily: fontfamily.medium,
        color: '#fff',
    },
    cardsty: {
        borderRadius: 15
    },
    card: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        backgroundColor: '#fff',
        width: "100%",
        height: "70%",
        overflow: 'hidden',
        elevation: 1,
    },
    cardfilter: {
        overflow: 'hidden',
        borderColor: '#E8E8E8',
        backgroundColor: '#fff',
        borderWidth: 1,
        elevation: 1,
        borderRadius: 20,
        height: "85%",
        width: width - 40,
        marginTop: "-15%",
    },
    blackCard: {
         backgroundColor: '#3D3D3D',
        padding: 10,
        position: 'absolute',
        bottom: 15,
        marginHorizontal: 20,
        borderRadius: 20,
         width: "90%"
        
    },
    crdtext: {
        fontFamily: fontfamily.regular,
        fontSize: fontsize.label,
        color: '#fff',
        textAlign: 'center'
    },
    swipecrdsty: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        marginTop: 10
    },
    title: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.medium,
    },
    subtitle: {
        fontSize: fontsize.label,
        fontFamily: fontfamily.light,
        color: '#A7A7A7',
    },
    plusicon: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#fff',
        elevation: 5,
        borderWidth: 0.3,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        width: 15,
        height: 15,
    //    color:'#A7A7A7'
    },
    row: {
        flexDirection: 'row',
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
    textInputStyle: {
        borderColor: '#ccc',
        borderWidth: 0.5,
        height: 45,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 15,
        fontSize:fontsize.label,
    },
    itemsContainerStyle: {
        borderColor: '#ccc',
        borderWidth: 0.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        maxHeight: 200,
        marginTop: 5
    },
    categorybtn: {
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 15,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45
    },
    circle1: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.warning,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        overflow:'hidden',
        elevation:10
    },
    circle2: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#F8D751',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
    },
    hitxt: {
        fontSize: fontsize.title,
        fontFamily: fontfamily.bold,
        color: '#000',
    },
})