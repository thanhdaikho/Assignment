import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import NewProfileSceen from './NewProfileSceen';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

const RootComponent = () => {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        FIREBASE_AUTH.onAuthStateChanged(user => {
            if (user) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        })
    }, [])


    const MainRouter = (

        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoadingScreen'>
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="NewProfileScreen" component={NewProfileSceen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )

    const AuthRouter = (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='WelcomeScreen'>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
    return isLogin ? MainRouter : AuthRouter
}


export default RootComponent 
