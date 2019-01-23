import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'remote-redux-devtools';

import reducers from './reducers';
import root_saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

// Создаем хранилище
const store = createStore(reducers, composeWithDevTools(
    enhancer
));

// Вклиниваем главную сагу
sagaMiddleware.run(root_saga);

export default store;
