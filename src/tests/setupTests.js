// This file is used by Enzyme for React testing with Jest
// Called via jest.config.json

import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'				// Unofficial React v17 Enzyme Adapter
import DotEnv from 'dotenv'

DotEnv.config({ path: '.env.test' })									// Read in the .env.test file and add all the environment variables

Enzyme.configure({ adapter: new Adapter() })