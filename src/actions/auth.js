import {firebase, googleAuthProvider, githubAuthProvider} from '../firebase/firebase'

// Actions are requests that can be dispatched by Redux to do or store something, which is done by a Reducer

export const login = uid => ({					// The login() and logout() actions are generic and signify any-provider login/logout and stores the UID in the Redux store
	type: 'LOGIN',
	uid
})

// The startGoogleLogin() action initiates the Google login provider, and the end-result (being logged in) is caught in
// app.js via firebase.auth().onAuthStateChanged() which eventually dispatches login() to store the UID
export const startGoogleLogin = () => {
	// Return a function as per Redux-Thunk spec...
	return () => {
		// ... which returns the Promise to continue the Promise chain, so things can happen after login in app.js
		return firebase.auth().signInWithPopup(googleAuthProvider);			// Show a Google Auth popup, starts the auth process.
	};
}

// Similar to above but for GitHub
export const startGithubLogin = () => {
	// Return a function as per Redux-Thunk spec...
	return () => {
		// ... which returns the Promise to continue the Promise chain, so things can happen after login in app.js
		return firebase.auth().signInWithPopup(githubAuthProvider);			// This works even if they have a Google login since we've disabled "one account per email address" (https://firebase.google.com/docs/auth/web/github-auth?authuser=0#expandable-1)
		// If it was enabled (the default) then would need a .catch() on whatever dispatch()'d this. A .then() grab additional info, but app.js subscribes onAuthStateChanged so know as soon as Auth happens
		// Essentially: dispatch(startGithubLog()).catch( err => handle_error_here ) and dispatch/do something else. Async/Await doesn't work well in React Components.
	};
}

// This creates an email+pass login, AND if it succeeds also authenticates them - Email Signup
export const startEmailSignup = (email, password) => {
	return () => {
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}
}

// This just logs them in with email+pass
export const startEmailLogin = (email, password) => {
	return () => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}
}

export const logout = () => ({
	type: 'LOGOUT'
})

// The startLogout() action logs out any provider - and the end-result (being logged out) is caught in 
// app.js via firebase.auth().onAuthStateChanged() which eventually dispatches logout()
export const startLogout = () => {
	return () => {
		return firebase.auth().signOut();
	};
}