// @ts-ignore
import {ActivityIndicator, Overlay} from "react-native";
import * as React from "react";
import Colors from '../src/constants/Colors';
export type LoadingProps = {
    onClose?: ()=> void,
    onShow?: ()=> void,
};
const Loading = (props: LoadingProps) => {
    const that = Overlay.show(
        {
            style: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            onClose: props.onClose,
            onShow: props.onShow,
            children: () => {
                return (<ActivityIndicator size="large" color={Colors.white}/>);
            }
        }
    );
    const show = that.show;
    const close = that.close;
    return {show, close};
};
export const loaDing = Loading({});
export default Loading;