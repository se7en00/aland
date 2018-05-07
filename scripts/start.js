// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// Ensure environment variables are read.
require('../webpack/config/env');

const Webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const paths = require('../webpack/config/paths');
const config = require('../webpack/webpack.config.dev');
const createDevServerConfig = require('../webpack/webpackDevServer.config');
const openBrowser = require('react-dev-utils/openBrowser');

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000; //eslint-disable-line
const HOST = process.env.HOST || '127.0.0.1';


// WebpackDevServer.addDevServerEntrypoints(config, createDevServerConfig);
const compiler = Webpack(config);
const server = new WebpackDevServer(compiler, createDevServerConfig(paths));

server.listen(DEFAULT_PORT, HOST, (err) => {
    if (err) throw err;
    console.log(chalk.cyan('Starting the development server...\n'));
    openBrowser(`http://${HOST}:${DEFAULT_PORT}`);
});
