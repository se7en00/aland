const path = require('path');
const fs = require('fs');
// const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => {
    if (!appDirectory) {
        throw new Error('appDirectory has not been set or is invalid!');
    }
    return path.resolve(appDirectory, relativePath);
};

const ensureSlash = (pathStr, needsSlash) => {
    const hasSlash = pathStr.endsWith('/');
    if (hasSlash && !needsSlash) {
        return pathStr.substr(pathStr, pathStr.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${pathStr}/`;
    }
    return pathStr;
};

const getPublicUrl = appPackageJson => {
    const envPublicUrl = process.env.PUBLIC_URL;
    return envPublicUrl || require(appPackageJson).homepage; //eslint-disable-line
};

// We use `PUBLIC_URL` environment variable to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
const getServedPath = appPackageJson => {
    const envPublicUrl = getPublicUrl(appPackageJson);
    return ensureSlash(envPublicUrl, true);
};

// config after eject: we're in ./config/
module.exports = {
    appName: 'aland',
    dotenv: resolveApp('.env'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('app/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('app'),
    appScss: resolveApp('app/scss'),
    yarnLockFile: resolveApp('yarn.lock'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    mockerJS: resolveApp('app/mock/mocker.js')
};
