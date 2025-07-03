import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PanResponder,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStory } from '../context/StoryContext';
import StoryProgressBar from '../components/StoryProgressBar';
import StoryMedia from '../components/StoryMedia';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
type NavigationProp = StackNavigationProp<any>;

const StoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { state, dispatch } = useStory();
  const [isPaused, setIsPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState<number[]>([]);

  const currentUser = state.users[state.currentStoryIndex];
  const currentStory = currentUser?.stories[0];
  const currentMedia = currentStory?.media[state.currentMediaIndex];

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET_CURRENT' });
    navigation.goBack();
  }, [dispatch, navigation]);

  const handleNextMedia = useCallback(() => {
    if (!currentStory) return;

    if (state.currentMediaIndex < currentStory.media.length - 1) {
      dispatch({ type: 'NEXT_MEDIA' });
      // Reset video progress for new media
      setVideoProgress(prev => {
        const newProgress = [...prev];
        newProgress[state.currentMediaIndex + 1] = 0;
        return newProgress;
      });
    } else {
      // Move to next user's story
      if (state.currentStoryIndex < state.users.length - 1) {
        dispatch({
          type: 'SET_CURRENT_STORY',
          userIndex: state.currentStoryIndex + 1,
          mediaIndex: 0,
        });
        setVideoProgress([]);
      } else {
        handleClose();
      }
    }
  }, [currentStory, state.currentMediaIndex, state.currentStoryIndex, state.users.length, dispatch, handleClose]);

  const handlePreviousMedia = useCallback(() => {
    if (state.currentMediaIndex > 0) {
      dispatch({ type: 'PREVIOUS_MEDIA' });
      // Reset video progress for previous media
      setVideoProgress(prev => {
        const newProgress = [...prev];
        newProgress[state.currentMediaIndex - 1] = 0;
        return newProgress;
      });
    } else if (state.currentStoryIndex > 0) {
      const previousUser = state.users[state.currentStoryIndex - 1];
      dispatch({
        type: 'SET_CURRENT_STORY',
        userIndex: state.currentStoryIndex - 1,
        mediaIndex: previousUser.stories[0].media.length - 1,
      });
      setVideoProgress([]);
    }
  }, [state.currentMediaIndex, state.currentStoryIndex, state.users, dispatch]);

  const handleVideoProgress = useCallback((progress: number) => {
    setVideoProgress(prev => {
      const newProgress = [...prev];
      newProgress[state.currentMediaIndex] = progress;
      return newProgress;
    });
  }, [state.currentMediaIndex]);

  const handleVideoEnd = useCallback(() => {
    handleNextMedia();
  }, [handleNextMedia]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 50;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 50) {
        setIsPaused(true);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        handleClose();
      } else {
        setIsPaused(false);
      }
    },
  });

  useEffect(() => {
    if (currentStory && !currentStory.viewed) {
      dispatch({
        type: 'MARK_STORY_VIEWED',
        userId: currentStory.userId,
        storyId: currentStory.id,
      });
    }
  }, [currentStory, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPaused(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [state.currentMediaIndex]);

  // Initialize video progress array when story changes
  useEffect(() => {
    if (currentStory) {
      setVideoProgress(new Array(currentStory.media.length).fill(0));
    }
  }, [currentStory]);

  if (!currentUser || !currentStory || !currentMedia) {
    return null;
  }

  const handleTap = (event: any) => {
    const { locationX } = event.nativeEvent;
    if (locationX < width / 2) {
      handlePreviousMedia();
    } else {
      handleNextMedia();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      <TouchableWithoutFeedback onPress={handleTap} onLongPress={togglePause}>
        <View style={styles.storyContainer}>
          <StoryMedia
            media={currentMedia}
            isActive={true}
            isPaused={isPaused}
            onVideoEnd={handleVideoEnd}
            onVideoProgress={handleVideoProgress}
          />
          
          <SafeAreaView style={styles.overlay}>
            <View style={styles.progressContainer}>
              {currentStory.media.map((media, index) => (
                <StoryProgressBar
                  key={index}
                  duration={media.duration}
                  isActive={index === state.currentMediaIndex}
                  isPaused={isPaused}
                  progress={media.type === 'video' ? videoProgress[index] : undefined}
                  onComplete={handleNextMedia}
                />
              ))}
            </View>

            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: currentStory.userImage }}
                  style={styles.userImage}
                />
                <Text style={styles.username}>{currentStory.username}</Text>
                <Text style={styles.timestamp}>
                  {Math.floor((Date.now() - currentStory.timestamp) / 3600000)}h
                </Text>
              </View>
              
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Invisible tap areas for navigation */}
          <View style={styles.tapAreas}>
            <TouchableOpacity 
              style={styles.leftTap} 
              onPress={handlePreviousMedia}
              activeOpacity={1}
            />
            <TouchableOpacity 
              style={styles.rightTap} 
              onPress={handleNextMedia}
              activeOpacity={1}
            />
          </View>

          {/* Pause indicator */}
          {isPaused && (
            <View style={styles.pauseIndicator}>
              <Icon name="pause" size={60} color="white" />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  storyContainer: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  tapAreas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 0,
  },
  leftTap: {
    flex: 1,
  },
  rightTap: {
    flex: 1,
  },
  pauseIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});

export default StoryScreen;