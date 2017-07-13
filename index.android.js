/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import TextInputFlat from './widget/TextInputFlat';

export default class ZTXDComponents extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Madoka</Text>


                <TextInputFlat
                    style={styles.input}
                    label={'手机号'}
                    labelStyle={{ color: '#008445' }}
                />

                <TextInput style={styles.input} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding:16
    },
    input: {
        marginTop: 4,
        width:Dimensions.get('window').width
    },

});

AppRegistry.registerComponent('ZTXDComponents', () => ZTXDComponents);
