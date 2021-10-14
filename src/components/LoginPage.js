import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

import {startGoogleLogin, startGithubLogin, startEmailLogin} from '../actions/auth'


export class LoginPage extends React.Component {
	// Local state for this form
	state = {
		email: '',
		password: '',
		error: undefined
	}

	handleGoogleLogin = () => {
		this.props.startGoogleLogin().catch(({ message, email }) => {
			this.setState({	error: message + (email ? ` (${email})` : '') })			// If they signup with Github before Google they can't login with Google too - unless we disable "one account per email address" 
		})
	}
	handleGithubLogin = () => {
		this.props.startGithubLogin().catch(({ message, email }) => {
			this.setState({	error: message + (email ? ` (${email})` : '') })
		})
	}
	onEmailChange = (event) => {
		// Because setState() is async and uses a callback can't do: {email: event.target.value}, would need to event.persist() first
		const email = event.target.value
		this.setState({ email })
	}
	onPasswordChange = (event) => {
		const password = event.target.value
		this.setState({ password })
	}
	onSubmit = (event) => {
		event.preventDefault()
		if (!this.state.email || !this.state.password) {
			this.setState({ error: 'Please provide an Email Address and Password.' })	
		} else {
			// startEmailLogin() calls dispatch() which returns a promise
			this.props.startEmailLogin(this.state.email, this.state.password).catch(({ message }) => {
				this.setState({	error: message })
			})
		}
	}

	render() {
		return (
			<div className="box-layout">
				<div className="box-layout__box box-layout__box--focus">
					<h1 className="box-layout__title">Expensify</h1>
					<p>It's time to get your expenses under control</p>
					<div>
						<button onClick={this.handleGoogleLogin} className="button input--grey-focus">Login with Google</button>
						<button onClick={this.handleGithubLogin} className="button button--github input--grey-focus">Login with GitHub</button>
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
								className="text-input input--grey-focus"
								placeholder="Password"
								value={this.state.password}
								onChange={this.onPasswordChange}
							/>
							<div><button className="button button--email input--grey-focus">Login with Email</button></div>
						</form>
						<p>Don't have an account? <Link to="/signup" className="input--grey-focus">Sign up!</Link></p>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	startGoogleLogin: () => dispatch(startGoogleLogin()),		// Map this function (which dispatches startGoogleLogin()) on to props, dereferenced it above
	startGithubLogin: () => dispatch(startGithubLogin()),		// dispatch() returns a promise
	startEmailLogin: (email, password) => dispatch(startEmailLogin(email, password))
})

// No/undefined mapStateToProps, just mapDispatchToProps
export default connect(undefined, mapDispatchToProps)(LoginPage)