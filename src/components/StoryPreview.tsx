import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { User } from '../types/Story';

interface StoryPreviewProps {
  user: User;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const STORY_SIZE = width * 0.18;

const StoryPreview: React.FC<StoryPreviewProps> = memo(({ user, onPress }) => {
  const hasUnviewedStories = user.stories.some(story => !story.viewed);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {hasUnviewedStories ? (
          <LinearGradient
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: user.profileImage }} style={styles.image} />
            </View>
          </LinearGradient>
        ) : (
          <View style={styles.viewedContainer}>
            <Image source={{ uri: user.profileImage }} style={styles.image} />
          </View>
        )}
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {user.username}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: STORY_SIZE + 16,
  },
  imageContainer: {
    marginBottom: 4,
  },
  gradient: {
    width: STORY_SIZE + 4,
    height: STORY_SIZE + 4,
    borderRadius: (STORY_SIZE + 4) / 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewedContainer: {
    width: STORY_SIZE + 4,
    height: STORY_SIZE + 4,
    borderRadius: (STORY_SIZE + 4) / 2,
    padding: 2,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    width: STORY_SIZE,
    height: STORY_SIZE,
    borderRadius: STORY_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: STORY_SIZE - 4,
    height: STORY_SIZE - 4,
    borderRadius: (STORY_SIZE - 4) / 2,
  },
  username: {
    fontSize: 12,
    color: '#262626',
    textAlign: 'center',
    maxWidth: STORY_SIZE + 16,
  },
});

export default StoryPreview;
