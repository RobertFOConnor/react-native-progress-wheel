import React, {Fragment, useEffect, useMemo} from 'react';
import {Animated, EasingFunction, StyleSheet, View} from 'react-native';

interface Props {
  color: string;
  backgroundColor: string;
  size: number;
  width: number;
  progress?: number;
  duration?: number;
  animateFromValue?: number;
  containerColor?: string;
  rounded?: boolean;
  delay?: number;
  easing?: EasingFunction;
  onAnimationComplete?: (status: any) => void;
}

const AnimatedProgressWheel = ({
  animateFromValue = -1,
  progress = 75,
  duration = 600,
  onAnimationComplete,
  size,
  width,
  color = 'white',
  delay = 0,
  rounded = false,
  backgroundColor = 'grey',
  easing,
  containerColor,
}: Props) => {
  const animatedVal = useMemo(() => new Animated.Value(0), []);

  const styles = useMemo(
    () =>
      generateStyles({
        size,
        width,
        color,
        backgroundColor,
        containerColor,
      }),
    [size, width, color, backgroundColor, containerColor],
  );

  useEffect(() => {
    if (animateFromValue >= 0) {
      animatedVal.setValue(animateFromValue);
    }
    animateTo(progress);
  }, [animateFromValue, progress]);

  const interpolateAnimVal = (
    inputRange: number[],
    outputRange: number[] | string[],
  ) =>
    animatedVal.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  const interpolateRotation = (isSecondHalf: boolean) =>
    interpolateAnimVal(isSecondHalf ? [50, 100] : [0, 50], ['0deg', '180deg']);

  const interpolateRotationTwoOpacity = () =>
    interpolateAnimVal([50, 50.01], [0, 1]);

  const interpolateStartRoundCapOpacity = () =>
    interpolateAnimVal([0, 0.01], [0, 1]);

  const interpolateRoundCapRotation = () =>
    interpolateAnimVal([0, 100], ['0deg', '360deg']);

  const animateTo = (toValue: number) => {
    Animated.timing(animatedVal, {
      toValue,
      duration,
      easing,
      delay,
      useNativeDriver: true,
    }).start(status => onAnimationComplete && onAnimationComplete(status));
  };

  const circleHalf = (isSecondHalf: boolean) => {
    const containerStyle = [
      styles.container,
      {
        opacity: isSecondHalf ? interpolateRotationTwoOpacity() : 1,
        transform: [
          {
            rotate: interpolateRotation(isSecondHalf),
          },
        ],
      },
    ];

    const arcStyle = [
      styles.halfCircle,
      isSecondHalf && {bottom: 0, transform: [{rotate: '180deg'}]},
    ];

    return (
      <Animated.View style={containerStyle}>
        <View style={arcStyle}>
          <View style={[styles.circleArc, {borderColor: color}]} />
        </View>
      </Animated.View>
    );
  };

  const renderLoader = () => (
    <Fragment>
      <View style={styles.background} />
      {circleHalf(false)}
      <View style={styles.halfCircle}>
        <View style={styles.cutOff} />
      </View>
      <View style={styles.secondHalfContainer}>{circleHalf(true)}</View>

      {rounded && (
        <>
          <Animated.View
            style={[
              styles.roundCap,
              {opacity: interpolateStartRoundCapOpacity()},
            ]}
          />
          <Animated.View
            style={[
              styles.roundCapOverlay,
              {transform: [{rotate: interpolateRoundCapRotation()}]},
            ]}>
            <Animated.View
              style={[
                styles.roundCapEnd,
                {opacity: interpolateStartRoundCapOpacity()},
              ]}
            />
          </Animated.View>
        </>
      )}
    </Fragment>
  );

  return <View style={styles.container}>{renderLoader()}</View>;
};

const generateStyles = ({
  size,
  width,
  color,
  backgroundColor,
  containerColor,
}: Props) =>
  StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
    },
    background: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: width,
      borderColor: backgroundColor,
      position: 'absolute',
    },
    cutOff: {
      backgroundColor: containerColor,
      width: size,
      height: size,
      borderWidth: width,
      borderColor: backgroundColor,
      borderRadius: size / 2,
    },
    secondHalfContainer: {
      position: 'absolute',
    },
    halfCircle: {
      width: size,
      height: size / 2,
      overflow: 'hidden',
      position: 'absolute',
    },
    circleArc: {
      width: size,
      height: size,
      borderColor: color,
      borderRadius: size / 2,
      borderWidth: width,
    },
    roundCap: {
      position: 'absolute',
      width: width,
      height: width,
      right: 0,
      top: size / 2 - width / 2,
      backgroundColor: color,
      borderRadius: width / 2,
    },
    roundCapEnd: {
      position: 'absolute',
      width: width,
      height: width,
      right: 0,
      top: size / 2 - width / 2,
      backgroundColor: color,
      borderRadius: width / 2,
    },
    roundCapOverlay: {
      position: 'absolute',
      width: size,
      height: size,
    },
  });

export default AnimatedProgressWheel;
