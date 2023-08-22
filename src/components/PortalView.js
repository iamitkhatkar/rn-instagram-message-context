import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Portal} from 'react-native-portalize';
import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import {BlurView} from '@react-native-community/blur';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const PortalView = ({
  selectedMessage,
  messageCordinates,
  setSelectedMessage,
  isSender,
}) => {
  const [blurAmount, setBlurAmount] = useState(0);
  const scale = useSharedValue(0);
  const {height} = useWindowDimensions();

  useEffect(() => {
    if (selectedMessage) {
      scale.value = withSpring(1);
      const interval = setInterval(() => {
        setBlurAmount(prev => {
          if (prev < 60) {
            return prev + 10;
          }
          clearInterval(interval);
          return prev;
        });
      }, 30);
    } else {
      scale.value = 0;
      setBlurAmount(0);
    }
  }, [selectedMessage]);

  const animatedStyle = useAnimatedStyle(() => {
    let y = messageCordinates.y || 0;
    let shouldAnimate = false;
    const isLessDisatanceFromTop = y < 100;
    const isLessDisatanceFromBottom =
      height - y < selectedMessage?.layoutHeight;
    console.log(y);
    if (isLessDisatanceFromBottom) {
      y = y - selectedMessage?.layoutHeight;
      shouldAnimate = true;
    }

    if (isLessDisatanceFromTop) {
      y = y + selectedMessage?.layoutHeight;
      shouldAnimate = true;
    }
    y = isNaN(y) ? 0 : y;
    return {
      transform: [
        {
          translateX: withTiming(selectedMessage ? 0 : isSender ? 0 : 30, {
            duration: 200,
          }),
        },
      ],
      top: shouldAnimate ? withTiming(y, {duration: 200}) : y,
      right: isSender ? 0 : undefined,
    };
  });

  const reactionStyle = useAnimatedStyle(() => {
    let y = messageCordinates.y || 0;
    let shouldAnimate = false;
    const isLessDisatanceFromTop = y < 100;
    const isLessDisatanceFromBottom =
      height - y < selectedMessage?.layoutHeight;
    console.log(y);
    if (isLessDisatanceFromBottom) {
      y = y - selectedMessage?.layoutHeight;
      shouldAnimate = true;
    }

    if (isLessDisatanceFromTop) {
      y = y + selectedMessage?.layoutHeight;
      shouldAnimate = true;
    }
    y = isNaN(y) ? 0 : y;
    return {
      transform: [
        {
          translateY: shouldAnimate
            ? withTiming(y - 70, {duration: 200})
            : y - 70,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      fontSize: 35,
      transform: [
        {
          scale: scale.value,
        },
        {
          translateY: interpolate(scale.value, [0, 1], [50, 0]),
        },
      ],
    };
  });

  if (!selectedMessage) {
    return null;
  }

  return (
    <Portal>
      <BlurView style={styles.container} blurAmount={blurAmount}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedMessage(null)}
          style={styles.container}>
          <Animated.View style={[styles.reaction, reactionStyle]}>
            <Animated.Text style={textStyle}>❤️</Animated.Text>
            <Animated.Text style={textStyle}>👍</Animated.Text>
            <Animated.Text style={textStyle}>😀</Animated.Text>
            <Animated.Text style={textStyle}>😂</Animated.Text>
            <Animated.Text style={textStyle}>😍</Animated.Text>
            <Animated.Text style={textStyle}>😡</Animated.Text>
            <Animated.Text style={textStyle}>➕</Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.messageStyle, animatedStyle]}>
            {selectedMessage?.type === 'text' ? (
              <TextMessage {...selectedMessage} />
            ) : (
              <ImageMessage {...selectedMessage} />
            )}
          </Animated.View>
        </TouchableOpacity>
      </BlurView>
    </Portal>
  );
};

export default PortalView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageStyle: {
    position: 'absolute',
  },
  reaction: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
});
