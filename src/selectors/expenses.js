import moment from 'moment'

// Was: getVisibleExpenses()
export default (expenses, {text, sortBy, startDate, endDate}) => {
	// Filter by Text acts on Description
	// Filter by Date acts on createdAt
	// Sort by date = most recent expense first
	// Sort by amount = largest expense first
	return expenses.filter((expense) => {
		const createdAtMoment = moment(expense.createdAt)
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true							// If no startDate then true, to not filter on it
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
		const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

		return startDateMatch && endDateMatch && textMatch;
	}).sort((a, b) => {											// Compare function: -1 if a before b, 1 if a after b, 0 if a == b (same)
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;			// Most recent expense first
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;				// Largest expense first
		}
	});
} 