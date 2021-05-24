// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest, beforeEach} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

// Reuse these before running each Test
let editExpense, removeExpense, history, expense, wrapper;
beforeEach(() => {
	expense = expenses[2]					// The expense we'll test with
	editExpense = jest.fn()					// Fake functions for our Component
	removeExpense = jest.fn()
	history = { push: jest.fn() }			// We need to be able to call history.push()
	wrapper = shallow(<EditExpensePage expense={expense} editExpense={editExpense} removeExpense={removeExpense} history={history} />)		// Manually add the props needed by this Component
})

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should handle editExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expense)						// Call the function returned from the prop (as need to pass an arg)
	expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense)			// Only testing that the function is called correctly, not that it works (that would be under tests/reducers )
	expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should handle removeExpense', () => {
	wrapper.find('button').simulate('click')							// Could do: .prop('onClick')()
	expect(removeExpense).toHaveBeenLastCalledWith({id: expense.id})
	expect(history.push).toHaveBeenLastCalledWith('/')
})