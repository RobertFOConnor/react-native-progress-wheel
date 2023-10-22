import React from 'react';
import { EasingFunction, TextStyle, ViewStyle } from 'react-native';
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
    showProgressLabel?: boolean;
    showPercentageSymbol?: boolean;
    delay?: number;
    max?: number;
    subtitle?: string;
    rotation?: string;
    labelStyle?: ViewStyle | TextStyle;
    subtitleStyle?: ViewStyle | TextStyle;
    easing?: EasingFunction;
    onAnimationComplete?: (status: any) => void;
}
declare const AnimatedProgressWheel: ({ animateFromValue, progress, duration, onAnimationComplete, size, width, color, rotation, subtitle, delay, max, rounded, showProgressLabel, showPercentageSymbol, backgroundColor, labelStyle, subtitleStyle, easing, containerColor, }: Props) => React.JSX.Element;
export default AnimatedProgressWheel;
