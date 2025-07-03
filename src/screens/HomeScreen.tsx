import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, useColorScheme, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, Card, Appbar, useTheme } from 'react-native-paper';
import ImmersiveMode from 'react-native-immersive';


import { darkTheme, lightTheme } from '../themes';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import LikeCommentShare from '../components/LikeCommentShare';
import InfographicSlider from '../components/InfographicSlider';
import StoryPreview from '../components/StoryPreview';
import { useStory } from '../context/StoryContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types/types'; 


const HomeScreen = () => {
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const { state, dispatch } = useStory();




const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  //const navigation = useNavigation();
  const handleStoryPress = (userIndex: number) => {
    dispatch({ type: 'SET_CURRENT_STORY', userIndex, mediaIndex: 0 });
    navigation.navigate('Story');
  };
  //const theme = useTheme();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [immersive, setImmersive] = useState(false);
  useEffect(() => {
    if (immersive) {
      ImmersiveMode.fullLayout(true);
      ImmersiveMode.setImmersive(true);
    } else {
      ImmersiveMode.setImmersive(false);
    }
  }, [immersive]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action icon="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonRow}
        >
          <Button mode="contained" style={[styles.topButton, { backgroundColor: theme.colors.primary }]}>
            UP TV
          </Button>
          <Button mode="contained" style={[styles.topButton, { backgroundColor: theme.colors.primary }]}>
            UP VIKAS YATRA
          </Button>
          <Button mode="contained" style={[styles.topButton, { backgroundColor: theme.colors.primary }]}>
            PHOTO GALLERY
          </Button>
        </ScrollView>
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>STORIES</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10 }}>
            {state.users.map((user, index) => (
              <View key={user.id} style={styles.storyItemWrapper}>
                <StoryPreview
                  user={user}
                  onPress={() => handleStoryPress(index)}
                />
              </View>
            ))}

          </ScrollView>
        </View>

        <InfographicSlider />
      </ScrollView>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    backgroundColor: '#FF9933',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 0
  },
  appbarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F57C00',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingTop: 0
  },
  topButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  // topButton: {
  //     marginHorizontal: 6,
  //     height: 40,
  //     justifyContent: 'center',
  // },
  topButton: {
    borderRadius: 12,
    marginHorizontal: 6,
  },
  section: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  infographicCard: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  // section: {
  //   paddingVertical: 10,
  //   paddingHorizontal: 16,
  // },
  // sectionTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  storyItemWrapper: {
    marginRight: 12,
  },
});

export default HomeScreen;