import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens(); 
import React, { useState, createContext, useContext, useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Alert, useColorScheme } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { darkTheme, lightTheme } from './src/themes';
import CustomDrawerContent from './src/components/CustomDrawerContent';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FooterMenu from './src/components/FooterMenu';
import { requestMediaPermission } from './src/utils/permissions';
import { StoryProvider } from './src/context/StoryContext';
import StoryScreen from './src/screens/StoryScreen';

// Auth Context Setup
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => { },
  logout: () => { },
});

interface User {
  name: string;
  email: string;
}

const Drawer = createDrawerNavigator();

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({ name: 'Shashank', email: 'shashank@example.com' });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkPermission = async () => {
      const granted = await requestMediaPermission();
      if (!granted) {
        Alert.alert('Permission Denied', 'Cannot access media without permission');
      }
    };

    checkPermission();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StoryProvider>
            <NavigationContainer>
              <Drawer.Navigator

                drawerContent={(props) => (
                  <CustomDrawerContent
                    {...props}
                    isLoggedIn={isLoggedIn}
                    user={user}
                  />

                )}
              >
                
                <Drawer.Screen
                  name="MainTabs"
                  component={FooterMenu}
                  options={{
                    title: 'Home', 
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                      <Icon name="home-outline" size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Profile"
                  component={ProfileScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: '#FF9933',
                    },
                    drawerIcon: ({ color, size }) => (
                      <Icon name="account" size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen
                  name="Settings"
                  component={SettingsScreen}
                  options={{
                    headerStyle: {
                      backgroundColor: '#FF9933',
                    },
                    drawerIcon: ({ color, size }) => (
                      <Icon name="cog-outline" size={size} color={color} />
                    ),
                  }}
                />
                <Drawer.Screen
  name="Story"
  component={StoryScreen}
  options={{
    headerShown: false,
    drawerLabel: () => null,
    title: '',
    drawerIcon: () => null,
    swipeEnabled: false, // Disable drawer swipe on story screen
  }}
/>
              </Drawer.Navigator>
            </NavigationContainer>
            </StoryProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </AuthContext.Provider>
    </GestureHandlerRootView>
  );
}


