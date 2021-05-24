// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest, beforeEach} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

// Reuse these before running each Test
let addExpense, history, wrapper;
beforeEach(() => {
	addExpense = jest.fn()				// Fake functions for our Component
	history = { push: jest.fn() }		// We need to be able to call history.push()
	wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />)		// Manually add the props needed by this Component
})

test('should render AddExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should handle onSubmit', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
	expect(addExpense).toHaveBeenLastCalledWith(expenses[1])				// These are the functions called within AddExpensePage's callback
	expect(history.push).toHaveBeenLastCalledWith('/')
})
