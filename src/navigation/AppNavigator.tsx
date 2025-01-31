import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';
import colors from '../utils/colors';

const Stack = createNativeStackNavigator();

interface NavigationStackProps { }

/**
 * Componente NavigationStack (Maneja la navegación entre las pantallas de la aplicación)
 * @returns {JSX.Element} El componente renderizado
 */


const NavigationStack: React.FC<NavigationStackProps> = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="Coins" component={HomeScreen} />
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen as React.ComponentType<any>} />
    </Stack.Navigator>
  );
});

export default NavigationStack;
