const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const helper = require('../helper');

const APP_PATH = helper.resolve('app');
const SCSS_PATH = helper.resolve('app/scss');
// const node_modules = helper.resolve('../../node_modules');

module.exports = {
    getBaseConfig(options) {
        const {assetsDirectory, assetsPublicPath, env} = options;
        console.log('env: ', options);
        const libPath = env === 'development' ? helper.resolve('build/lib/dev/vendor-manifest.json') :
            helper.resolve('build/lib/product/vendor-manifest.json');
        console.log('libPath : ', libPath);
        return {
            output: {
                path: helper.resolve(assetsDirectory),
                publicPath: assetsPublicPath,
                filename: 'js/[name].bundle.js'
            },
            module: {
                rules: [
                    /**
                     * babel loader
                     */
                    {
                        test: /\.js[x]?$/,
                        include: APP_PATH,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader'
                            },
                            {
                                loader: 'eslint-loader'
                            }]
                    },
                    /**
                     * Fonts/Images
                     */
                    {
                        test: /\.(png|gif|bmp|jpg)([?#][a-zA-Z0-9#?&=.]*)?$/,
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'images/[name].[ext]'
                            }
                        }]
                    },
                    /**
                     *  Fonts Awesome
                     */
                    {
                        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                        // loader: "url?limit=10000"
                        use: [{
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                mimetype: 'application/font-woff'
                            }
                        }]
                    },
                    {
                        test: /.(ttf|otf|eot|svg|woff|woff(2)?)(\?[a-z0-9]+)?$/,
                        use: [{
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                limit: 10000,
                                outputPath: 'fonts/', // where the fonts will go
                                publicPath: '../' // override the default path
                            }
                        }]
                    }
                    // helper.styleLoaders(options, true, extractModulesCSS), //moduleCss
                    // helper.styleLoaders(options, false, extractGlobalCSS) //globalCss
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.css', '.scss'],
                modules: [APP_PATH, 'node_modules'],
                alias: {
                    SCSS_PATH
                }
            },
            plugins: [
                new CleanWebpackPlugin(['build']),
                // new CleanWebpackPlugin([helper.resolve(assetsDirectory)], { verbose: true }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(env)
                }),
                // https://github.com/ampedandwired/html-webpack-plugin
                new HtmlWebpackPlugin(
                    helper.htmlPluginOptions(options)
                ),

                // 设置mainfest.json
                new webpack.DllReferencePlugin({
                    context: helper.defPath.ROOT_PATH,
                    manifest: require(libPath) // eslint-disable-line
                }),

                new AddAssetHtmlPlugin([
                    {
                        filepath: helper.resolve('build/lib/dev/*.dll.js')
                        // outputPath: 'lib/min',
                        // publicPath: '/dist/lib/min',
                        // includeSourcemap: false
                    }
                ])

                // new webpack.optimize.CommonsChunkPlugin({
                //     name: ['vendor', 'manifest'],
                //     minChunks: Infinity
                // })

                // new webpack.optimize.CommonsChunkPlugin({
                //     name: 'vendor',
                //     minChunks(module) {
                //         // any required modules inside node_modules are extracted to vendor
                //         return (
                //             module.resource &&
                //             /\.js$/.test(module.resource) &&
                //             module.resource.indexOf(helper.resolve('../../node_modules')) === 0
                //         );
                //     }
                // }),
                //
                // new webpack.optimize.CommonsChunkPlugin({
                //     name: 'manifest',
                //     minChunks: Infinity
                // })
            ]
        };
    }
};
