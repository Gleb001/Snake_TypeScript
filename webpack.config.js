
// requires ============================================== //
// path
const path = require("path");
// plugins
const HTMLWebpackPlugin = require("html-webpack-plugin");

// main ================================================== //
module.exports = {

    // entry and output points
    entry: "./src/app/main.tsx",
    output: {
        clean: true,
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },

    // modules, plugins, resolve
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
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
        alias: {
            "animations": path.resolve(__dirname, "./src/general/scripts/animations/work_with_animations.ts"),
            "patterns_animations": path.resolve(__dirname, "./src/general/scripts/animations/patterns/animations.ts"),
            "jsx": path.resolve(__dirname, "./src/general/scripts/jsx/work_with_html.ts"),
            "settings_game": path.resolve(__dirname, "./src/general/scripts/settings_game/settings_game.ts"),
        }
    },

    // optimization
    optimization: {
        splitChunks: { chunks: "all", }
    },

    stats: {
        errorDetails: true,
    },

};