import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"
import { persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import themeReducer from './theme/themeSlice'
// COMBINEREDUCERS -> IT COMBINES MORE THAN ONE REDUCER

// redux persist -> its a important term on refreshing the web page the details of the user gets null to store the details we use persist redux functionality
// This save the details in the localstorage

const rootReducer = combineReducers ({
  user:userReducer,
  theme:themeReducer
})

// Way Of Writin "We have to use persistor and persistgate in main.js "

const persistConfig = {
  key :'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // WE NEED TO ADD MIDDLEWARE OTHER WISE IT WILL GET ERROR
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store);
