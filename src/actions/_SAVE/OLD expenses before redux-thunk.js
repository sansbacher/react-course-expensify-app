import {v4 as uuid} from 'uuid'						// NEW method (often: uuidv4), old was: import uuid from 'uuid  (no more default export)

// Basic Actions workflow:
// 1. Component calls Action generator
// 2. Action generator returns an Object (eg. from this file, or the filters actions)
// 3. Component dispatches the object
// 4. The Redux store changes

export const addExpense = ({				// Returns an Object
	description = '',			// Destructed with defaults
	note = '',
	amount = 0,
	createdAt = 0
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})

export const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

