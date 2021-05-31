import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpenseTotal from '../selectors/expenses-total'

// Named export for testing purposes with Jest
export const ExpensesSummary = (props) => {
	return (
		<p>
			Viewing {props.expensesCount} {props.expensesCount === 1 ? 'expense' : 'expenses'} totalling {numeral(props.expensesTotal / 100).format('$0,0.00')}
		</p>
	)
}

const mapStateToProps = (state) => {
	const expenses = selectExpenses(state.expenses, state.filters)
	return {
		expensesCount: expenses.length,
		expensesTotal: selectExpenseTotal(expenses)
	};
}

export default connect(mapStateToProps)(ExpensesSummary);