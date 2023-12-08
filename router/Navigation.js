import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ChatScreen from '../screens/Chat';
import InitialScreen from '../screens/InitialScreen';
import PreSessionScreen from '../screens/PreSessionScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Greetings">
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Greetings"
          component={InitialScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PreSession"
          component={PreSessionScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
