import moment from 'moment'

export default [{
	id: "0",
	description: 'gum',
	note: '',
	amount: 195,
	createdAt: 0
}, {
	id: "1",
	description: 'rent',
	note: '',
	amount: 109500,
	createdAt: moment(0).subtract(4, 'days').valueOf()			// Need to get back a number
}, {
	id: "2",
	description: 'credit card',
	note: '',
	amount: 4500,
	createdAt: moment(0).add(4, 'days').valueOf()
}]