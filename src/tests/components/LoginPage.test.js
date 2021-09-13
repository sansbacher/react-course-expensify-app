// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import {LoginPage} from '../../components/LoginPage'

test('should render LoginPage correctly', () => {
	const wrapper = shallow(<LoginPage startLogin={() => {}} />)			// Pass in a dummy function for startLogin()
	expect(wrapper).toMatchSnapshot()
})

test('should call startLogin on button click', () => {
	const startLoginSpy = jest.fn()											// Create a fake function that we can pass to Components and test if it was called
	const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />)		// Pass in props of a fake expense and the fake callback function
	wrapper.find('button').simulate('click')
	// "spy" on if our fake function was called correctly
	expect(startLoginSpy).toHaveBeenCalled()								// See if it was called
})