import {createStore, combineReducers} from 'redux'
import {v4 as uuid} from 'uuid'						// NEW method, old was: import uuid from 'uuid  (no more default export)

const addExpense = (
	{
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
	} = {}
) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})
const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

const expensesReducerDefaultState = []
const expensesReducer = (state = expensesReducerDefaultState, action) => {			// For this reducer state is JUST the array (not the whole combinedState)
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

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
})
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
})
const sortByDate = () => ({
	type: 'SORT_BY_DATE'
})
const setStartDate = startDate => ({				// Default is undefined, no need to specify
	type: 'SET_START_DATE',
	startDate
})
const setEndDate = endDate => ({
	type: 'SET_END_DATE',
	endDate
})

const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {			// state is the filter state (an object), not the combined State
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount'
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date'
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate
			};
		default:
			return state;
	}
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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

const store = createStore(
	combineReducers({				// Pass in an object of key: reducerFunction. All Reducers will receive all Actions.
		expenses: expensesReducer,
		filters: filtersReducer
	})
)

// Testing:

// Shows a filtered view of the Store on any change
store.subscribe(() => {
	const state = store.getState()
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
	console.log(visibleExpenses);
})

// Some demo expenses:
const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100, createdAt: -21000}))			// Returns the Action Object {type:, expense:}
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: -1000}))

// Actions:
// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// Set Filters:
// store.dispatch(setTextFilter('rent'))
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))

// Pure model/example of what the Store will eventually look like:
const demoState = {
	expenses: [{
		id: '1543216105614afebd',
		description: 'January Rent',
		note: 'This is the final payment for that address',
		amount: 54500,				// In cents, $545.00
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', 		// date or amount
		startDate: undefined,
		endDate: undefined
	}
}
