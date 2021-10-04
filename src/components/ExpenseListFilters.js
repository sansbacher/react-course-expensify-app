import React from 'react'
import {connect} from 'react-redux'
import {DateRangePicker} from 'react-dates'
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../actions/filters'

// Exported for testing
export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	}
	onDatesChange = ({startDate, endDate})=> {		// Object with {startDate, endDate} provided by react-dates
		// OLD way, before using mapDispatchToProps: this.props.dispatch(setStartDate(startDate))
		this.props.setStartDate(startDate)			// NEW way, custom prop with dispatch() baked in
		this.props.setEndDate(endDate)
	}
	onFocusChange = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }))
	}
	onTextChange = (event) => {
		// State/Component stay in sync with Controlled Inputs because:
		// value=props.something will always show the current state's value, onChange=dispatch(someAction()) ensures changes go back the state
		this.props.setTextFilter(event.target.value)
	}
	onSortChange = (event) => {
		if (event.target.value === 'date') {
			this.props.sortByDate()
		} else if (event.target.value === 'amount') {
			this.props.sortByAmount()
		}
	}
	render() {
		return (
			<div className="content-container">
				{/* These are Controlled Inputs, values are all controlled by Javascript/React. Uncontrolled would mean values in the DOM */}
				{/* onChange is called every time the INPUT changes, a connect()'ed Component also receives dispatch() passed on props,
					so we can dispatch a Redux action inside any connected Component */}
				<div className="input-group">
					<div className="input-group__item">
						<input
							type="text"
							placeholder="Search expenses"
							className="text-input"
							value={this.props.filters.text}
							onChange={this.onTextChange}
						/>
					</div>
					<div className="input-group__item">
						<select
							className="select"
							value={this.props.filters.sortBy}
							onChange={this.onSortChange}
						>	
							<option value="date">Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="input-group__item">
						<DateRangePicker
							startDate={this.props.filters.startDate}
							startDateId="expense-filter-picker-start"
							endDate={this.props.filters.endDate}
							endDateId="expense-filter-picker-end"
							onDatesChange={this.onDatesChange}
							focusedInput={this.state.calendarFocused}
							onFocusChange={this.onFocusChange}
							showClearDates={true}
							numberOfMonths={1}
							isOutsideRange={() => false}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// Arrow function that implicitly returns an object, same as: funcName = (arg) => {return {property: arg}; }
// .dispatch() is also added to the returned state
const mapStateToProps = state => ({
	filters: state.filters
});

// So we can pull props.dispatch(...) calls out of the Component and make props that the functions with dispatch() baked in
const mapDispatchToProps = dispatch => ({
	setTextFilter: text => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount()),
	setStartDate: startDate => dispatch(setStartDate(startDate)),
	setEndDate: endDate => dispatch(setEndDate(endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);