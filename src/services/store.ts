import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'
import {rootReducer} from './reducers'
import {createWebSocketMiddleware} from './middlewares/websocket'
import {feedOrdersActionTypes} from './actions/feed-orders'
// import {historyOrdersActionTypes} from './actions/history-orders'

export const configureStore = () => {
    const enhancer = composeWithDevTools(applyMiddleware(
        thunkMiddleware,
        createWebSocketMiddleware(feedOrdersActionTypes),
        // createWebSocketMiddleware(historyOrdersActionTypes),
    ));

    return createStore(rootReducer, enhancer)
}
