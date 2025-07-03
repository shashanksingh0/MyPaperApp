import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
//import Video from 'react-native-video';
import Video, { OnProgressData } from 'react-native-video';
//import type { VideoProperties } from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { StoryMedia as StoryMediaType } from '../types/Story';

interface StoryMediaProps {
    media: StoryMediaType;
    isActive: boolean;
    isPaused: boolean;
    onLoad?: () => void;
    onVideoEnd?: () => void;
    
    onVideoProgress?: (progress: number) => void;
}

const { width, height } = Dimensions.get('window');

const StoryMedia: React.FC<StoryMediaProps> = ({
    media,
    isActive,
    isPaused,
    onLoad,
    onVideoEnd,
    onVideoProgress,
}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [videoMuted, setVideoMuted] = useState(true);
    const videoRef = useRef<React.ComponentRef<typeof Video>>(null);


    useEffect(() => {
        if (media.type === 'video' && videoRef.current) {
            if (isActive && !isPaused) {
                videoRef.current.seek(0);
                setShowPlayButton(false);
            } else if (isPaused) {
                setShowPlayButton(true);
            }
        }
    }, [isActive, isPaused, media.type]);

    const handleVideoLoad = () => {
        setLoading(false);
        onLoad?.();
    };

    const handleVideoProgress = (data: any) => {
        const progress = (data.currentTime / data.seekableDuration) * 100;
        onVideoProgress?.(progress);
    };

    const handleVideoEnd = () => {
        onVideoEnd?.();
    };

    const toggleMute = () => {
        setVideoMuted(!videoMuted);
    };

    const togglePlayPause = () => {
        setShowPlayButton(!showPlayButton);
    };

    if (media.type === 'image') {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: media.url }}
                    style={styles.media}
                    onLoad={() => {
                        setLoading(false);
                        onLoad?.();
                    }}
                    onError={() => {
                        setLoading(false);
                        setError(true);
                    }}
                    resizeMode="cover"
                />
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                )}
                {error && (
                    <View style={styles.errorContainer}>
                        <Icon name="alert-circle-outline" size={50} color="white" />
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Video
                ref={videoRef}
                source={{ uri: media.url }}
                style={styles.media}
                resizeMode="cover"
                repeat={false}
                paused={!isActive || isPaused || showPlayButton}
               
                onLoad={handleVideoLoad}
                onProgress={handleVideoProgress}
                onEnd={handleVideoEnd}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
                onLoadStart={() => setLoading(true)}
            />

            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}

            {error && (
                <View style={styles.errorContainer}>
                    <Icon name="alert-circle-outline" size={50} color="white" />
                </View>
            )}

            {/* Video Controls Overlay */}
            {media.type === 'video' && !loading && !error && (
                <View style={styles.videoControls}>
                    {/* Play/Pause Button */}
                    {showPlayButton && (
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={togglePlayPause}
                        >
                            <Icon name="play" size={60} color="white" />
                        </TouchableOpacity>
                    )}

                    {/* Mute/Unmute Button */}
                    <TouchableOpacity
                        style={styles.muteButton}
                        onPress={toggleMute}
                    >
                        <Icon
                            name={videoMuted ? "volume-mute" : "volume-high"}
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    media: {
        width,
        height,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    errorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    videoControls: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    muteButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
});

export default StoryMedia;