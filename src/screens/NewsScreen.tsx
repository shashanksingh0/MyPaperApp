import React from 'react';
import { View, ScrollView, useColorScheme, StyleSheet } from 'react-native';
import { Text, Button, Card, Appbar } from 'react-native-paper';
import StoryItem from '../components/StoryItem1';

import { darkTheme, lightTheme } from '../themes';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const NewsScreen = () => {
    const navigation = useNavigation();
    //const theme = useTheme();
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
    

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
                        MEDIA COVERAGE
                    </Button>
                    <Button mode="contained" style={[styles.topButton, { backgroundColor: theme.colors.primary }]}>
                        EVENTS
                    </Button>
                </ScrollView>
            </Appbar.Header>
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
        paddingTop:0
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
        paddingTop:0
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
});

export default NewsScreen;