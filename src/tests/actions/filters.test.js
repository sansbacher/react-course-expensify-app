// Jest provides test() as a global. BUT can use this to help VSCode out:
// var {expect, test} = require('@jest/globals')		// With node
import {expect, test} from '@jest/globals'				// With React/Browser
// NOTE: To be found by Jest the file needs to be called SOMETHING.test.JS

import moment from 'moment'
import {sortByDate, setTextFilter, setStartDate, setEndDate, sortByAmount} from '../../actions/filters'

test('should generate set start date action object', () => {
	const action = setStartDate(moment(0))
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	})
})

test('should generate set end date action object', () => {
	const action = setEndDate(moment(0))
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	})
})

test('should generate sort by date action object', () => {
	const action = 	sortByDate()
	expect(action).toEqual({
		type: 'SORT_BY_DATE'
	})
})

test('should generate sort by amount action object', () => {
	const action = sortByAmount()
	expect(action).toEqual({
		type: 'SORT_BY_AMOUNT'
	})
})

test('should generate set text file action object with a value', () => {
	const text = 'rent'
	const action = setTextFilter(text)
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text
	})
})

test('should generate set text file action object with no value', () => {
	const action = setTextFilter()
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	})
})