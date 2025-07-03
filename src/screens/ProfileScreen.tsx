// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';
import { useAuth } from '../../App';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text variant="titleMedium">You are not logged in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Avatar.Icon icon="account" size={100} style={styles.avatar} />
      <Text variant="titleLarge" style={styles.name}>Shashank</Text>
      <Text variant="bodyMedium" style={styles.email}>shashank@anj.xyz</Text>
      <Button mode="contained" style={styles.logoutBtn} onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    marginBottom: 20,
    backgroundColor: '#FFA726',
  },
  name: {
    fontSize: 22,
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  logoutBtn: {
    marginTop: 20,
    backgroundColor: '#EF5350',
  },
});

export default ProfileScreen;
