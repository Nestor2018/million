import { NavigationContainer } from '@react-navigation/native';

import NavigationStack from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;
