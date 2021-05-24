import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'

import 'normalize.css/normalize.css'
import './styles/styles.scss'

import 'react-dates/initialize';					// We're not using react-with-styles so need this, as per: https://github.com/airbnb/react-dates#initialize
import 'react-dates/lib/css/_datepicker.css'

const store = configureStore()

const jsx = (
	<Provider store={store}>		{/* Provides the redux store to all child Components */}
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'))
