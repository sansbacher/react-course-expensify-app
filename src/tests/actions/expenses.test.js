// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, beforeEach} from '@jest/globals'				// With React/Browser

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

// Import the fixtures data before each test runs
beforeEach((done) => {
	const expensesData = {}
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}			// Results in an object of several id1: {desc, note, etc}, id2: {etc}
	})
	database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'})
	expect(action).toEqual({						// use .toEqual() with objects/arrays
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should setup edit expense action object for note', () => {
	const noteValue = 'New note value'
	const action = editExpense('123abc', {note: noteValue})
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
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

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore({})
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})