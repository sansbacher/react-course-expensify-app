// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {ExpensesSummary} from '../../components/ExpensesSummary'

test('should render with 1 expense', () => {
	// Just need to render the Component, the selectExpenses() function is tested under selectors
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={12300}/>)
	expect(wrapper).toMatchSnapshot()
})

test('should render with multiple expenses', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={45600} />)
	expect(wrapper).toMatchSnapshot()
})