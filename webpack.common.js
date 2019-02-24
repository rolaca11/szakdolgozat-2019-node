const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    // plugins: [
    //     new CopyPlugin([
    //         {
    //             from: "src/**/*.html",
    //             to: "dist/index.html",
    //             toType: "file"
    //         }
    //     ])
    // ],
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