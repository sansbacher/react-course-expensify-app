const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('this is success')
		// reject('some error happened')
	}, 1500)
})

console.log('before');

promise.then((data) => {
	console.log('1', data);
	
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('This is another promise!')
		}, 1500)
	})
}).then((str) => {
	console.log('does this run?', str);
}).catch((error) => {
	console.log('error: ', error);
})

console.log('after');