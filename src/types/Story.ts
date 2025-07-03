export interface Story {
  id: string;
  userId: string;
  username: string;
  userImage: string;
  media: StoryMedia[];
  timestamp: number;
  viewed: boolean;
}

export interface StoryMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number;
}

export interface User {
  id: string;
  username: string;
  profileImage: string;
  hasStory: boolean;
  stories: Story[];
}