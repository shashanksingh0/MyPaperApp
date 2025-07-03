declare module 'react-native-video-controls' {
  import * as React from 'react';
  import { StyleProp, ViewStyle } from 'react-native';
  import { VideoProperties } from 'react-native-video';

  export interface VideoPlayerProps extends VideoProperties {
    source: { uri: string } | number; // Add this explicitly!
    controlTimeout?: number;
    tapAnywhereToPause?: boolean;
    seekColor?: string;
    disableVolume?: boolean;
    disableBack?: boolean;
    disableFullscreen?: boolean;
    showOnStart?: boolean;
    onBack?: () => void;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    style?: StyleProp<ViewStyle>;
  }

  export default class VideoPlayer extends React.Component<VideoPlayerProps> {}
}
