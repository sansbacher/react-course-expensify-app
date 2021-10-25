// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {EmailSignupPage} from '../../components/EmailSignupPage'

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<EmailSignupPage startEmailSignup={() => {}} />)			// Pass in a dummy function for startEmailSignup()
	expect(wrapper).toMatchSnapshot()
})

test('should call startEmailSignup on Sign up button click', () => {
	const startEmailSignup = jest.fn(() => Promise.resolve())	// Needs to return a Promise so the .catch() doesn't get called
	const wrapper = shallow(<EmailSignupPage startEmailSignup={startEmailSignup} />)
	wrapper.find('input').at(0).simulate('change', {			// Email Address
		target: {value: 'someone@domain.ca'}
	})
	wrapper.find('input').at(1).simulate('change', {			// Password
		target: {value: 'Password!'}
	})
	wrapper.find('input').at(2).simulate('change', {			// Confirm Password
		target: {value: 'Password!'}
	})
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}								// Fake event.preventDefault()
	})
	// "spy" on our fake function to see if it was called correctly
	expect(startEmailSignup).toHaveBeenCalled()
})