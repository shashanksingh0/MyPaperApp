import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../App';

const CustomDrawerContent = (props: any) => {
    const { isLoggedIn, user, logout, login } = useAuth();
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
            <View style={styles.headerContainer}>
                {isLoggedIn ? (
                    <View style={styles.loggedInProfile}>
                        <Avatar.Icon size={64} icon="account" style={styles.avatar} />
                        <Text variant="titleLarge" style={styles.nameText}>{user?.name || 'User'}</Text>
                        <TouchableOpacity style={styles.editIcon}>
                            <Icon name="pencil-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.loginBox}>
                        <Text style={styles.loginTitle}>YOU ARE NOT LOGGED IN!</Text>
                        <Text style={styles.loginSubtitle}>Login now to access all the features.</Text>
                        <View style={styles.loginButtonRow}>
                            <Button mode="contained" style={styles.loginButton} onPress={login}>SIGN IN</Button>
                            <Button mode="contained" style={styles.loginButton}>SIGN UP</Button>
                        </View>
                    </View>
                )}
            </View>

            <View style={styles.navSection}>
                <DrawerItemList {...props} />
                {isLoggedIn && (
                    <DrawerItem
                        label="Logout"
                        onPress={logout}
                        icon={({ color, size }) => <Icon name="logout" size={size} color={color} />}
                    />
                )}
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#062A52',
    },
    headerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    loggedInProfile: {
        alignItems: 'center',
        position: 'relative',
    },
    avatar: {
        backgroundColor: '#FFA726',
    },
    nameText: {
        color: 'white',
        marginTop: 10,
        fontSize: 18,
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    loginBox: {
        backgroundColor: '#0D3B66',
        padding: 16,
        borderRadius: 8,
    },
    loginTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    loginSubtitle: {
        fontSize: 14,
        color: 'white',
        marginBottom: 12,
    },
    loginButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loginButton: {
        flex: 1,
        marginHorizontal: 4,
        backgroundColor: '#F57C00',
    },
    navSection: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 8,
    },
});

export default CustomDrawerContent;
