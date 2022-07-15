import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Alert 
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const login = async() => {

    const credentials = {
        email: email,
        password: password
    }

    // yang memanggil API LOGIN KALIAN
    // respon akan mengirimkan JWT TOKEN. JWT TOKEN INI AKAN KITA SIMPAN KE DALAM ASYNC STORAGE
    // UNTUK API YANG DI JALANKAN DI LOCALHOST, TIDAK BOLEH MENGGUNAKAN "localhost" HARUS MENGGUNAKAN IP LOCAL
    //cara untuk cek IP kalian "ipconfig"
    try {
        let response = await fetch(`http://192.168.100.238:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        //contoh response local login dari instruktur:
        // {
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJpY2hhQG1haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTc4OTA1MTJ9.SpSpo-7xCuCHQCzjNGlCJdXaeLwnTPn1pERqjncMyKM",
        //     "email": "icha@mail.com",
        //     "balance": 5000
        // }

        if (response.ok) {
            let user = await response.json();
            console.log(user);

            //menyimpan data ke asyncStorage
            await AsyncStorage.setItem('token', user.token);
            await AsyncStorage.setItem('userDetail', JSON.stringify({ email: user.email, balance: user.balance }));

            navigation.replace('Menu');
        } else {
            Alert.alert('Username/Password is not register')
        }

    } catch(err) {
        console.log(err);
        Alert.alert('Something Wrong')
    }
  }

  return (
    <SafeAreaView style={ styles.loginContainer } >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} />
      <View>
        <TouchableOpacity onPress={login}>
            <Text>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})