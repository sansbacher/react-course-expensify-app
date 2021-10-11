// Reducers actually change the state of the Redux store, when an Action instructs Redux to do so

export default (state = {}, action) => {				// Provide the default state for the reducer
	switch (action.type) {
		case 'LOGIN':
			return {
				uid: action.uid
			};
		case 'LOGOUT':
			return {};
		default:
			return state;								// Doesn't care about any other actions
	}
}