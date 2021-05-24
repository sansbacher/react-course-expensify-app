// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import {addExpense, editExpense, removeExpense} from '../../actions/expenses'

const fakeId = '123abc'

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

test('should setup add expense action object with values', () => {
	const expenseData = {
		description: 'Rent',
		amount: 109500,
		createdAt: 1000,
		note: 'Last month rent'
	}
	const action = addExpense(expenseData)
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)				// Tells Jest to allow any String (regardless of value)
		}
	})
})

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