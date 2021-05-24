import { createStore } from 'redux'

/*
	// OLD way using Component State
	this.setState((prevState) => {
		return prevState;			// Does nothing, just an example
	})
	
	// similar to NEW way with Redux:
	const store = createStore((state = { count: 0 }) => {		// pass in State, along with the Default State and value
		return state;				// No change to the state, example.
	})

*/

// Action Generators, return a function that return the Action Object. Avoids any typos and streamlines things
const incrementCount = ({incrementBy = 1} = {}) => ({			// Arrow function that just returns an object (which needs to be wraps in parens)
	type: 'INCREMENT',
	incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({		// Destructure the payload arg with a default value
	type: 'DECREMENT',
	decrementBy
})

const setCount = ({count} = {}) => ({
	type: 'SET',
	count
})

const resetCount = () => ({
	type: 'RESET'
})

// Reducers
// function: 1st arg is State, along with the Default State and value. 2nd is action, no default, to communicate with the store (passed by dispatch)
// Pure Function, output is only based on the input (current state + action). Only return a value, don't change anything else (esp. never change state or action)
const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'RESET':								// UPPER_SNAKE_CASE is convention
			return {
				count: 0							// Treat state as immutable, always return a new state, don't change it
			};
		case 'SET':
			return {
				count: action.count					// We should check that action.count is defined and a number (or else count: is undefined)
			};
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy				// Don't change the state value
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		default:
			return state;
	}
	
}

// pass in a reducer function
const store = createStore(countReducer);

// console.log(store.getState());			// get value of the State, returns {count: 0}

// Redux calls the function when the state changes
const unsubscribeFunc = store.subscribe(() => {				// Return value is a function, which can unsubscribe
	console.log(store.getState())
})


// WITHOUT Action Generators:
// store.dispatch({						// .dispatch() sends an action to the store
// 	type: 'INCREMENT',					// action objects MUST have a type: property
// 	incrementBy: 5						// Anything else is optional
// })
// unsubscribeFunc()

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(incrementCount())

store.dispatch(resetCount())
store.dispatch(decrementCount())
store.dispatch(decrementCount({	decrementBy: 10 }))
store.dispatch(setCount({count: 101}))