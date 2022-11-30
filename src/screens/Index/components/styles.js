import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export default StyleSheet.create({
    swiper: {
        display: 'flex',
    },
    swiperImage: {
        margin: '2%',
        height: '96%',
        width: '96%',
        borderRadius: 9,
    },
    container: {
        flex: 1,
        // marginTop: 45,
        backgroundColor: Colors.backgroundColor,
    },
    header: {
        backgroundColor: 'transparent',
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        marginTop: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerButtonBox: {
        // width: 60,
        marginRight: 15,
        backgroundColor: 'black',
        opacity: 0.2,
        borderRadius: 21,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4.5,
        marginBottom: 4.5,
        marginLeft: 12,
        marginRight: 12,
    },
});