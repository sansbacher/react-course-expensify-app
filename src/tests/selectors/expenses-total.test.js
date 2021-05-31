// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
	expect(selectExpensesTotal([])).toBe(0)
})

test('should correctly add up a single expense', () => {
	const expense = expenses[1]
	expect(selectExpensesTotal([expense])).toBe(expense.amount)
})

test('should correctly add up multiple expenses', () => {
	expect(selectExpensesTotal(expenses)).toBe(114195)
})