// This file is used by Enzyme for React testing with Jest
// Called via jest.config.json

import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'				// Unofficial React v17 Enzyme Adapter

Enzyme.configure({ adapter: new Adapter() })