const path = require('path')

module.exports = {
	resolve: {
		symlinks: false									// Because I use symlinks/Junctions to redirect my code's root folder into OneDrive
	},
	entry: './src/app.js',
	// entry: './src/playground/higher-order-component.js',
	output: {
		path: path.join(__dirname, 'public'),			// Needs absolute path; this also works: path.resolve('./public')
		filename: 'bundle.js'
	},
	devtool: 'eval-cheap-module-source-map',			// use 'eval-source-map' if needing exact lines - but slower
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
			use: ['style-loader', 'css-loader', 'sass-loader']		// loaded from right to left
		}]
	}
}
