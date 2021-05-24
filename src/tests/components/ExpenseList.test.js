// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseList } from '../../components/ExpenseList'			// Need the UN-Connected 'raw' Component for Testing (we'll pass in dummy prop data)
import expenses from '../fixtures/expenses'							// Common dummy data

test('should render ExpenseList with expenses', () => {
	const wrapper = shallow(<ExpenseList expenses={expenses} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseList with empty message', () => {
	const wrapper = shallow(<ExpenseList expenses={[]} />)
	expect(wrapper).toMatchSnapshot()
})