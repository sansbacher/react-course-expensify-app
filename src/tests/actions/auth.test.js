// Jest provides test() as a global. BUT can use this to help VSCode out:
// var {expect, test} = require('@jest/globals')		// With node
import {expect, test} from '@jest/globals'				// With React/Browser

import {login, logout} from '../../actions/auth'

test('should generate login action object', () => {
	const action = login('123abc')						// Pass in a uid
	expect(action).toEqual({
		type: 'LOGIN',
		uid: '123abc'
	})
})

test('should generate logout action object', () => {
	const action = logout()
	expect(action).toEqual({
		type: 'LOGOUT'
	})
})

