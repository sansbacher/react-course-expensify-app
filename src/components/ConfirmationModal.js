import React from 'react'
import Modal from 'react-modal'

// Tell React-Modal what element (our root div) to hide when displaying the modal for assistive readers:
// http://reactcommunity.org/react-modal/accessibility/
if (process.env.NODE_ENV !== 'test') {						// To avoid errors when testing with Jest: https://github.com/reactjs/react-modal/issues/632
	Modal.setAppElement('#app')
}

const ConfirmationModal = props => (
	<Modal
		isOpen={props.showConfirmation}
		contentLabel="Confirm Remove"
		closeTimeoutMS={150}
		className="modal"
	>
		<h3 className="modal__title">Remove Expense?</h3>
		<p className="modal__body">Are you sure you want to remove this Expense:</p>
		<p className="modal__body--message">{props.expenseDescription}</p>
		<div>
			<button className="button" onClick={props.handleRemove}>Remove</button>
			<button className="button button--secondary" onClick={props.handleCancel}>Cancel</button>
		</div>
	</Modal>
)

export default ConfirmationModal;