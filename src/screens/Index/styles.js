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
    listBox: {
        width: '95%',
    },
    heading: {
        textAlign: 'left',
        color: Colors.white,
        margin: 15,
    },
    itemBox: {},
    item: {},
    itemTitle: {},
    itemImage: {},
    buttonBox: {
        margin: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: 'rgba(253,253,253,0.1)',
        width: '37%',
        borderRadius: 9,
    },
    buttonTitle: {
        textAlign: 'center',
        color: Colors.white,
        margin: 9,
        fontSize: 12,
    },
});