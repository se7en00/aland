import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
//middleware
import ThukMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
// import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import loadingMiddleware from './middleware/loadingMiddleware';
import rootReducer from './reducers';

const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
    loadingMiddleware,
    ThukMiddleware,
    promiseMiddleware(),
    routerMiddleware(history),
    process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean);

// const finalCreateStore = compose(
//     composeWithDevTools(applyMiddleware(...middleware))
// )(createStore);

const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);


export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}

export {history};
