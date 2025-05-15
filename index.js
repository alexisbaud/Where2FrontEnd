/**
 * @format
 */

import 'react-native-gesture-handler'; // Important: doit être le premier import
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
