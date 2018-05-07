import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/layout/App';
import 'scss/global.scss';

const mountNode = document.getElementById('root');
const render = Component => {
    ReactDOM.render(<Component/>, mountNode);
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
