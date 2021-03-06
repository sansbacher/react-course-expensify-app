// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual([])
})

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([ expenses[0], expenses[2] ])
})

test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1 abc -9'						// ID does not exist in the fixtures data
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)			// Should have no change between state to initial data
})

test('should add an expense', () => {
	const expense = {
		id: 999,
		description: 'water bill',
		note: '',
		amount: 258900,
		createdAt: 0
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([...expenses, expense])
})

test('should edit expense by id', () => {
	const description = 'candy'
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			description
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state[0].description).toBe(description)
})

test('should not edit expense if id not found', () => {
	const description = 'candy'
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1 abc -9',
		updates: {
			description
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]			// Set to just 1 expense
	}
	const state = expensesReducer(expenses, action)			// Start with all expenses
	expect(state).toEqual([expenses[1]])
})