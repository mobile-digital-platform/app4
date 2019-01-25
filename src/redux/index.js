import {createStore} from 'redux';

import reducers from './reducers';

// Создаем хранилище
const store = createStore(reducers);

export default store;
