// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from '../../components/NotFoundPage'

test('should render NotFoundPage correctly', () => {
	const wrapper = shallow(<NotFoundPage />)
	expect(wrapper).toMatchSnapshot()
})
