declare module 'react-native-media-player' {
  import { ViewStyle } from 'react-native';
  import { Component } from 'react';

  interface MediaPlayerProps {
    source: { uri: string };
    autoPlay?: boolean;
    loop?: boolean;
    controls?: boolean;
    style?: ViewStyle;
  }

  export default class MediaPlayer extends Component<MediaPlayerProps> {}
}
