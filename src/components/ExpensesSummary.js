import React from 'react'
import {connect} from 'react-redux'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpenseTotal from '../selectors/expenses-total'

// Named export for testing purposes with Jest
export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
	const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00')

	return (
		<div>
			<h1>Viewing {expensesCount} {expenseWord} totalling {formattedTotal}</h1>
		</div>
	)
}

const mapStateToProps = (state) => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters)
	
	return {
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpenseTotal(visibleExpenses)
	};
}

export default connect(mapStateToProps)(ExpensesSummary);