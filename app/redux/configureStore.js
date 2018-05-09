import createHistory from 'history/createBrowserHistory';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
//middleware
import ThukMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createFetchMiddleware from 'redux-composable-fetch';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const FetchMiddleware = createFetchMiddleware({
    afterFetch({ action, result }) {
        return result.json().then(data => Promise.resolve({
            action,
            result: data
        }));
    }
});

const middleware = [ThukMiddleware, FetchMiddleware, routerMiddleware(history)];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
const finalCreateStore = compose(
    composeWithDevTools(applyMiddleware(...middleware))
)(createStore);


export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
