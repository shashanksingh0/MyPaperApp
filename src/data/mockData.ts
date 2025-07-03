import { User } from '../types/Story';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    stories: [
      {
        id: 's1',
        userId: '1',
        username: 'john_doe',
        userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        media: [
          {
            id: 'm1',
            type: 'video',
            url: 'https://anjgreybox.in/1.mp4',
            duration: 15000,
          },
          {
            id: 'm2',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=700&fit=crop',
            duration: 5000,
          },
        ],
        timestamp: Date.now() - 3600000,
        viewed: false,
      },
    ],
  },
  {
    id: '2',
    username: 'jane_smith',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    stories: [
      {
        id: 's2',
        userId: '2',
        username: 'jane_smith',
        userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        media: [
          {
            id: 'm3',
            type: 'video',
            url: 'https://anjgreybox.in/1.mp4',
            duration: 20000,
          },
        ],
        timestamp: Date.now() - 7200000,
        viewed: false,
      },
    ],
  },
  {
    id: '3',
    username: 'mike_wilson',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    hasStory: true,
    stories: [
      {
        id: 's3',
        userId: '3',
        username: 'mike_wilson',
        userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        media: [
          {
            id: 'm4',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=700&fit=crop',
            duration: 5000,
          },
          {
            id: 'm5',
            type: 'video',
            url: 'https://anjgreybox.in/1.mp4',
            duration: 12000,
          },
          {
            id: 'm6',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop',
            duration: 5000,
          },
        ],
        timestamp: Date.now() - 10800000,
        viewed: true,
      },
    ],
  },
];