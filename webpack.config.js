const { resolve } = require("path");
const webpack = require("webpack");
const prod = process.env.NODE_ENV === "production";

module.exports = {
	entry: ["./index.js"],
	output: {
		publicPath: "/"
	},
	devtool: "cheap-source-map",

	output: {
		filename: "app.js",
		path: resolve(__dirname, "js")
	},
	context: resolve(__dirname, "src"),

	resolve: {
		modules: [resolve(__dirname, "src"), "node_modules"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true,
				warnings: false,
				drop_console: prod
			},
			comments: false
		})
	]
};
