/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as app_name} from './app.json';

// process.env.NODE_ENV = 'production';

AppRegistry.registerComponent(app_name,() => App);
