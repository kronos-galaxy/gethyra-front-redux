import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';
import rootSaga from './sagas';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'gethyra',
  storage,
  whitelist: ['token'],
};

const IS_DEV = process.env.NODE_ENV === 'development';

const persistedReducer = persistReducer(persistConfig, reducers);

const createAppStore = () => {
  let store = null;

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (IS_DEV) {
    const composeEnhancers = composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig
    });

    store = createStore(
      persistedReducer,
      composeEnhancers(
        applyMiddleware(...middlewares),
        // ...
      ),
    );
  } else {
    store = createStore(
      persistedReducer,
      applyMiddleware(...middlewares),
    );
  }
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default createAppStore;
