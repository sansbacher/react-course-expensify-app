// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {LoginPage} from '../../components/LoginPage'

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<LoginPage startGoogleLogin={() => {}} />)			// Pass in a dummy function for startLogin(), not passing in the other startXXXLogins or testing them
	expect(wrapper).toMatchSnapshot()
})

test('should call startLogin on Google Login button click', () => {
	const startLoginSpy = jest.fn()												// Create a fake function that we can pass to Components and test if it was called
	const wrapper = shallow(<LoginPage startGoogleLogin={startLoginSpy} />)		// Pass in props of a fake expense and the fake callback function
	wrapper.find('button').at(0).simulate('click')								// Find the first button, which is the Google Login one
	// "spy" on our fake function to see if it was called correctly
	expect(startLoginSpy).toHaveBeenCalled()									// See if it was called
})