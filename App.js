import React from 'react';
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/es/integration/react";
import {store, persistor} from './src/store'
import {View, Text} from 'react-native'
import MainStack from './src/navigators/mainStack'

export default function App() {

    return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStack/>
          </PersistGate>
      </Provider>

    );

}


