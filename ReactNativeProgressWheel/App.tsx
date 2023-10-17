import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedProgressWheel from './AnimatedProgressWheel';

function App(): JSX.Element {
  const size = 300;
  const progress = 100;
  const duration = 2500;
  const width = 24;
  const rounded = true;

  return (
    <View style={styles.container}>
      <AnimatedProgressWheel
        delay={800}
        color={'#f9114f'}
        backgroundColor={'#340111'}
        {...{size, width, duration, progress, rounded}}
      />
      <View style={styles.absolute}>
        <AnimatedProgressWheel
          size={300 - width * 2 + 2}
          delay={300}
          color={'#ccfc00'}
          backgroundColor={'#1b3400'}
          {...{width, duration, progress, rounded}}
        />
      </View>
      <View style={styles.absolute}>
        <AnimatedProgressWheel
          size={300 - width * 4 + 4}
          color={'#09e4e0'}
          backgroundColor={'#012150'}
          {...{width, duration, progress, rounded}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    transform: [{scale: 1}],
  },
  absolute: {
    position: 'absolute',
  },
});

export default App;
