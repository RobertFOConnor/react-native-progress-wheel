import React, {Component} from 'react';
import {StyleSheet, Text, View, Slider} from 'react-native';
import CircleProgress from './CircleProgress';

export default class App extends Component {

    state = {
        progress: 40,
    };

    render() {
        return (
            <View style={styles.container}>
                <CircleProgress progress={this.state.progress} animateFromValue={0}/>
                <Slider
                    style={{width: 200}}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.progress}
                    onValueChange={(value) => this.setState({progress: value})}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#334',
    },
});
