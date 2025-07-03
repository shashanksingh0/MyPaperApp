// src/components/LikeCommentShare.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Share } from 'react-native';
import { Text, useTheme, IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  initialLikes?: number;
  onCommentPress?: () => void;
  onSharePress?: () => void;
}

const LikeCommentShare: React.FC<Props> = ({
  initialLikes = 0,
  onCommentPress,
  onSharePress,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const theme = useTheme();

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (onSharePress) {
      onSharePress();
    } else {
      Share.share({
        message: 'Check out this post!',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <IconButton
          icon={liked ? 'heart' : 'heart-outline'}
          iconColor={liked ? '#FF3B30' : theme.colors.onSurface}
          size={24}
          onPress={toggleLike}
        />
        <Text style={styles.countText}>{likes}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <IconButton
          icon="comment-outline"
          iconColor={theme.colors.onSurface}
          size={24}
          onPress={onCommentPress}
        />
      </View>

      <View style={styles.buttonGroup}>
        <IconButton
          icon="share-outline"
          iconColor={theme.colors.onSurface}
          size={24}
          onPress={handleShare}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginLeft: -8,
    fontSize: 14,
    color: '#555',
  },
});

export default LikeCommentShare;
// This component can be used in any screen where you want to display like, comment, and share options.