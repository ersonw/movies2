import React, { Component } from 'react';
import { Animated, Easing, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

let element = null;

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;
const marginHor = 50;
const animationDuration = 500;

export default class PopupWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aniColor: new Animated.Value(0),
      aniScale: new Animated.Value(0),
      visible: false,
    };
    this.animationOpacity = Animated.timing(this.state.aniColor, {
      toValue: 0.5,
      duration: animationDuration,
    });
    this.animationScale = Animated.spring(this.state.aniScale, {
      toValue: 1,
      duration: animationDuration,
      bounciness: 10,
      speed: 20,
    });
    this.animationGroup = Animated.parallel([this.animationOpacity, this.animationScale]);
  }
  showCallBack = finished => {
    console.log('动画显示完毕回调');
  };
  hideCallBack = finished => {
    console.log('动画移除完毕回调');
  };

  /**
   * 显示弹窗
   * @param {显示完成回调} showCallBack
   */
  show(showCallBack = this.showCallBack) {
    this.setState({ visible: true });
    this.showAnimation(showCallBack);
  }
  showAnimation(showCallBack = result => {}) {
    this.animationGroup.start(showCallBack);
  }
  /**
   * 隐藏弹窗
   */
  hide() {
    this.setState({ visible: false });
    this.hideAnimation();
  }
  hideAnimation() {
    this.animationGroup.reset();
  }

  render() {
    let {
      children,
      marginHorizontal = marginHor,
      touchUpDismiss = false,
      onTouchUpMask,
      maskColor = 'rgba(23,25,25,0.5)',
    } = this.props;
    if (!this.state.visible) {
      return <View />;
    }

    return (
      <AnimatedTouchableOpacity
        activeOpacity={1}
        style={[styles.window, { backgroundColor: maskColor }]}
        onPress={event => {
          console.log('window popup click');

          if (onTouchUpMask != 'undefined' && onTouchUpMask != null) {
            onTouchUpMask();
            debugger;
            return;
          }
          if (touchUpDismiss) {
            this.hide();
          }
        }}>
        <TouchableOpacity style={styles.container} activeOpacity={1}>
          <Animated.View
            style={[
              styles.container,
              { marginHorizontal: marginHorizontal },
              { transform: [{ scaleX: this.state.aniScale }, { scaleY: this.state.aniScale }] },
            ]}>
            {this.renderChildrenComponents()}
          </Animated.View>
        </TouchableOpacity>
      </AnimatedTouchableOpacity>
    );
  }
  /**
   * 子类复写这个方法 可以定义
   */
  renderChildrenComponents() {
    return this.props.children;
  }
}
//参数传递
PopupWindow.propTypes = {
  maskColor: PropTypes.string,
  marginHorizontal: PropTypes.number,
  touchUpDismiss: PropTypes.bool,
  onTouchUpMask: PropTypes.func,
};

const styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    width: screen_width - marginHor * 2,
    marginHorizontal: marginHor,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
