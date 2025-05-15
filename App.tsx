/**
 * Where2 Application
 * 
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet, View, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import colors from './src/styles/colors';

// Import de l'icône de l'application
const appIcon = require('./src/assets/app_icon.png');

/**
 * Point d'entrée principal de l'application
 */
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <RootNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
