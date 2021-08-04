import {createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import Reducers from './reducers'
import {AsyncStorage} from 'react-native'

const persistedReducer = persistReducer({
    key:'root',
    storage: AsyncStorage,
    whitelist:['userReducer']
}, Reducers);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
