import thunk from 'redux-thunk'

import rootReducer from './reducers/rootReducer'
import { applyMiddleware, compose, createStore } from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
