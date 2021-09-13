import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import AppRouter, {history} from './routers/AppRouter'			// history is the custom browser history object used by Router
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import {login, logout} from './actions/auth'

import 'normalize.css/normalize.css'
import './styles/styles.scss'

import 'react-dates/initialize';					// We're not using react-with-styles so need this, as per: https://github.com/airbnb/react-dates#initialize
import 'react-dates/lib/css/_datepicker.css'

import {firebase} from './firebase/firebase'


const store = configureStore()

const jsx = (
	<Provider store={store}>		{/* Provides the redux store to all child Components */}
		<AppRouter />
	</Provider>
);

let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'))
		hasRendered = true											// Only render once, even if user logs in/out. A hard refresh will cause page reload and will need to render again.
	}
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// Fetch the expenses if user has logged in
		store.dispatch(login(user.uid))						// Keep track of the user's ID in the Redux store, even if it's an implicit login on page reload
		store.dispatch(startSetExpenses()).then(() => {
			renderApp()
			// If they're on the main login page, redirect to the Dashboard (otherwise they'll stay on whatever page they're on)
			if (history.location.pathname === '/') {
				history.push('/dashboard')
			}
		})
	} else {
		// Render the app and redirect to main/login page if the user is logged out (so they can log in again)
		store.dispatch(logout())
		renderApp()
		history.push('/')
	}
})