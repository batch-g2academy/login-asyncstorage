import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [ user, setUser ] = useState({});

  const getUser = async () => {
    try {
      const userDetail = await AsyncStorage.getItem('userDetail');
      console.log(userDetail);
      if (userDetail) {
        setUser(state => {
          return { ...state, ...JSON.parse(userDetail)}
        });
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userDetail');
      await AsyncStorage.removeItem('token');

      navigation.replace('Login');
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Text>{user.email}</Text>
      <Text>{user.balance}</Text>

      <TouchableOpacity onPress={logout}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})