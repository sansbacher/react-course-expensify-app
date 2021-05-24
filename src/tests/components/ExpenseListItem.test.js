// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import ExpenseListItem from '../../components/ExpenseListItem'
import expenses from '../fixtures/expenses'

test('should render one ExpenseListItem', () => {
	// ExpenseListItem is called with {...expense} which JSX expands/spreads to property={value} for each property
	const expense = expenses[0]
	const wrapper = shallow(<ExpenseListItem {...expense} />)
	expect(wrapper).toMatchSnapshot()
})