import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface StoryProgressBarProps {
  duration: number;
  isActive: boolean;
  isPaused: boolean;
  onComplete: () => void;
  progress?: number; 
}

const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
  duration,
  isActive,
  isPaused,
  onComplete,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive && !isPaused) {
      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    } else if (isPaused) {
      progressAnim.stopAnimation();
    }

    return () => {
      progressAnim.stopAnimation();
    };
  }, [isActive, isPaused, duration, progressAnim, onComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <Animated.View
        style={[
          styles.progress,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  progress: {
    height: '100%',
    backgroundColor: 'white',
  },
});

export default StoryProgressBar;