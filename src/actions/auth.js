import {firebase, googleAuthProvider} from '../firebase/firebase'

export const login = uid => ({
	type: 'LOGIN',
	uid
})

export const startLogin = () => {
	// Return a function as per Redux-Thunk spec...
	return () => {
		// ... which returns the Promise to continue the Promise chain. The below will cause a Google Auth popup, starts the auth process.
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
}

export const logout = () => ({
	type: 'LOGOUT'
})

export const startLogout = () => {
	return () => {
		return firebase.auth().signOut();
	};
}