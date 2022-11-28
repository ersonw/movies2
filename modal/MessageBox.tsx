// @ts-ignore
import {Overlay, Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from '../src/constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from "react";

const {width} = Dimensions.get('window');
export type MessageBoxProps = {
    title?: string,
    context: string,
    okLabel?: string,
    okButton?: boolean,
    okCallback?: () => void,
    cancelButton?: boolean,
    cancelLabel?: string,
    cancelCallback?: () => void;
}
const MessageBox = (props: MessageBoxProps) => {
    if (!props.okButton && !props.cancelButton) props.okButton = true;
    let that = Overlay.show(
        {
            style: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            onShow: () => {
                // if (!props.okButton && !props.cancelButton) props.okButton = true;
            },
            onClose: function () {
                console.log('Overlay closed');
            },
            enableBackPress: true,
            children: () => {
                return (
                    <View style={styles.container}>
                        <View style={styles.closeBox}>
                            <Icon
                                name="highlight-off"
                                size={25}
                                color={Colors.black}
                                style={styles.close}
                                onPress={() => that.close()}
                            />
                        </View>
                        <View style={styles.titleBox}>
                            {props.title && (
                                <Text style={styles.title}>{props.title}</Text>)}
                        </View>
                        <View style={styles.contextBox}>
                            {props.context && (
                                <Text style={styles.context}>{props.context}</Text>)}
                        </View>
                        <View style={styles.buttonBox}>
                            { props.okButton &&
                                (<TouchableOpacity
                                    style={{
                                        ...styles.okBox,
                                        ...(props.cancelButton ? {width: '45%'}:{}),
                                    }}
                                    onPress={() => {
                                        that.close();
                                        props.okCallback && props.okCallback();
                                    }}
                                >
                                    <Text style={styles.okButton}>{props.okLabel || '确定'}</Text>
                                </TouchableOpacity>)
                            }
                            { props.cancelButton &&
                                (<TouchableOpacity
                                    style={{
                                        ...styles.cancelBox,
                                        ...(props.okButton ? {width: '45%'}:{}),
                                    }}
                                    onPress={() => {
                                        that.close();
                                        props.cancelCallback && props.cancelCallback();
                                    }}
                                >
                                    <Text style={styles.cancelButton}>{props.cancelLabel || '取消'}</Text>
                                </TouchableOpacity>)
                            }
                        </View>
                    </View>);
            }
        }
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 36,
        width: (width - 60),
    },
    close: {
        marginRight: 15,
        marginTop: 15,
    },
    closeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: Colors.black,
    },
    titleBox: {
        // margin: 15,
    },
    title: {
        color: Colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    contextBox: {
        margin: 15,
    },
    context: {
        textAlign: 'center',
    },
    buttonBox: {
        width: '90%',
        margin: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row",
    },
    okBox: {
        backgroundColor: Colors.primary,
        borderRadius: 35,
        width: '100%',
    },
    okButton: {
        textAlign: 'center',
        margin: 7,
        color: Colors.white,
    },
    cancelBox: {
        backgroundColor: Colors.date,
        borderRadius: 35,
        width: '100%',
    },
    cancelButton: {
        textAlign: 'center',
        margin: 7,
        color: Colors.primary,
    },
});
export default MessageBox;