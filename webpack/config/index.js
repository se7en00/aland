//get env config
const getClientEnvironment = require('./env');
//base
const paths = require('./paths');
const {entry} = require('./entry');
const {output} = require('./output');
const {resolve} = require('./resolve');

//loaders
const extractSassRules = require('./styleLoaders');
const {eslintRules} = require('./eslintRules');
const {babelLoader} = require('./babelLoader');
const {imagesUrlLoader, fontsLoader, noMatchLoader} = require('./fileLoaders');
//pulings
const InterpolateHtmlPlugin = require('./InterpolateHtmlPlugin');

module.exports = {
    getClientEnvironment,
    paths,
    entry,
    output,
    resolve,
    extractSassRules,
    eslintRules,
    babelLoader,
    imagesUrlLoader,
    fontsLoader,
    noMatchLoader,
    InterpolateHtmlPlugin
};
