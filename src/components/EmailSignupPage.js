import React from 'react'
import { Link } from 'react-router-dom';

export class EmailSignupPage extends React.Component {

	render() {
		return (
			<div className="box-layout">
				<div className="box-layout__box box-layout__box--large">
					<h1 className="box-layout__title">Signup with your Email Address</h1>
					<p>Enter your email address</p>	
					<p>Enter your password</p>
					<p>etc...</p>
					<br />
					<p>Have an account? <Link to="/">Log in</Link></p>
				</div>
			</div>
		);
	}
}

export default EmailSignupPage;