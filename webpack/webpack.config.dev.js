const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {
    getClientEnvironment,
    lib,
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
} = require('./config');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);
//global style
const extractGlobalCSS = new ExtractTextPlugin({filename: 'css/global-[name].css'});
//style for css moudules
const extractModulesCSS = new ExtractTextPlugin({filename: 'css/[name].css'});

module.exports = {
    mode: 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
    devtool: 'cheap-module-eval-source-map',
    entry: entry(paths),
    output: output(paths),
    resolve: resolve(paths, {SCSS_PATH: paths.appScss}),
    module: {
        strictExportPresence: true,
        rules: [
            // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
            // { parser: { requireEnsure: false } },
            eslintRules(paths),
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list
                oneOf: [
                    babelLoader(paths),
                    extractSassRules(paths, extractGlobalCSS), //match global style
                    extractSassRules(paths, extractModulesCSS, true), //match moudules style
                    imagesUrlLoader(),
                    ...fontsLoader(),
                    noMatchLoader()
                ]
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            showErrors: true,
            template: paths.appHtml
        }),
        // Makes some environment variables available in index.html.
        // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
        // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        // In development, this will be an empty string.
        new InterpolateHtmlPlugin(env.raw),
        // Makes some environment variables available to the JS code, for example:
        // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
        new webpack.DefinePlugin(env.stringified),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),
        // skip the emitting phase whenever there are errors while compiling, this
        //won't reload page
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.HashedModuleIdsPlugin(),

        extractGlobalCSS,
        extractModulesCSS,

        new webpack.optimize.SplitChunksPlugin({
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                //打包重复出现的代码
                vendor: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0, // This is example is too small to create commons chunks
                    name: 'vendor'
                },
                //打包第三方类库
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: Infinity
                }
            }
        }),

        new webpack.optimize.RuntimeChunkPlugin({
            name: 'manifest'
        })
    ],
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false
    },
    node: {
        constants: false
    }
};
