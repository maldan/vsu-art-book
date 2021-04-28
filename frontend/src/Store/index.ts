import { handleRequests } from '@redux-requests/core';
import axios from 'axios';
import { createDriver } from '@redux-requests/axios';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { History } from 'history';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken');

function* rootSaga(..._args: unknown[]) {
  yield all([]);
}

export default function configureStore(history: History<unknown>, host: string) {
  const { requestsReducer, requestsMiddleware } = handleRequests({
    driver: createDriver(
      axios.create({
        baseURL: host,
      }),
    ),
  });

  const reducers = combineReducers({
    router: connectRouter(history),
    requests: requestsReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history), ...requestsMiddleware];

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      // @ts-ignore
      (window as { [key: string]: unknown })['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
    compose;

  // @ts-ignore
  const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return store;
}
