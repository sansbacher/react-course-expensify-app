import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import authReducer from '../reducers/auth'

// Uses the Redux Dev Tools' compose, or the standard Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {			// Default export is a function that returns the store

	const store = createStore(
		combineReducers({				// Pass in an object of key: reducerFunction. All Reducers will receive all Actions.
			expenses: expensesReducer,
			filters: filtersReducer,
			auth: authReducer
		}),

		// applyMiddleware(thunk)		// Normal way to add middleware (as 2nd arg to createStore), BUT can't then use the Redux Dev Tools:

		// Old way to JUST have the Redux Dev Tools:
		//   Per: https://github.com/zalmoxisus/redux-devtools-extension#1-with-redux
		//   For Production (probably) prefix something like 'ENV.DEV &&' to only enable in DEV (or !ENV.PROD) - or leave it, no harm for Prod (it's all user data)
		//   Or See: https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
		//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()		// For Redux Dev Tools Extension

		composeEnhancers(applyMiddleware(thunk))		// Combined thunk + Redux dev tools (as 2nd arg)
	)

	return store;
}

