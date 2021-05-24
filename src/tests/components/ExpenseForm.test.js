// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest} from '@jest/globals'				// With React/Browser
// To jest.config.json add:		"collectCoverage": true 		To show code coverage

import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'				// Fake expense data

test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />)			// Will use our mocked moment() internally
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseForm with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[1]} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()					// Before snapshot
	// Find something with in the wrapper Component (ID, Class, Tag, etc), then simulate an action; 2nd arg is fake 'event' arg passed to onSubmit
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}					// Fake event.preventDefault()
	})
	// console.log(wrapper.state('error'));			// Would be our {error: 'message'} for nothing submitted
	expect(wrapper.state('error').length).toBeGreaterThan(0)			// Access the 'error' property of State
	expect(wrapper).toMatchSnapshot()				// After snapshot
})

test('should set description on input change', () => {
	const value = 'New Description'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(0).simulate('change', {			// if .find() returns more than 1 item, use .at() to select which one
		target: { value }										// Because normally onDescriptionChange looks at event.target.value
	})
	expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
	const value = 'Some new note'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('textarea').simulate('change', {
		target: { value }										// onNoteChange requires event.target.value
	})
	expect(wrapper.state('note')).toBe(value)
})

test('should set amount if valid input', () => {
	const value = '23.50'
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(1).simulate('change', {			// Amount is 2nd INPUT field
		target: { value }
	})
	expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount if invalid input', () => {
	const value = '12.122'		// 3 decimal places won't be matched by regex
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('input').at(1).simulate('change', {			// Amount is 2nd INPUT field
		target: { value }
	})
	expect(wrapper.state('amount')).toBe('')					// Default empty string as nothing passed in
})

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn()						// Create a fake function that we can pass to Components and test if it was called
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)		// Pass in props of a fake expense and the fake callback function
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}								// Fake event.preventDefault()
	})
	expect(wrapper.state('error')).toBe('')
	// "spy" on if our fake function was called correctly
	expect(onSubmitSpy).toHaveBeenLastCalledWith({				// Pass in the fake data to be checked, minus the 'id' field
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	})
})

test('should set new date on date change', () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm />)
	// 'withStyles(SingleDatePicker)' is the name of the Component, as seen in the snapshot. Then access a single prop passed INTO a Component
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)		// .prop() returns the prop, a callback in this case, and invoke it
	expect(wrapper.state('createdAt')).toEqual(now)

})

test('should set focus on change', () => {
	const focused = true
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })			// Call resulting callback from the prop with an object
	expect(wrapper.state('calendarFocused')).toEqual(focused)
})