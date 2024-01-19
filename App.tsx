// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RootComponent from './src/screens';

function App() {
  return (
    <RootComponent/>
  );
}

export default App;