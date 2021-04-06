import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AnimatedProgressWheel from './AnimatedProgressWheel';

class App extends Component {
  state = {
    progress: 0,
  };

  setNewval = () => {
    const newVal = Math.floor(Math.random() * 100) + 1;
    this.setState({progress: newVal});
    this.circleProgress.animateTo(newVal);
    this.circleProgress2.animateTo(newVal);
    this.circleProgress3.animateTo(newVal);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#333',
        }}>
        <AnimatedProgressWheel
          duration={400}
          ref={ref => (this.circleProgress = ref)}
          size={200}
          progress={100}
          animateFromValue={0}
          width={24}
          color={'pink'}
          fullColor={'red'}
        />
        <View style={{height: 40}} />
        <AnimatedProgressWheel
          ref={ref => (this.circleProgress2 = ref)}
          size={120}
          width={20}
          color={'orange'}
          backgroundColor={'black'}
        />
        <View style={{height: 40}} />
        <AnimatedProgressWheel
          ref={ref => (this.circleProgress3 = ref)}
          size={100}
          width={30}
          color={'lightblue'}
          backgroundColor={'#556'}
        />
        <View style={{height: 40}} />
        <TouchableOpacity onPress={this.setNewval}>
          <Text style={{padding: 20, fontSize: 40, color: 'grey'}}>
            {this.state.progress}%
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default App;
