// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {EmailSignupPage} from '../../components/EmailSignupPage'

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<EmailSignupPage startEmailSignup={() => {}} />)			// Pass in a dummy function for startEmailSignup()
	expect(wrapper).toMatchSnapshot()
})