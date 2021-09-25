import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import Header from '../components/Header'

// PrivateRoute is a wrapper for Route that checks if the user is logged in, if so it returns the Component that was passed in (along with any props), if not Redirects
export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (			// Destructuring component as Component, plus all the rest of the params/props
	<Route {...rest} component={ props => (
		isAuthenticated ? (
			<div>
				<Header />
				<Component {...props} />
			</div>
		) : (
			<Redirect to="/" />
		)
	)} />
)

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid				// Convert either undefined or the 'uid string' to boolean false/true values 
})

export default connect(mapStateToProps)(PrivateRoute);