// requires ============================================== //
const path = require("path");
// plugins
const HTMLWebpackPlugin = require("html-webpack-plugin");

// constants ============================================= //
const PATHS = {
    // animations: path.resolve(
    //     __dirname,
    //     "./src/general/scripts/animations/index.ts"
    // ),
    // "jsx": path.resolve(
    //     __dirname,
    //     "./src/general/scripts/jsx/index.ts"
    // ),
    // patterns_animations: path.resolve(
    //     __dirname,
    //     "./src/general/scripts/animations/patterns/animations.ts"
    // ),
    settings_game: path.resolve(
        __dirname,
        "./src/general/settings_game"
    ),
    "@libs": path.resolve(
        __dirname,
        "./src/general/libs"
    ),
    "@components": path.resolve(
        __dirname,
        "./src/general/components"
    ),
};

// main ================================================== //
module.exports = {
    entry: "./src/app/index.tsx",
    output: {
        clean: true,
        filename: "bundle.js",
        path: path.resolve(__dirname, "demo"),
    },
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                use: "ts-loader", 
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: "asset/resource",
            },
            {
                test: /\.(ttf|woff|eot|otf|woff(2)?|)$/,
                type: "asset/resource",
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".css"],
        alias: PATHS
    },
    optimization: {
        splitChunks: { chunks: "all", }
    },
    stats: {
        errorDetails: true,
    },
    watchOptions: {
        ignored: "**/node_modules",
    },
};