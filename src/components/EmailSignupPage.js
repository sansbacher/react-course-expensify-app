import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {startEmailSignup} from '../actions/auth'

export class EmailSignupPage extends React.Component {
	// Local state for this form
	state = {
		email: '',
		password1: '',
		password2: '',
		error: undefined,
		passwordScore: 0
	}

	getPasswordScore = (password) => {
		// Scores how strong a password is, from 0 - 5; with 3 being being "sufficient"
		const regexTests = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^a-zA-Z0-9]/]		// Regex's for numbers, lowercase, uppercase, symbols (non-numbers/letters)

		if (password.length === 0 ) {
			return 0;
		} else if (password.length < 3) {
			return 1;
		}

		let score = 0
		regexTests.forEach((re) => {
			re.test(password) && score++
		})

		if (password.length < 6) { 
			return Math.min(2, score);
		} else if (password.length < 8) {
			return Math.min(3, score);
		} else if (password.length < 11) {
			return score;
		} else {
			return score + 1;		// 12 or more characters gets a +1
		}
	}
	getProgressBarColor = (value) => {
		// For dynamic CSS styles based on the progress bar's value. Working with a 0 - 5 point range
		if (value <= 2) {
			return 'form__progress-bar--red';
		} else if (value < 4) {
			return 'form__progress-bar--orange';
		} else {
			return 'form__progress-bar--green';
		}
	}

	onEmailChange = (event) => {
		const email = event.target.value
		this.setState({ email })
	}
	onPassword1Change = (event) => {
		const password1 = event.target.value
		const passwordScore = this.getPasswordScore(password1)
		this.setState({ password1, passwordScore })
	}
	onPassword2Change = (event) => {
		const password2 = event.target.value
		this.setState({ password2 })
	}
	onSubmit = (event) => {
		event.preventDefault()
		// Firebase confirms it's a valid-looking email address for us, and rejects passwords less than 6 chars
		if (!this.state.email || !this.state.password1) {
			this.setState({ error: 'Please provide an Email Address and Password.' })
		} else if (this.state.password1 !== this.state.password2) {
			this.setState({ error: 'Passwords do not match.' })
		} else if (this.state.password1.length < 5) {
			this.setState({ error: 'Password must be at least 6 characters, but longer is better.' })
		} else if (this.state.passwordScore < 3) {
			this.setState({ error: 'Strong passwords need a mix of Letters, Numbers, and Symbols.' })
		} else {
			this.props.startEmailSignup(this.state.email, this.state.password1).catch(({message}) => {
				this.setState({	error: message })
			})
		}
	}

	render() {
		return (
			<div className="box-layout">
				<div className="box-layout__box">
					<h1 className="box-layout__title">Signup for Expensify!</h1>
					<p>Enter your email address and pick a strong password</p>
					<div>
						<hr />
						<form className="form" onSubmit={this.onSubmit}>
							{this.state.error && <p className="form__error">{this.state.error}</p>}
							<input
								type="text"
								className="text-input input--grey-focus"
								placeholder="Email address"
								autoFocus
								value={this.state.email}
								onChange={this.onEmailChange}
							/>
							<input
								type="password"
								className="text-input input--grey-focus text-input--no-bottom-margin"
								placeholder="Password"
								value={this.state.password1}
								onChange={this.onPassword1Change}
							/>
							<progress
								max="5"
								value={this.state.passwordScore}
								className={`form__progress-bar ${this.getProgressBarColor(this.state.passwordScore)}`}
							/>
							<input
								type="password"
								className="text-input input--grey-focus"
								placeholder="Confirm password"
								value={this.state.password2}
								onChange={this.onPassword2Change}
							/>
							<div><button className="button input--grey-focus">Sign Up</button></div>
						</form>
						<p>Already have an Account? <Link to="/" className="input--grey-focus">Log in!</Link></p>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	startEmailSignup: (email, password) => dispatch(startEmailSignup(email, password))
})

// No/undefined mapStateToProps, just mapDispatchToProps
export default connect(undefined, mapDispatchToProps)(EmailSignupPage);
