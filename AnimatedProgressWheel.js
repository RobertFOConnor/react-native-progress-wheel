import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet, Easing} from 'react-native';
import PropTypes from 'prop-types';

class AnimatedProgressWheel extends PureComponent {

    state = {
        animatedVal: new Animated.Value(0),
    };

    componentDidMount() {
        const {animateFromValue, progress} = this.props;
        const {animatedVal} = this.state;

        if (animateFromValue >= 0) {
            animatedVal.setValue(animateFromValue);
            this.animateTo(progress);
        } else {
            animatedVal.setValue(progress);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.progress !== this.props.progress) {
            this.state.animatedVal.setValue(this.props.progress);
        }
    }

    interpolateAnimVal = (inputRange, outputRange) =>
        this.state.animatedVal.interpolate({
            inputRange,
            outputRange,
            extrapolate: "clamp",
        });

    interpolateRotation = (isSecondHalf) =>
        this.interpolateAnimVal(isSecondHalf ? [50, 100] : [0, 50], ['0deg', '180deg']);

    interpolateRotationTwoOpacity = () =>
        this.interpolateAnimVal([50, 50.01], [0, 1]);

    animateTo = (toValue, duration = this.props.duration, easing = Easing.easeInOut) =>
        Animated.timing(this.state.animatedVal, {
            toValue,
            duration,
            easing,
            useNativeDriver: true,
        }).start();

    circleHalf = (styles, isSecondHalf) =>
        <Animated.View style={[
            styles.container,
            {
                opacity: isSecondHalf ? this.interpolateRotationTwoOpacity() : 1,
                transform: [{rotate: this.interpolateRotation(isSecondHalf)}]
            }]}>
            <View style={[styles.halfCircle, isSecondHalf && {
                bottom: 0,
                transform: [{rotate: '180deg'}]
            }]}>
                <View style={styles.circleArc}/>
            </View>
        </Animated.View>;

    render() {
        const styles = generateStyles(this.props);

        return (
            <View style={styles.container}>
                <View style={styles.background}/>
                {this.circleHalf(styles)}
                <View style={styles.halfCircle}>
                    <View style={styles.cutOff}/>
                </View>
                <View style={styles.secondHalfContainer}>
                    {this.circleHalf(styles, true)}
                </View>
            </View>
        );
    }
}

AnimatedProgressWheel.defaultProps = {
    color: 'white',
    backgroundColor: 'gray',
    size: 200,
    width: 25,
    progress: 0,
    duration: 600,
    animateFromValue: -1,
};

AnimatedProgressWheel.propTypes = {
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    size: PropTypes.number,
    width: PropTypes.number,
    progress: PropTypes.number,
    duration: PropTypes.number,
    animateFromValue: PropTypes.number,
};

const generateStyles = ({size, width, color, backgroundColor}) =>
    StyleSheet.create({
        container: {
            width: size,
            height: size,
        },
        background: {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: width,
            borderColor: backgroundColor,
            position: 'absolute'
        },
        cutOff: {
            width: size,
            height: size,
            borderWidth: width,
            borderColor: backgroundColor,
            borderRadius: size / 2,
        },
        secondHalfContainer: {
            position: 'absolute'
        },
        halfCircle: {
            width: size,
            height: size / 2,
            overflow: 'hidden',
            position: 'absolute'
        },
        circleArc: {
            width: size,
            height: size,
            borderColor: color,
            borderRadius: size / 2,
            borderWidth: width,
        },
    });

export default AnimatedProgressWheel;