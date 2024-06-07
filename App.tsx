import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {AppState, LogBox} from 'react-native';
import Splashscreen from './screens/Splashscreen';
import LoginScreen from './screens/LoginScreen';
import Toast from 'react-native-toast-message';
import HomeScreen from './screens/HomeScreen';
import persistStore from 'redux-persist/es/persistStore';
import {store} from './store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Details from './screens/Details';
import Orders from './screens/Orders';

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
const persistor = persistStore(store);
function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}>
              <Stack.Screen
                name="Splash"
                component={Splashscreen}
                options={{...TransitionPresets.DefaultTransition}}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{...TransitionPresets.DefaultTransition}}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{...TransitionPresets.DefaultTransition}}
              />
              <Stack.Screen
                name="Details"
                component={Details}
                options={{...TransitionPresets.DefaultTransition}}
              />
              <Stack.Screen
                name="Orders"
                component={Orders}
                options={{...TransitionPresets.DefaultTransition}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}

export default App;
