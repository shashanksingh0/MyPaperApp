import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Story, User } from '../types/Story';
import { mockUsers } from '../data/mockData';

interface StoryState {
  users: User[];
  currentStoryIndex: number;
  currentMediaIndex: number;
  isPlaying: boolean;
}

type StoryAction =
  | { type: 'MARK_STORY_VIEWED'; userId: string; storyId: string }
  | { type: 'SET_CURRENT_STORY'; userIndex: number; mediaIndex: number }
  | { type: 'NEXT_MEDIA' }
  | { type: 'PREVIOUS_MEDIA' }
  | { type: 'SET_PLAYING'; playing: boolean }
  | { type: 'RESET_CURRENT' };

const initialState: StoryState = {
  users: mockUsers,
  currentStoryIndex: 0,
  currentMediaIndex: 0,
  isPlaying: true,
};

const StoryContext = createContext<{
  state: StoryState;
  dispatch: React.Dispatch<StoryAction>;
} | null>(null);

const storyReducer = (state: StoryState, action: StoryAction): StoryState => {
  switch (action.type) {
    case 'MARK_STORY_VIEWED':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userId
            ? {
                ...user,
                stories: user.stories.map(story =>
                  story.id === action.storyId
                    ? { ...story, viewed: true }
                    : story
                )
              }
            : user
        ),
      };
    case 'SET_CURRENT_STORY':
      return {
        ...state,
        currentStoryIndex: action.userIndex,
        currentMediaIndex: action.mediaIndex,
        isPlaying: true,
      };
    case 'NEXT_MEDIA':
      return {
        ...state,
        currentMediaIndex: state.currentMediaIndex + 1,
      };
    case 'PREVIOUS_MEDIA':
      return {
        ...state,
        currentMediaIndex: Math.max(0, state.currentMediaIndex - 1),
      };
    case 'SET_PLAYING':
      return {
        ...state,
        isPlaying: action.playing,
      };
    case 'RESET_CURRENT':
      return {
        ...state,
        currentStoryIndex: 0,
        currentMediaIndex: 0,
        isPlaying: true,
      };
    default:
      return state;
  }
};

export const StoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storyReducer, initialState);

  return (
    <StoryContext.Provider value={{ state, dispatch }}>
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};