import createHistory from 'history/createBrowserHistory';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
//middleware
import ThukMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingMiddleware from './middleware/loadingMiddleware';
import rootReducer from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const middleware = [
    loadingMiddleware,
    ThukMiddleware,
    promiseMiddleware(),
    routerMiddleware(history),
    process.env.NODE_ENV !== 'production' && createLogger()
].filter(Boolean);

const finalCreateStore = compose(
    composeWithDevTools(applyMiddleware(...middleware))
)(createStore);


export default function configureStore(initialState) {
    console.log('initialState', initialState);
    return finalCreateStore(rootReducer, initialState);
}
