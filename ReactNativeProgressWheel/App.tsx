import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedProgressWheel from './AnimatedProgressWheel';

function App(): JSX.Element {
  const size = 240;
  const progress = 36;
  const duration = 2500;
  const width = 10;
  const rounded = true;
  const color = '#49ccf9';
  const backgroundColor = '#000079';

  return (
    <View style={styles.container}>
      <AnimatedProgressWheel
        max={40}
        showProgressLabel={true}
        showPercentageSymbol={false}
        rotation={'-90deg'}
        labelStyle={styles.progressLabel}
        subtitle={'Questions out of 40'}
        subtitleStyle={styles.subtitle}
        {...{color, backgroundColor, size, width, duration, progress, rounded}}
      />
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
  progressLabel: {
    color: '#49ccf9',
    fontWeight: 'bold',
    fontSize: 56,
  },
  subtitle: {
    fontSize: 14,
    color: '#49ccf9',
  },
});

export default App;
