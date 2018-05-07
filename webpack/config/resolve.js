const path = require('path');

const resolve = (paths, alias = {}) => {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    const modules = ['node_modules'];
    if (paths.appNodeModules) {
        modules.push(paths.appNodeModules);
    }

    // It is guaranteed to exist because we tweak it in `env.js`
    modules.push(...process.env.NODE_PATH.split(path.delimiter).filter(Boolean));

    return {
        modules,
        extensions: ['.js', '.jsx', '.css', '.scss'],
        alias
        // plugins: [
        //     // Prevents users from importing files from outside of src/ (or node_modules/).
        //     // This often causes confusion because we only process files within src/ with babel.
        //     // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        //     // please link the files into your node_modules/ and let module-resolution kick in.
        //     // Make sure your source files are compiled, as they will not be processed in any way.
        //     new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
        // ]
    };
};

module.exports = {
    resolve
};
