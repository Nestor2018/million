import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import NavigationStack from './src/navigation/AppNavigator';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
