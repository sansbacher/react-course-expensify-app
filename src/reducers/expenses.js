
const expensesReducerDefaultState = []

// Was: expensesReducer()
export default (state = expensesReducerDefaultState, action) => {			// For this reducer state is JUST the array (not the whole combinedState)
	switch (action.type) {
		case 'ADD_EXPENSE':
			// return state.concat(action.expense);			// state.push() would change the state. concat() returns a new array.
			return [...state, action.expense];				// Or we can use spread operator, returning a new array with the existing state + new item
		case 'REMOVE_EXPENSE': 
			return state.filter(expense => expense.id !== action.id)
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,							// spread existing expense
						...action.updates					// plus any updates
					};
				} else {
					return expense;
				}
			})
		default:
			return state;
	}
}
