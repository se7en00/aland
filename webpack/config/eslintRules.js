const eslintPettyFormat = require('eslint-formatter-pretty');
// First, run the linter.
// It's important to do this before Babel processes the JS.
const eslintRules = (paths) => ({
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    use: [{
        options: {
            formatter: eslintPettyFormat,
            eslintPath: require.resolve('eslint')
        },
        loader: require.resolve('eslint-loader')
    }],
    exclude: paths.appNodeModules || /node_modules/,
    include: paths.appSrc
});

module.exports = {
    eslintRules
};
