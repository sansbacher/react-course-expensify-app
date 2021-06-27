const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')			// Replaces extract-text-webpack-plugin for CSS (only) and webpack > 4

process.env.NODE_ENV = process.env.NODE_ENV || 'development'			// Heroku will set NODE_ENV = 'production' when we're running there. Using cross-env to set it in package.json when testing/dev.

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' })						// Read in the .env.test file and add all the environment variables
} else if (process.env.NODE_ENV === 'development') {
	require('dotenv').config({ path: '.env.development' })				// ENV Variables are 'passed' (replaced) below, at compile time by webpack
}

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
			path: path.join(__dirname, 'public', 'dist'),			// Needs absolute path; this also works: path.resolve('./public/dist')
			filename: 'bundle.js'
		},
		// For options see: https://webpack.js.org/configuration/devtool/
		// devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',		// use 'eval-source-map' if needing exact lines - but slower. 'source-map' only for production
		devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',		// 'inline-source-map' works for CSS, but slower. 'inline-cheap-module-source-map' is faster
		devServer: {
			publicPath: '/dist/',								// Actual webpack generated files will go in here, under public/
			contentBase: path.join(__dirname, 'public'),		// Non-webpack generated files come from here
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
			}),
			new webpack.DefinePlugin({				// Pass variables to client-side JS - basically does a find/replace.
				'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),				// Need to use JSON.stringify() to ensure we get the '"quoted value"' of the variable
				'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
				'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
				'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
				'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
				'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
				'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
				'process.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
			})
		]
	};
}
