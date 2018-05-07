const babelLoader = (paths) => ({
    test: /\.js[x]?$/,
    loader: require.resolve('babel-loader'),
    options: {
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        //
        // DISABLED as it causes issues with source maps at the moment
        cacheDirectory: true,
        // Some modules have an .babelrc file that conflicts with our presets defined here
        // babelrc: false
        compact: process.env.NODE_ENV === 'production'
    },
    include: paths.appSrc, // Matches app's src directory
    exclude: paths.appNodeModules || /node_modules/

});
module.exports = {
    babelLoader
};
