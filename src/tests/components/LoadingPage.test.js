// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import LoadingPage from '../../components/LoadingPage'

test('should render LoadingPage correctly', () => {
	const wrapper = shallow(<LoadingPage />)
	expect(wrapper).toMatchSnapshot()
})
