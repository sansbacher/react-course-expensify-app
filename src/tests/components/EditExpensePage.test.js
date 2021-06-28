// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest, beforeEach} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

// Reuse these before running each Test
let startEditExpense, startRemoveExpense, history, expense, wrapper;
beforeEach(() => {
	expense = expenses[2]					// The expense we'll test with
	startEditExpense = jest.fn()					// Fake functions for our Component
	startRemoveExpense = jest.fn()
	history = { push: jest.fn() }			// We need to be able to call history.push()
	// Manually add the props needed by this Component
	wrapper = shallow(
		<EditExpensePage
			expense={expense}
			startEditExpense={startEditExpense}
			startRemoveExpense={startRemoveExpense}
			history={history} 
		/>
	)
})

test('should render EditExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should handle startEditExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expense)							// Call the function returned from the prop (as need to pass an arg)
	expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense)			// Only testing that the function is called correctly, not that it works (that would be under tests/reducers )
	expect(history.push).toHaveBeenLastCalledWith('/')
})

test('should handle startRemoveExpense', () => {
	wrapper.find('button').simulate('click')							// Could do: .prop('onClick')()
	expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expense.id})
	expect(history.push).toHaveBeenLastCalledWith('/')
})