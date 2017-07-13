/**
 * Created by Jack on 17/7/13.
 */
import  React, {PropTypes} from 'react';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import BaseInput from './BaseInput';
const PADDING = 10;
const TEXTINPUT_HEIGHT = 40;

export default class TextInputFlat extends BaseInput {
    static propTypes = {
        borderColor: PropTypes.string,
        height: PropTypes.number,
    }

    static defaultProps = {
        borderColor: '#999999',
        animationDuration: 250,
        height: 40
    }

    render() {
        const {label, style: containerStyle, height: inputHeight, inputStyle, labelStyle, borderColor} = this.props;
        const {width, value, focusedAnim} = this.state;
        console.log('label_height', TEXTINPUT_HEIGHT)
        return (
            <View style={[containerStyle, {
                height: inputHeight + TEXTINPUT_HEIGHT,
                backgroundColor: 'red'
            }]}
            >
                <View style={{marginTop: TEXTINPUT_HEIGHT}}>
                    <TextInput
                        ref="input"
                        {...this.props}
                        style={[
                            styles.textInput,
                            {
                                width,
                                height: inputHeight,
                                backgroundColor: 'blue'
                            }

                        ]}
                        underlineColorAndroid="transparent"
                        value={value}
                        onBlur={this._onBlur}
                        onChange={this._onChange}
                        onFocus={this._onFocus}
                    />
                </View>

                <TouchableWithoutFeedback onPress={this.focus}>
                    <Animated.View
                        style={[styles.labelContainer,
                            {
                                width,
                                height: TEXTINPUT_HEIGHT,//宽度应该也是可变的，和字体一起改变
                                backgroundColor: 'yellow',
                                top: focusedAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [TEXTINPUT_HEIGHT, 0]
                                }),
                                justifyContent: 'center'
                            }]}
                    >
                        <Animated.Text
                            style={[styles.label,
                                labelStyle, {
                                    fontSize: focusedAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [18, 12]
                                    })
                                }]}
                        >
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>);
    }
}

const styles = StyleSheet.create({
    labelContainer: {
        position: 'absolute',
        left: PADDING,
    },
    label: {
        backgroundColor: 'transparent',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        color: '#999999',
    },
    textInput: {
        borderColor: "#999999",
        borderRadius: 3,
        borderWidth: 1,
        paddingTop: 10
    },
})
