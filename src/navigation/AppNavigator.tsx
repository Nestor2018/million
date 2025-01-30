import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Coins" component={HomeScreen} />
    </Stack.Navigator >
  );
};

export default NavigationStack;
