// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {ExpensesSummary} from '../../components/ExpensesSummary'

test('should render ExpensesSummary with 1 expense, all', () => {
	// Just need to render the Component, the selectExpenses() function is tested under selectors
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={12300} allExpensesCount={1} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with multiple expenses, all', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={45600} allExpensesCount={2} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with 1 expense, filtered', () => {
	// Just need to render the Component, the selectExpenses() function is tested under selectors
	const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={65400} allExpensesCount={5} />)
	expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary with multiple expenses, filtered', () => {
	const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={78900} allExpensesCount={3} />)
	expect(wrapper).toMatchSnapshot()
})
