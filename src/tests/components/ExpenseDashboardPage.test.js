// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage'

test('should render ExpenseDashboardPage correctly', () => {
	const wrapper = shallow(<ExpenseDashboardPage />)
	expect(wrapper).toMatchSnapshot()
})
