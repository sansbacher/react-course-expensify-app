const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')			// Replaces extract-text-webpack-plugin for CSS (only) and webpack > 4

// Now export a function that returns the config object - so we can vary settings based on Prod vs Dev
module.exports = (env, argv) => {
	// console.log(argv);
	const isProduction = argv.mode === 'production'
	return {
		resolve: {
			symlinks: false									// Because I use symlinks/Junctions to redirect my code's root folder into OneDrive
		},
		entry: './src/app.js',
		// entry: './src/playground/higher-order-component.js',
		output: {
			path: path.join(__dirname, 'public'),			// Needs absolute path; this also works: path.resolve('./public')
			filename: 'bundle.js'
		},
		// For options see: https://webpack.js.org/configuration/devtool/
		// devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',		// use 'eval-source-map' if needing exact lines - but slower. 'source-map' only for production
		devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',		// 'inline-source-map' works for CSS, but slower. 'inline-cheap-module-source-map' is faster
		devServer: {
			contentBase: path.join(__dirname, 'public'),		// The bundle.js file is served from memory, doesn't exist on disk
			historyApiFallback: true							// Tells Dev Server to always serve index.html for all URLs (we'll use client side routing)
		},
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {								
						babelrc: true						// No need to duplicate settings, reads from .babelrc
					}
				}
			}, {
				test: /\.s?css$/,
				// use: ['style-loader', 'css-loader', 'sass-loader']		// loaded from right to left. 'style-loader' handles in-line CSS loading
				use: [		// MiniCssExtractPlugin.loader will create a separate .CSS file. Loaded from bottom to top.
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true		// Tell each loader to create source maps
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}]
		},
		plugins: [
			new MiniCssExtractPlugin({ 												// Set the name of the separate .CSS file MiniCssExtractPlugin will use
				filename: 'styles.css'
			})
		]
	};
}
