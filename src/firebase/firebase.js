// import firebase from 'firebase'				// Firebase 8 has a default ES6 export now. DEV package/method!
import firebase from 'firebase/app'				// PRODUCTION way of doing things
import 'firebase/auth'
import 'firebase/database'
// import "firebase/analytics"					// Not used

// From: https://console.firebase.google.com/project/expensify-4d470/settings/general/

// This is for the Firebase REALTIME Database

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {										// Values from .env.test or .env.development (via webpack), or Heroku for Production
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()						// Throws an error in Chrome, may be blocked by some extension?

// https://firebase.google.com/docs/reference/js/firebase.database
const database = firebase.database()

export {firebase, database as default};

/**	EXAMPLES:
	// https://firebase.google.com/docs/reference/js/firebase.database.Database#ref
	//
	// NOTE: Firebase does NOT natively support arrays like this (three:) -- will just become an object like {'0': 'a', '1': 'b', '2': 'c'}
	// Do NOT store Arrays in Firebase - see below sections
	database.ref().set({
		one: 1, two: 'two', three: ['a', 'b', 'c'], four: 4.4, five: true, six: { muffins: 'buttons'}
	})
	// https://firebase.google.com/docs/reference/js/firebase.database.Reference#set
	database.ref().set('This is my data')				// Overwrites the entire dataset with the string (because same .ref())
	
*/

/**
	// Does NOT work as expected (but no error) - results in: notes: { '0': {id:, title:, body:}, '1': {id:, title:, body:} }
	// See below for how to do it properly
	const notes = [{
		id: '12',
		title: 'First note',
		body: 'this is my note'
	}, {
		id: '761ase',
		title: 'Another note',
		body: 'this is my note that is even better!'
	}]
	database.ref('notes').set(notes)
	
*/

/**
	// EXAMPLE: How Firebase stores arrays - illustrated:
	const firebaseNotes = {
		notes: {
			-Msdfdsafvg: {				// Random unique ID, generated by Firebase
				title: 'First note',
				body: 'this is my note'
			},
			-Mdfvlkjdbfv: {
				title: 'Another note',
				body: 'this is my note that is even better!'
			}
		}
	}
	
	// Pushing a single "array" element
	database.ref('notes').push({
		title: 'Course Topics',
		body: 'React, Angular, Vue'
	})
	// Can update/remove, etc
	database.ref('notes/-McBeEJgRElvVQ9HWJ-v').update({body: 'Buy Food'})
	database.ref('notes/-McBeEJgRElvVQ9HWJ-v').remove()
*/

/**
	// Working with Firebase Array like objects:
	database.ref('expenses').push({
		description: 'Rent',
		note: '',
		amount: 110000,
		createdAt: 1630389600000
	})
	
	const snapshotToArray = (snapshot) => {
		const expenses = []
		snapshot.forEach((childSnapshot) => {
			expenses.push({
				id: childSnapshot.key,				// Returns the key pointed to (which is the childSnapShot - the random string)
				...childSnapshot.val()				// Add all the other values
			})
		})
		return expenses;
	}
	
	database.ref('expenses')
		.once('value')
		.then((snapshot) => {
			const expenses = snapshotToArray(snapshot)
			console.log(expenses);
		})
	
	database.ref('expenses')
		.on('value', (snapshot) => {
			console.log(snapshotToArray(snapshot));
		})
	
	database.ref('expenses').on('child_removed', (snapshot) => {
		console.log('child was removed:', snapshot.key, snapshot.val());
	})
	
	database.ref('expenses').on('child_changed', (snapshot) => {
		console.log('child changed:', snapshot.key, snapshot.val());
	})
	
	database.ref('expenses').on('child_added', (snapshot) => {				// Includes ALL existing data, and NEW ones added
		console.log('child added:', snapshot.key, snapshot.val());
	})
*/


/**	STORING regular data:
	database.ref().set({								// .ref() = reference to root of the dataset.
		name: 'Saul A',
		age: 44,
		stressLevel: 6,
		isSingle: false,
		dreamJob: 'Ice cream man',
		job: {
			title: 'Software Developer',
			company: 'Google'
		},
		location: {
			city: 'Calgary',
			country: 'Canada'
		}
	}).then(() => {										//  .set() returns a promise
		console.log('Initial data has been saved!');
	}).catch((err) => {
		console.log('Initial data failed:', err);
	})

	// REMOVE something
	database.ref('isSingle')						// Remove something
		.remove()
		.then(() => {
			console.log('Data was removed');
		})
		.catch((err) => {
			console.log('Removal failed:', err);
		})
	
	database.ref('isSingle').set(null)				// Alternate way to remove

	// SET and UPDATE something:
	database.ref('age').set(45)							// Updates just the age property
	database.ref('location/city').set('Edmonton')		// Updates a nested property
	
	database.ref('attributes').set({					// Adds a new property (by updating something that doesn't exist)
		height: 177,
		weight: 72
	}).then(() => {
		console.log('Additional data has been added!');
	}).catch((err) => {
		console.log('Additional data failed:', err);
	})
	
	database.ref().update({				// Update multiple properties at once (does not replace all data), must pass in an Object
		name: 'Mike',					// (location will be left alone)
		age: 29,
		isSingle: null,					// Can also delete something
		dreamJob: 'Software Dev'		// Adding this new one
	})
	
	database.ref().update({
		dreamJob: 'Manager',
		// location: {							// Updates at root level, so "updating" location will overwrite the whole sub-object (country is deleted)
		// 	city: 'Vancouver'
		// }
		'location/city': 'Vancouver'			// BUT can update just one nested sub-property by specifying the 'full path' with forward/slash (leaves country)
	})	
	
	database.ref().update({							// Also returns a promise
		stressLevel: 9,
		'job/company': 'Amazon',
		'location/city': 'Toronto'
	})
*/

/** GETTING data:
	database.ref()							// Can also .ref('location') or .ref('location/city')
		.once('value')						// Get the data ONCE, as it is now - succeeds or fails, no notification if data changes
		.then((snapshot) => {
			const val = snapshot.val()		// val will be the object of the data in database val = {name: ..., age: ..., etc: ...}
			console.log(val);
		})
		.catch((err) => {
			console.log('Error getting data:', err);
		})
*/

/**
	// Subscribe to data - on() returns the callback function too (used to un-sub)
	const onValueChange = database.ref()
		.on('value', (snapshot) => {			// Get the data every time it changes. Call with callback - which is called whenever data is changed
			console.log(snapshot.val());
		}, (err) => {							// Error callback if there's a problem with the data or doesn't exist
			console.log('Error with data fetching:', err);
		})
	
	setTimeout(() => {
		database.ref('age').set(51)
	}, 3500)
	
	setTimeout(() => {
		database.ref('age').off()									// Unsubscribe to all subs at this ref
		database.ref('age').off('value', onValueChange)				// Unsubscribe to only this 'value' subscription on the ref
	}, 7000)
	
	setTimeout(() => {
		database.ref('age').set(55)
	}, 10500)
*/

/**
	const onValueChange2 = database.ref()
		.on('value', (snapshot) => {
			const val = snapshot.val()
			console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`);
	
		}, (err) => {
			console.log('Some error getting data:', err);
		})
	
	setTimeout(() => {
		database.ref().update({
			name: 'Mike B.',
			'job/title': 'Manager'
		})
		database.ref().off('value', onValueChange2)		// Stop getting updates
	}, 2500)
	
*/