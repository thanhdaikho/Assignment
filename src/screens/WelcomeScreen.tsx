import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StatusBar, ImageBackground, Image, StyleSheet } from 'react-native'
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#afbcaa"></StatusBar>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../images/Background.png')}
      >
        <View style={styles.childContainer}>
          <Image style={styles.mainLogo} source={require('../images/Logo.png')}></Image>
          <Text style={styles.headText}>Welcome</Text>
          <Text style={styles.slogan}>Stay Connected and Focused.</Text>
          <Text style={styles.slogan}>Live a healthy life.</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <View style={styles.btn}>
            <Text style={{ color: '#fff', fontSize: 26, fontWeight: '700' }}>Login With Email</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'DMSerifDisplay-Regular' }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen') }}>
            <Text style={{ textDecorationLine: 'underline', color: '#fff', fontSize: 18, fontFamily: 'DMSerifDisplay-Italic' }}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  childContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageBackground: {
    flex: 1
  },
  mainLogo: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headText: {
    color: 'white',
    fontSize: 35,
    fontWeight: '700',
    marginTop: -80
  },
  slogan: {
    color: '#fff',
    fontSize: 24
  },
  bottomContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: '#7c9a92',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 60
  },
  signUp: {
    color: 'white',
    fontSize: 18
  },
  boldText: {
    fontWeight: 'bold'
  }
});

export default WelcomeScreen
