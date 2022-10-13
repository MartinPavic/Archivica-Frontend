import { createStore, compose, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk'

// TODO: Create root reducer
import { rootReducer } from './reducers/rootReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    // TODO: whitelist state that that needs to persist after exiting the app
  ],
}

const persistState = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistState, compose(applyMiddleware(thunk)))
export const persistor = persistStore(store)


