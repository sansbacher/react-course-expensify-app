// Must be in a folder called: __mocks__

import {jest} from '@jest/globals'				// To keep VSCode/ESLint happy, but jest is an automatic global for all test.js files
const moment = jest.requireActual('moment')		// The _actual/real_ moment() module

// will be the mocked moment() function. Defaults to 0 (ie. Jan 1, 1970) if no timestamp provided, instead of "today/now"
export default (timestamp = 0) => {
	return moment(timestamp)					// The actual moment() function
}