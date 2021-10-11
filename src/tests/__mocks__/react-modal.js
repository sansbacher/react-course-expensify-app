// Must be in a folder called: __mocks__

import {jest} from '@jest/globals'				// To keep VSCode/ESLint happy, but jest is an automatic global for all test.js files
const Modal = jest.requireActual('react-modal')

const oldFn = Modal.setAppElement					// This is from: https://github.com/reactjs/react-modal/issues/632
Modal.setAppElement = (element) => {
	return oldFn(document.createElement('div'));	// Basically .setAppElement() is overridden to always run the original function with a newly created DIV
}

module.exports = Modal;								// Rest of the Component is returned as-is (except over overridden function)

// Alternative method was to wrap Modal.setAppElement() in the real ConfirmationModal.js file with a NODE_ENV test:
/**
	if (process.env.NODE_ENV !== 'test') {
		Modal.setAppElement('#app')
	}
*/