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
	};
}

export const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const startRemoveExpense = ({id} = {}) => {			// expects an Object like {id: 'some-id'}
	return (dispatch) => {
		if (id) {				// Avoids accidentally removing all 'expenses/' if ID is null/empty
			return database.ref(`expenses/${id}`).remove().then(() => {
				dispatch(removeExpense({id}))
			})
		}
	};
}

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})


export const setExpenses = expenses => ({
	type: 'SET_EXPENSES',
	expenses				// Expects an array
})

// Helper function
const snapshotToArray = (snapshot) => {
	const expenses = []
	snapshot.forEach((childSnapshot) => {
		expenses.push({
			id: childSnapshot.key,				// Returns the key pointed to (which is the childSnapShot, the random string)
			...childSnapshot.val()				// Add all the other values
		})
	})
	return expenses;
}

export const startSetExpenses = () => {
	return (dispatch) => {						// Redux-Thunk will call this function with dispatch
		// We'll return the Promise that database.ref() returns
		return database.ref('expenses').once('value')		// Get the data ONCE, as it is now - succeeds or fails, no notification if data changes
			.then((snapshot) => {
				const expenses = snapshotToArray(snapshot)
				dispatch(setExpenses(expenses));
			})
	};
}