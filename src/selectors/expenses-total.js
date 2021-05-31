// Was: selectExpenseTotal()
export default (expenses) => {
	return expenses.reduce((acc, currExpense) => acc + currExpense.amount, 0);
}
