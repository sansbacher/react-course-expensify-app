import database from '../firebase/firebase'

// NEW, with redux-thunk, for use with Firebase or other async APIs:
// Async Actions workflow, eg. for use with DBs:
// 1. Component calls Action generator
// 2. Action generator returns a Function
// 3. Component dispatches the function
// 4. Function runs (has the ability to dispatch other actions or do whatever it wants)

// OLD, plain old local redux store - see _SAVE version for this workflow:
// Basic Actions workflow:
// 1. Component calls Action generator
// 2. Action generator returns an Object (eg. from this file, or the filters actions)
// 3. Component dispatches the object
// 4. The Redux store changes

export const addExpense = expense => ({				// Simplified addExpense Action Generator
	type: 'ADD_EXPENSE',
	expense
})

export const startAddExpense = (expenseData = {}) => {			// Returns a Function (which requires redux-thunk to process)
	return (dispatch) => {		// Redux-Thunk will call this function with dispatch
		const {					// Destructure, providing defaults as needed
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData
		const expense = {description, note, amount, createdAt}		// Construct new Object (includes the defaults)

		// Pushes the data into Firebase DB - which is async - then dispatch the normal addExpense Action. Returns a promise, which can be chained upon.
		return database.ref('expenses').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,			// ID is no longer a uuid v4, but is now the unique 'key' from Firebase
				...expense				// All the other items from expense
			}))
		});
	}
}

export const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

