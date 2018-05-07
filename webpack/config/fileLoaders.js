// "url" loader works just like "file" loader but it also embeds
// assets smaller than specified size as data URLs to avoid requests.
const imagesUrlLoader = () => ({
    test: /\.(png|gif|bmp|jpg|jpe?g)([?#][a-zA-Z0-9#?&=.]*)?$/,
    loader: require.resolve('url-loader'),
    options: {
        limit: 10000,
        name: 'images/[name].[hash:8].[ext]'
    }
});

const woffUrlLoader = () => ({
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
    // loader: "url?limit=10000"
    use: [{
        loader: require.resolve('url-loader'),
        options: {
            limit: 10000,
            name: 'fonts/[name].[ext]',
            mimetype: 'application/font-woff',
            publicPath: '../'
            // publicPath: url => `../fonts/${url}`
        }
    }]
});

//file with name extension tff, tof, eot,svg will be deal with file loader,
// and output it into fonts file of build assert, url will use relative path
const otherFontsLoader = () => ({
    test: /.(woff(2)?|ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: require.resolve('file-loader'),
    options: {
        name: 'fonts/[name].[ext]',
        limit: 10000,
        // outputPath: './', // where the fonts will go
        publicPath: '../' // override the default path
        // publicPath: url => `../fonts/${url}`

    }
});

// ** ADDING/UPDATING LOADERS **
// The "file" loader handles all assets unless explicitly excluded.
// The `exclude` list *must* be updated with every change to loader extensions.
// When adding a new loader, you must add its `test`
// as a new entry in the `exclude` list in the "file" loader.

// "file" loader makes sure those assets end up in the `build` folder.
// When you `import` an asset, you get its filename.
const noMatchLoader = () => ({
    exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.p?css$/, //postcss and regular css
        /\.sass$/,
        /\.json$/,
        /\.bmp$/,
        /\.gif$/,
        /\.jpe?g$/,
        /\.png$/
    ],
    loader: require.resolve('file-loader'),
    options: {
        name: 'media/[name].[hash:8].[ext]'
    }
});

const fontsLoader = () => [
    woffUrlLoader(),
    otherFontsLoader()
];

module.exports = {
    imagesUrlLoader,
    fontsLoader,
    woffUrlLoader,
    otherFontsLoader,
    noMatchLoader
};
