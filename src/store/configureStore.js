import {createStore, combineReducers} from 'redux'
import expensesReducer from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

export default () => {			// Default export is a function that returns the store

	const store = createStore(
		combineReducers({				// Pass in an object of key: reducerFunction. All Reducers will receive all Actions.
			expenses: expensesReducer,
			filters: filtersReducer
		}),
		// Per: https://github.com/zalmoxisus/redux-devtools-extension#1-with-redux
		// For Production (probably) prefix something like 'ENV.DEV &&' to only enable in DEV (or !ENV.PROD)
		// Or See: https://github.com/zalmoxisus/redux-devtools-extension#14-using-in-production
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()		// For Redux Dev Tools Extension
	)

	return store;
}

