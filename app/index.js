import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'scss/global.scss';
import 'scss/customAntd.less';
import App from './containers/App';
import configureStore from './redux/configureStore';

const mountNode = document.getElementById('root');
const store = configureStore();
const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <LocaleProvider locale={zhCN}>
                <Component/>
            </LocaleProvider>
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
