// Jest provides test() as a global. BUT can use this to help VSCode out:
import {expect, test, jest} from '@jest/globals'				// With React/Browser

import React from 'react'
import { shallow } from 'enzyme'
import ConfirmationModal from '../../components/ConfirmationModal'

test('should render ConfirmationModal correctly', () => {
	const wrapper = shallow(
		<ConfirmationModal
			showConfirmation={true}
			expenseDescription="Some dummy expense"
		>
			Some dummy model content
		</ConfirmationModal>
	)
	expect(wrapper).toMatchSnapshot()
})

test('should activate Remove correctly', () => {
	const handleRemove = jest.fn()
	// Not testing the handleCancel callback
	const wrapper = shallow(
		<ConfirmationModal
			showConfirmation={true}
			expenseDescription="Some dummy expense"
			handleRemove={handleRemove}
		>
			Some dummy model content
		</ConfirmationModal>
	)
	wrapper.find('button').at(0).simulate('click')
	expect(handleRemove).toHaveBeenCalled()
})
