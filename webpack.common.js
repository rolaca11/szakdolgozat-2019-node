const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const getFilename = (path, baseDir = "./src") => {
    const myRegexp = new RegExp("(?:(?:" + escapeRegexString(baseDir) + "(?:\\/*))+)((?:(?:\\/)*(?:(?:(?:[^\\/])+))+)+)\\..*$");
    return myRegexp.exec(path)[1];
};

const escapeRegexString = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

module.exports = env => {
    const basedir = env.BASEDIR === undefined ? "./src" : env.BASEDIR;
    return {
        entry: () => {
            let pattern = "{"+ basedir + "/**/*.ts," + basedir + "/**/*.scss}";
            const files = glob.sync(pattern);

            return files.reduce((acc, val) => {

                let filename = getFilename(val, basedir);
                if (acc[filename] === undefined) {
                    acc[filename] = [];
                }
                acc[filename].push(val);
                return acc;
            }, {});
        },
        output: {
            path: __dirname + "/dist",
            publicPath: "",
            filename: "[name].js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: basedir
                            },
                        },
                    ],
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts']
        }
    };
};