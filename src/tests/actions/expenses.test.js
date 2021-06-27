// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startAddExpense, addExpense, editExpense, removeExpense} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const fakeId = '123abc'

const createMockStore = configureMockStore([thunk])

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'})
	expect(action).toEqual({						// use .toEqual() with objects/arrays
		type: 'REMOVE_EXPENSE',
		id: fakeId
	})
})

test('should setup edit expense action object for note', () => {
	const noteValue = 'New note value'
	const action = editExpense(fakeId, {note: noteValue})
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: fakeId,
		updates: {note: noteValue}
	})
})

test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2])
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	})
})

test('should add expense to database and store', (done) => {			// Pass in 'done' and call it when done to allow async function to be tested
	const store = createMockStore({})
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}

	store.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions()			// Returns an array of all actions dispatched to the mock store
			expect(actions[0]).toEqual({				// Assert that the 1st Action was this Object
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),				// Tells Jest to allow any String (regardless of value)
					...expenseData
				}
			})
			// Also assert that the database contains the data too, by accessing the dispatched action's expense.id
			return database.ref(`expenses/${actions[0].expense.id}`).once('value')		// returns a promise
		}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseData)
			done()					// Forces Jest to wait for the async
		})
})

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({})
	const expenseDefaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	}

	store.dispatch(startAddExpense({}))					// Empty object in (for default data)
		.then(() => {
			const actions = store.getActions()			// Returns an array of all actions dispatched to the mock store
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseDefaults
				}
			})
			// Also assert that the database contains the data too, by accessing the dispatched action's expense.id
			return database.ref(`expenses/${actions[0].expense.id}`).once('value')		// returns a promise
		}).then((snapshot) => {
			expect(snapshot.val()).toEqual(expenseDefaults)
			done()					// Forces Jest to wait for the async
		})
})

/**
	test('should setup add expense action object with default values', () => {
		const action = addExpense()
		expect(action).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				description: '',
				amount: 0,
				createdAt: 0,
				note: '',
				id: expect.any(String)
			}
		})
	})
*/