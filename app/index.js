import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'scss/global.scss';
import 'scss/customAntd.less';
import App from './App';
import configureStore from './redux/configureStore';

const mountNode = document.getElementById('root');
const store = configureStore();
const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component/>
        </Provider>,
        mountNode);
};
render(App);
// // Webpack Hot Module Replacement API
// if (module.hot) {
//     module.hot.accept('components/layout/App', (error) => {
//         console.log('module hot');
//         if (error) {
//             console.log('in error', error);
//         }
//         // if you are using harmony modules ({modules:false})
//         render(App);
//         // const NextComponent = require('./components/layout/App.js').default;// eslint-disable-line
//         render(require('./components/layout/App.js'));// eslint-disable-line
//     });
// }
