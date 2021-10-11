import React from 'react'
import {connect} from 'react-redux'
import {startGoogleLogin, startGithubLogin} from '../actions/auth'

export const LoginPage = ({startGoogleLogin, startGithubLogin}) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="box-layout__title">Expensify</h1>
			<p>It's time to get your expenses under control</p>
			<button onClick={startGoogleLogin} className="button">Login with Google</button>
			<button onClick={startGithubLogin} className="button button--github">Login with GitHub</button>
		</div>
	</div>
);

const mapDispatchToProps = dispatch => ({
	startGoogleLogin: () => dispatch(startGoogleLogin()),		// Map this function (which dispatches startGoogleLogin()) on to props, dereference it above
	startGithubLogin: () => dispatch(startGithubLogin())
})

// No/undefined mapStateToProps.
export default connect(undefined, mapDispatchToProps)(LoginPage)