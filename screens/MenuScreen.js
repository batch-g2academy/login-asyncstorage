import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createBottomTabNavigator();

const MenuScreen = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown:false }}>
            <Tab.Screen name="Home" component={HomeScreen} 
                options={{ tabBarIcon: ({color, size}) => (
                    <FontAwesome name="home" size={24} color="black" />
                )}}
            />
            <Tab.Screen name="Profile" component={ProfileScreen} 
                 options={{ tabBarIcon: ({color, size}) => (
                    <AntDesign name="user" size={24} color="black" />
                )}}
            />
        </Tab.Navigator>
    );
}

export default MenuScreen

const styles = StyleSheet.create({})