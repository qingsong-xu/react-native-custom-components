/**
 * Created by Jack on 17/7/12.
 */
import {PropTypes, Component} from 'react';
import {Animated, Text, View, ViewPropTypes} from 'react-native';

export default class BaseInput extends Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        inputStyle: Text.propTypes.style,
        labelStyle: Text.propTypes.style,
        easing: PropTypes.func,
        animationDuration: PropTypes.number,
        useNativeDriver: PropTypes.bool,
        editable: PropTypes.bool,

        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
    };

    constructor(props, context) {
        super(props, context);

        this._onLayout = this._onLayout.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this.focus = this.focus.bind(this);

        const value = props.value || props.defaultValue;

        this.state = {
            value,
            focusedAnim: new Animated.Value(value ? 1 : 0)
        }
    }

    componentWillReceiveProps(newProps) {
        console.log('receiveProps', newProps);
        const newValue = newProps.value;
        if (newProps.hasOwnProperty('value') && newValue !== this.state.value) {
            this.setState({value: newValue});
        }

        const isFocused = this.refs.input.isFocused();
        if (!isFocused) {
            const isAction = Boolean(newValue);
            if (isAction !== this.isActive) {
                this._toggle(isAction);
            }
        }
    }

    _onLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    }

    _onChange(event) {
        this.setState({
            value: event.nativeEvent.text,
        });

        const onChange = this.props.onChange;
        if (onChange) {
            onChange(event)
        }
    }

    /**
     *
     * @param event
     * @public
     */
    _onBlur(event) {
        if (!this.state.value) {
            this._toggle(false);
        }

        const onBlur = this.props.onBlur;
        if (onBlur) {
            onBlur(event)
        }
    }

    _onFocus(event) {
        this._toggle(true);

        const onFocus = this.props.onFocus;
        if (onFocus) {
            onFocus(event)
        }
    }

    _toggle(isActive) {
        const {animationDuration, easing, useNativeDriver} = this.props;
        this.isActive = isActive;

        Animated.timing(this.state.focusedAnim, {
            toValue: isActive ? 1 : 0,
            duration: animationDuration,
            easing,
            useNativeDriver,
        }).start();
    }

    //public methods
    inputRef() {
        return this.refs.input;
    }

    focus() {
        if (this.props.editable !== false) {
            this.inputRef().focus();
        }
    }

    blur() {
        this.inputRef().blur();
    }

    isFocused() {
        return this.inputRef().isFocused();
    }

    clear() {
        this.inputRef().clear();
    }
}


