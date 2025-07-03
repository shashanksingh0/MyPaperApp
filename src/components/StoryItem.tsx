import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Dimensions, TouchableOpacity, Animated, Text } from 'react-native';
import Video from 'react-native-video';
import { Story } from '../context/StoryContext';

const { width, height } = Dimensions.get('window');

interface StoryItemProps {
  story: Story;
  onNext: () => void;
  isPreview?: boolean;
}

const StoryItem: React.FC<StoryItemProps> = ({ story, onNext }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: story.duration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) onNext();
    });
  }, [story]);

  return (
    <TouchableOpacity onPress={() => setPaused(prev => !prev)} style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ height: 4, width: '100%', backgroundColor: '#333' }}>
          <Animated.View
            style={{
              height: 4,
              backgroundColor: '#fff',
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            }}
          />
        </View>

        {story.type === 'image' ? (
          <Image source={{ uri: story.media }} style={{ width, height }} resizeMode="cover" />
        ) : (
          <Video
            source={{ uri: story.media }}
            paused={paused}
            style={{ width, height }}
            resizeMode="cover"
            onEnd={onNext}
          />
        )}

        <Text style={{ position: 'absolute', top: 50, left: 20, color: '#fff' }}>{story.user}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryItem;
