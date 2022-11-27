import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    course: {
        marginTop: 10,
    },
    swiper: {
        display: 'flex',
    },
    swiperImage: {
        margin: '2%',
        height: '96%',
        width: '96%',
        borderRadius: 9,
    },
    content: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    headButton: {
        alignItems: 'center',
    },
    headButtonText: {
        marginTop: 6,
        color: Colors.white,
    },
    headButtonBox: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 15,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        color: Colors.premium,
    },
    default: {
        position: 'relative',
        width: 206,
        marginLeft: 8,
    },
    first: {
        marginLeft: 15,
    },
    last: {
        marginRight: 15,
    },
    image: {
        width: 206,
        height: 160,
        borderRadius: 5,
    },
    titleWrapper: {
        marginTop: 6,
        height: 48,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
        marginTop: 6,
        color: Colors.date,
    },
});