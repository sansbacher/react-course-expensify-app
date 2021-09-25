// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, beforeEach, afterAll} from '@jest/globals'				// With React/Browser

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startAddExpense,
	startSetExpenses,
	startRemoveExpense,
	startEditExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'This_Is_My_Test_UID'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

// Import (refresh) the fixtures data into the TEST Firebase DB before each test runs
beforeEach((done) => {
	const expensesData = {}
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}			// Results in an object of several id1: {desc, note, etc}, id2: {etc}
	})
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

afterAll(() => {
	database.goOffline()
})

// Doesn't use Firebase
test('should setup remove expense action object', () => {
	const action = removeExpense({id: '123abc'})
	expect(action).toEqual({						// use .toEqual() with objects/arrays
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

// Does use Firebase, so we use our mock UID
test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState)					// Preload fixtures as expenses
	const id = expenses[1].id
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy()				// If it's been removed it will be null, .toBeFalsy() would also work
		done()
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

test('should edit expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[1].id
	const updates = {
		amount: 211100,
		note: 'Moved into a bigger apartment'
	}
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		})
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		const data = snapshot.val()
		expect(data.amount).toBe(updates.amount)
		expect(data.note).toBe(updates.note)
		done()
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
	const store = createMockStore(defaultAuthState)
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions()			// Returns an array of all actions dispatched to the mock store
		expect(actions[0]).toEqual({				// Assert that the 1st Action was this Object
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),				// Tells Jest to allow any String (regardless of value)
				...expenseData
			}
		})
		// Also assert that the database contains the data too, by accessing the dispatched action's expense.id
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')		// returns a promise
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done()					// Forces Jest to wait for the async
	})
})

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState)
	const expenseDefaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	}

	store.dispatch(startAddExpense({})).then(() => {					// Empty object in (for default data)
		const actions = store.getActions()			// Returns an array of all actions dispatched to the mock store
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseDefaults
			}
		})
		// Also assert that the database contains the data too, by accessing the dispatched action's expense.id
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')		// returns a promise
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
	const store = createMockStore(defaultAuthState)
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})

