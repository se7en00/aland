const path = require('path');

const dev = (paths) => {
    if (!paths.appName) throw new Error('dev() paths.appName is invalid!');

    return {
        // Next line is not used in dev but WebpackDevServer crashes without it:
        path: paths.appBuild,
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: `js/[name].${paths.appName}.js`,
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'js/[name].chunk.js',
        // There are also additional JS chunk files if you use code splitting.
        //chunkFilename: 'static/js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: '/',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        // redfined the
        devtoolModuleFilenameTemplate: (info) =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    };
};

const prod = (paths) => {
    if (!paths.appName) throw new Error('dev() paths.appName is invalid!');

    return {
        // The build folder.
        path: paths.appBuild,
        // Generated JS file names (with nested folders).
        // There will be one main bundle, and one file per asynchronous chunk.
        // We don't currently advertise code splitting but Webpack supports it.
        filename: `js/[name].${paths.appName}.[chunkhash:8].js`,
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        //chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
        // We inferred the "public path" (such as / or /my-project) from homepage.
        publicPath: paths.servedPath,
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
    };
};

const output = (paths) => {
    if (process.env.NODE_ENV === 'production') {
        return prod(paths);
    }
    return dev(paths);
};

module.exports = {
    output,
    dev,
    prod
};
