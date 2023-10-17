import React from 'react';
import { EasingFunction } from 'react-native';
interface Props {
    color: string;
    backgroundColor: string;
    size: number;
    width: number;
    progress?: number;
    duration?: number;
    rounded?: boolean;
    animateFromValue?: number;
    containerColor?: string;
    delay?: number;
    easing?: EasingFunction;
    onAnimationComplete?: (status: any) => void;
}
declare const AnimatedProgressWheel: ({ animateFromValue, progress, duration, onAnimationComplete, size, width, color, delay, rounded, backgroundColor, easing, containerColor, }: Props) => React.JSX.Element;
export default AnimatedProgressWheel;
