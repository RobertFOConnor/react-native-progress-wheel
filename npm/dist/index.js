"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var AnimatedProgressWheel = function (_a) {
    var _b = _a.animateFromValue, animateFromValue = _b === void 0 ? -1 : _b, _c = _a.progress, progress = _c === void 0 ? 75 : _c, _d = _a.duration, duration = _d === void 0 ? 600 : _d, onAnimationComplete = _a.onAnimationComplete, size = _a.size, width = _a.width, _e = _a.color, color = _e === void 0 ? 'white' : _e, _f = _a.rotation, rotation = _f === void 0 ? '0deg' : _f, _g = _a.subtitle, subtitle = _g === void 0 ? '' : _g, _h = _a.delay, delay = _h === void 0 ? 0 : _h, _j = _a.max, max = _j === void 0 ? 100 : _j, _k = _a.rounded, rounded = _k === void 0 ? false : _k, _l = _a.showProgressLabel, showProgressLabel = _l === void 0 ? false : _l, _m = _a.showPercentageSymbol, showPercentageSymbol = _m === void 0 ? false : _m, _o = _a.backgroundColor, backgroundColor = _o === void 0 ? 'grey' : _o, _p = _a.labelStyle, labelStyle = _p === void 0 ? {} : _p, _q = _a.subtitleStyle, subtitleStyle = _q === void 0 ? {} : _q, easing = _a.easing, containerColor = _a.containerColor;
    var _r = (0, react_1.useState)(0), labelValue = _r[0], setLabelValue = _r[1];
    var animatedVal = (0, react_1.useMemo)(function () { return new react_native_1.Animated.Value(0); }, []);
    (0, react_1.useEffect)(function () {
        if (showProgressLabel) {
            animatedVal.addListener(function (_a) {
                var value = _a.value;
                return setLabelValue(Math.floor((value / 100) * max));
            });
        }
        return function () {
            animatedVal.removeAllListeners();
        };
    }, [animatedVal, showProgressLabel, max]);
    var styles = (0, react_1.useMemo)(function () {
        return generateStyles({
            size: size,
            width: width,
            color: color,
            backgroundColor: backgroundColor,
            containerColor: containerColor,
        });
    }, [size, width, color, backgroundColor, containerColor]);
    (0, react_1.useEffect)(function () {
        if (animateFromValue >= 0) {
            animatedVal.setValue(animateFromValue);
        }
        animateTo((progress / max) * 100);
    }, [animateFromValue, progress, max]);
    var interpolateAnimVal = function (inputRange, outputRange) {
        return animatedVal.interpolate({
            inputRange: inputRange,
            outputRange: outputRange,
            extrapolate: 'clamp',
        });
    };
    var interpolateRotation = function (isSecondHalf) {
        return interpolateAnimVal(isSecondHalf ? [50, 100] : [0, 50], ['0deg', '180deg']);
    };
    var interpolateRotationTwoOpacity = function () {
        return interpolateAnimVal([50, 50.01], [0, 1]);
    };
    var interpolateStartRoundCapOpacity = function () {
        return interpolateAnimVal([0, 0.01], [0, 1]);
    };
    var interpolateRoundCapRotation = function () {
        return interpolateAnimVal([0, 100], ['0deg', '360deg']);
    };
    var animateTo = function (toValue) {
        react_native_1.Animated.timing(animatedVal, {
            toValue: toValue,
            duration: duration,
            easing: easing,
            delay: delay,
            useNativeDriver: true,
        }).start(function (status) { return onAnimationComplete && onAnimationComplete(status); });
    };
    var circleHalf = function (isSecondHalf) {
        var containerStyle = [
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
        var arcStyle = [
            styles.halfCircle,
            isSecondHalf && { bottom: 0, transform: [{ rotate: '180deg' }] },
        ];
        return (<react_native_1.Animated.View style={containerStyle}>
        <react_native_1.View style={arcStyle}>
          <react_native_1.View style={[styles.circleArc, { borderColor: color }]}/>
        </react_native_1.View>
      </react_native_1.Animated.View>);
    };
    var renderLoader = function () { return (<react_1.Fragment>
      <react_native_1.View style={styles.background}/>
      {circleHalf(false)}
      <react_native_1.View style={styles.halfCircle}>
        <react_native_1.View style={styles.cutOff}/>
      </react_native_1.View>
      <react_native_1.View style={styles.secondHalfContainer}>{circleHalf(true)}</react_native_1.View>

      {rounded && (<>
          <react_native_1.Animated.View style={[
                styles.roundCap,
                { opacity: interpolateStartRoundCapOpacity() },
            ]}/>
          <react_native_1.Animated.View style={[
                styles.roundCapOverlay,
                { transform: [{ rotate: interpolateRoundCapRotation() }] },
            ]}>
            <react_native_1.Animated.View style={[
                styles.roundCapEnd,
                { opacity: interpolateStartRoundCapOpacity() },
            ]}/>
          </react_native_1.Animated.View>
        </>)}
    </react_1.Fragment>); };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={{ transform: [{ rotate: rotation }] }}>{renderLoader()}</react_native_1.View>
      {showProgressLabel && (<react_native_1.View style={styles.labelContainer}>
          {labelValue !== null && (<react_native_1.Text style={[styles.label, labelStyle]}>
              {labelValue}
              {showPercentageSymbol ? '%' : ''}
            </react_native_1.Text>)}
          {!!subtitle && (<react_native_1.Text style={[styles.label, subtitleStyle]}>{subtitle}</react_native_1.Text>)}
        </react_native_1.View>)}
    </react_native_1.View>);
};
var generateStyles = function (_a) {
    var size = _a.size, width = _a.width, color = _a.color, backgroundColor = _a.backgroundColor, containerColor = _a.containerColor;
    return react_native_1.StyleSheet.create({
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
        labelContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        label: {
            fontSize: 20,
        },
    });
};
exports.default = AnimatedProgressWheel;
