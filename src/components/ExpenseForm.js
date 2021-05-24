import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'		// Also requires moment

// This Component will be used for both Adding and Editing expenses
// Expects props: expense={an-expense-object}
export default class ExpenseForm extends React.Component {
	// Need an explicit constructor() so we can get access to props
	constructor(props) {
		super(props)
		// Local Component state, track Form values, only when Submitted will it go into Redux
		this.state = {
			description: props.expense ? props.expense.description : '',
			note: props.expense ? props.expense.note : '',
			amount: props.expense ? (props.expense.amount / 100).toString() : '',		// This Component expects a currency string
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,			// Show the Date Picker or not (changes when clicked via onFocusChange)
			error: ''
		}
	}
	onDescriptionChange = (event) => {
		// Because setState() is async and uses a callback can't do: {description: event.target.value}, would need to event.persist() first
		const description = event.target.value
		this.setState(() => ({ description }))
	}
	onNoteChange = (event) => {
		const note = event.target.value
		this.setState(() => ({ note }))
	}
	onAmountChange = (event) => {
		// Because INPUT type number allows any number of digits after a decimal we'll use type text and enforce currency there
		const amount = event.target.value
		// regex: any number of digits, an optional period and up to 2 more digits
		// This will enforce validation because State isn't updated unless it matches, and the value= always sets it to current state
		if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
			this.setState(() => ({ amount }))
		}
	}
	onDateChange = (createdAt) => {
		if (createdAt) {
			this.setState(() => ({ createdAt }))
		}
	}
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }))
	}
	onSubmit = (event) => {
		event.preventDefault()
		if (!this.state.description || !this.state.amount) {
			this.setState({ error: 'Please provide a description and amount.'})
		} else {
			this.setState({error: ''})
			this.props.onSubmit({						// Passed in via props from caller
				description: this.state.description,
				amount: Math.round(parseFloat(this.state.amount, 10) * 100),			// Amount in cents
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			})
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.onSubmit}>
					<input type="text"
						placeholder="Description"
						autoFocus
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input type="text"
						placeholder="Amount"
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						id="expense-form-picker"
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>
					<textarea
						placeholder="Add a note for your expense (optional)"
						value={this.state.note}
						onChange={this.onNoteChange}
					>
					</textarea>
					<button>{this.props.expense ? 'Edit Expense' : 'Add Expense'}</button>
				</form>
			</div>
		)
	}
}
