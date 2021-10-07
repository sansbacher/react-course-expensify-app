import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import numeral from 'numeral'
import selectExpenses from '../selectors/expenses'
import selectExpenseTotal from '../selectors/expenses-total'

// Named export for testing purposes with Jest
export const ExpensesSummary = ({allExpensesCount, expensesCount, expensesTotal}) => {
	const hiddenExpensesCount = allExpensesCount - expensesCount
	const hiddenExpensesWord = hiddenExpensesCount === 1 ? 'expense' : 'expenses'
	const expenseWord = expensesCount === 1 ? 'expense' : 'expenses'
	const formattedTotal = numeral(expensesTotal / 100).format('$0,0.00')

	return (
		<div className="page-header">
			<div className="content-container">
				<h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedTotal}</span></h1>
				{hiddenExpensesCount !== 0 && <p className="page-header__message">With {hiddenExpensesCount} {hiddenExpensesWord} not shown due to current filters</p>}
				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	const allExpensesCount = state.expenses.length
	const visibleExpenses = selectExpenses(state.expenses, state.filters)
	
	return {
		allExpensesCount,
		expensesCount: visibleExpenses.length,
		expensesTotal: selectExpenseTotal(visibleExpenses)
	};
}

export default connect(mapStateToProps)(ExpensesSummary);