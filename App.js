import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavorisScreen from './screens/FavorisScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ProfilScreen from './screens/ProfilScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import TopdealsScreen from './screens/TopdealsScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import user from './reducers/user';
import types from './reducers/types';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useEffect} from 'react';



const reducers = combineReducers({ types, user });
const persistConfig = { key: 'CityGo', storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 const persistor = persistStore(store);


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'map';
        } else if (route.name === 'Topdeals') {
          iconName = 'thumbs-o-up';
        } else if (route.name === 'Favoris') {
          iconName = 'star';
        } else if (route.name === 'Profil') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Topdeals" component={TopdealsScreen} />
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />

    </Tab.Navigator>
  );
};

export default function App() {
    // Function to clear AsyncStorage , only use in case of EXTREME necessity
    // (() => {
    //   try {
    //     AsyncStorage.getAllKeys()
    //     .then((keys)=> AsyncStorage.multiRemove(keys))
    //     .then(()=> console.log('Done'))
    //   } catch(e) {
    //     console.error(e)
    //   }
    // })()
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <NavigationContainer>

        <Stack.Navigator screenOptions={{ headerShown: false }}>

          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />

        </Stack.Navigator>

      </NavigationContainer>
      </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
