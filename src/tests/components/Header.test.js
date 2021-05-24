// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'										// For React testing with Jest (saves JSON snapshots of Components)
// import toJSON from 'enzyme-to-json'									// Not needed now, specified in jest.config.json
// import ReactShallowRenderer from 'react-test-renderer/shallow'		// Not needed with Enzyme
import Header from '../../components/Header'

test('should render Header correctly', () => {
	// const renderer = new ReactShallowRenderer()					// react-test-renderer method, old/very basic.
	// renderer.render(<Header />)
	// expect(renderer.getRenderOutput()).toMatchSnapshot()

	const wrapper = shallow(<Header />)
	// expect(wrapper.find('h1').length).toBe(1)					// Examples, using .find() is like using .querySelector()
	// expect(wrapper.find('h1').text()).toBe('Expensify')

	// expect(toJSON(wrapper)).toMatchSnapshot()					// toJSON() is automatic via jest.config.json now
	expect(wrapper).toMatchSnapshot()								// Snapshot is saved to __snapshots__/ folder as *.snap. Jest warns when it changes
})