import React from 'react';
import MessageScreen from './src/screens/MessageScreen';
import {Host} from 'react-native-portalize';

const App = () => {
  return (
    <Host>
      <MessageScreen />
    </Host>
  );
};

export default App;
