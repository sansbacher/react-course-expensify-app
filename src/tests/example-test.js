// Jest provides test() as a global. BUT can use this to help VSCode out:
// var {expect, test} = require('@jest/globals')		// With node
import {expect, test} from '@jest/globals'				// With React/Browser
// NOTE: To be found by Jest the file needs to be called SOMETHING.test.JS

const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`

test('should add 2 numbers', () => {
	const result = add(3, 4)
	expect(result).toBe(7)
})

test('should greet by name', () => {
	const result = generateGreeting('Jane')
	expect(result).toBe('Hello Jane!')
})

test('should greet without name', () => {
	const result = generateGreeting()
	expect(result).toBe('Hello Anonymous!')
})