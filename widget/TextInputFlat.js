/**
 * Created by Jack on 17/7/13.
 */
import  React, {PropTypes} from 'react';
import {
    Animated,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import BaseInput from './BaseInput';
const PADDING = 10;
const LABEL_HEIGHT = 40;

export default class TextInputFlat extends BaseInput {
    static propTypes = {
        borderColor: PropTypes.string,
        inputType: PropTypes.string,
        height: PropTypes.number,
    }

    static defaultProps = {
        borderColor: '#999999',
        animationDuration: 250,
        height: LABEL_HEIGHT
    }

    _togglePW() {
        console.log("password toggle");
    }

    _showDelete() {
        console.log('show delete')
        if (this.state.value && this.isFocused()) {
            return (
                <TouchableOpacity onPress={this.clear.bind(this)}
                                  style={{position: 'absolute', right: 4, backgroundColor: 'red'}}>
                    <Image source={require('./res/image/delete.png')} style={{width: 30, height: 30,}}
                           resizeMode={'contain'}/>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    }

    /**
     * 默认不展示密码，若此文本框为密码类型的话，
     * @private
     */
    _showPassword() {
        if (this.props.inputType == "password") {
            return (
                <TouchableOpacity onPress={this._togglePW.bind(this)} style={{position: 'absolute', right: 4}}>
                    <Image source={require('./res/image/cleartext.png')}/>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }

    render() {
        const {label, style: containerStyle, height: inputHeight, inputStyle, labelStyle, borderColor} = this.props;
        const {width, value, focusedAnim} = this.state;
        console.log('width', width)
        return (
            <View style={[containerStyle, {
                height: inputHeight + LABEL_HEIGHT / 2,
            }]}
            >
                <View style={{marginTop: LABEL_HEIGHT / 2}}>
                    <TextInput
                        ref="input"
                        {...this.props}
                        style={[
                            styles.textInput,
                            {
                                width,
                                height: inputHeight,
                                borderColor: borderColor
                            }
                        ]}
                        underlineColorAndroid="transparent"
                        value={value}
                        onBlur={this._onBlur}
                        onChange={this._onChange}
                        onFocus={this._onFocus}
                    />

                </View>

                {/*{this._showDelete()}*/}
                {/*{this._showPassword()}*/}

                < TouchableWithoutFeedback
                    onPress={this.focus}>
                    <Animated.View
                        style={[styles.labelContainer,
                            {
                                width,
                                height: focusedAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [LABEL_HEIGHT - 4, LABEL_HEIGHT / 2]
                                }),//宽度应该也是可变的，和字体一起改变
                                top: focusedAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [LABEL_HEIGHT / 2 + 2, LABEL_HEIGHT / 4]
                                }),
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }
                        ]
                        }>
                        <Animated.Text
                            style={
                                [styles.label,
                                    labelStyle,
                                    {
                                        fontSize: focusedAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [18, 12]
                                        })
                                    }
                                ]
                            }>
                            {label}
                        </Animated.Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
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
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 1,
        paddingTop: PADDING
    },
})
