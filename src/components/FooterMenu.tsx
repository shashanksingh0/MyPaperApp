// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { Text } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const FooterMenu = () => (
//   <View style={styles.footer}>
//     <TouchableOpacity style={styles.footerItem}>
//       <Icon name="home" size={24} color="#F57C00" />
//       <Text style={styles.footerLabel}>HOME</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.footerItem}>
//       <Icon name="newspaper" size={24} color="#888" />
//       <Text style={styles.footerLabel}>NEWS</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.footerItem}>
//       <Icon name="account-group" size={24} color="#888" />
//       <Text style={styles.footerLabel}>Network</Text>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     paddingVertical: 8,
//   },
//   footerItem: {
//     alignItems: 'center',
//   },
//   footerLabel: {
//     fontSize: 12,
//     marginTop: 2,
//   },
// });

// export default FooterMenu;

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeTabScreen from '../screens/HomeScreen';
// import NewsScreen from '../screens/NewsScreen';
// import NetworkScreen from '../screens/NetworkScreen';

// const Tab = createBottomTabNavigator();

// const FooterMenu = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: '#FF9933',
//         tabBarInactiveTintColor: '#888',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           height: 60,
//           paddingBottom: 6,
//         },
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === 'Home') iconName = 'home-outline';
//           else if (route.name === 'News') iconName = 'newspaper-variant-outline';
//           else if (route.name === 'Network') iconName = 'account-group-outline';

//           return <Icon name={iconName!} color={color} size={size} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeTabScreen} />
//       <Tab.Screen name="News" component={NewsScreen} />
//       <Tab.Screen name="Network" component={NetworkScreen} />
//     </Tab.Navigator>
//   );
// };

// export default FooterMenu;


// src/navigation/FooterMenu.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import NetworkScreen from '../screens/NetworkScreen';

const Tab = createBottomTabNavigator();

const FooterMenu = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#FF9933',
      tabBarInactiveTintColor: '#888',
      tabBarStyle: { backgroundColor: '#fff', height: 60 },
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<string, string> = {
          Home: 'home-outline',
          News: 'newspaper-variant-outline',
          Network: 'account-group-outline',
        };

        const iconName = iconMap[route.name] ?? 'circle-outline'; // fallback if not found
        return <Icon name={iconName} color={color} size={size} />;
      }
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="News" component={NewsScreen} />
    <Tab.Screen name="Network" component={NetworkScreen} />
  </Tab.Navigator>
);

export default FooterMenu;

