// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test} from '@jest/globals'				// With React/Browser

import authReducer from '../../reducers/auth'

/** This works, but isn't in the videos - keeping the Test case count the same. (optional)
	test('should set up default auth value', () => {
		const state = authReducer(undefined, { type: '@@INIT' })			// Initialization Action Redux passes to a store on first load
		expect(state).toEqual({})
	})
*/

test('should set uid for login', () => {
	const state = authReducer({}, { type: 'LOGIN', uid: 'abc123' })				// Pass in state and action
	expect(state.uid).toBe('abc123')
})

test('should clear uid for logout', () => {
	const state = authReducer({uid: 'previous uid'}, { type: 'LOGOUT' })
	expect(state).toEqual({})
})
