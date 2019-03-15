const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const getFilename = (path) => {
    const myRegexp = /(?:(?:src\/)+)((?:(?:\/)*(?:(?:(?:[^\/])+))+)+)\..*$/g;
    return myRegexp.exec(path)[1];
};

module.exports = {
    entry: () => {
        const files = glob.sync("{./src/**/*.ts,./src/**/*.scss}");

        return files.reduce((acc, val) => {
            let filename = getFilename(val);
            if(acc[filename] === undefined) {
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
                            context: 'src'
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