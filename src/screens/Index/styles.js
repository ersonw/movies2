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
    // hearButtonImage:{
    //     width: '100%',
    // },
});