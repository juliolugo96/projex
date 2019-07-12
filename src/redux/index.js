import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";

const PURGE_LOCAL_STORAGE = false;

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

if( PURGE_LOCAL_STORAGE ){
    persistor.purge();
  };

