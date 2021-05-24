// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest, beforeEach} from '@jest/globals'				// With React/Browser


import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import {filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setStartDate = jest.fn()
	setEndDate = jest.fn()
	// We will over-ride filters={filters} to filters={altFilters} below, using setProps()
	wrapper = shallow(
		<ExpenseListFilters 
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	)
})

test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({								// Specify custom props for this run with shallow(), causes a re-render
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
	const value = 'rent'
	wrapper.find('input').simulate('change', {
		target: { value }										// onChange={onTextChange} requires event.target.value to call setTextFilter
	})
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
	const value = 'date'
	wrapper.setProps({										// altFilters has 'amount' as the default
		filters: altFilters
	})
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByDate).toHaveBeenCalled()
})

test('should sort by amount', () => {
	const value = 'amount'									// Default is date, so this will be a change
	wrapper.find('select').simulate('change', {
		target: { value }
	})
	expect(sortByAmount).toHaveBeenCalled()
})

test('should handle date changes', () => {
	const startDate = moment(0).add(4, 'years')
	const endDate = moment(0).add(8, 'years')
	// 'withStyles(DateRangePicker)' is the modern name of the Component
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate})			// Call the callback from props with the object it expects
	expect(setStartDate).toHaveBeenLastCalledWith(startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})

test('should handle date focus changes', () => {
	const calendarFocused = 'startDate'					// Possible values: null, startDate, endDate
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
})