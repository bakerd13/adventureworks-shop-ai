import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const DOTS = 3;
const DURATION = 300;
const DEFAULT_COLOR = 'grey';
const ACTIVE_COLOR = 'blue';
const seqDots = [...Array<number>(DOTS).keys()];

type DotProps = {
  active: boolean,
  size: number,
  primaryColor?: string,
  secondaryColor?: string,
  duration?: number
}

type LoaderProps = {
  active: number,
  primaryColor?: string,
  secondaryColor?: string,
  hasBg?: boolean,
  speed?: number,
  size?: number,
}

type ChatIndicatorProps = {
  primaryColor?: string,
  secondaryColor?: string,
  size?: number,
  speed?: number,
  hasBg?: boolean,
  bgColor?: string,
}

const ChatIndicator = ({primaryColor=DEFAULT_COLOR, secondaryColor=ACTIVE_COLOR, speed=DURATION, size}: ChatIndicatorProps) => {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(active > seqDots.length - 1 ? 0 : active + 1);
    }, speed);
    return () => clearInterval(interval);
  })

   return <ThreeDotsLoader {...{active, primaryColor, secondaryColor, size}} />
}

const ThreeDotsLoader = ({active, speed, primaryColor, secondaryColor, size=5}: LoaderProps) => {
  return (
    <View style={styles.container}>
      {
        seqDots.map((i, idx) =>
          <Dot
            key={idx}
            active={i === active}
            duration={speed}
            {...{primaryColor, secondaryColor, size}}
          />
        )
      }
    </View>
  )
}

const Dot = ({active, primaryColor, secondaryColor, duration, size}: DotProps) => {
  const animationValue = useRef(new Animated.Value(1)).current;

  const scaleDot = () => {
    Animated.sequence([
      Animated.timing( animationValue, {
        duration,
        toValue: 2,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }

  useEffect(() => {if(active) scaleDot()});

  return (
      <Animated.View
        style={{
          transform: [{ scale: animationValue }],
          width: size,
          height: size,
          borderRadius: size / 2,
          marginHorizontal: size * 1.5,
          backgroundColor: active ? secondaryColor : primaryColor,
        }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 2,
  },
});

export default ChatIndicator;
