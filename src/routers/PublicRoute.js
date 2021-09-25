import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

// Opposite of PrivateRoute, only displays Component when NOT logged in, otherwise redirect to Dashboard
export const PublicRoute = ({isAuthenticated, component: Component, ...rest}) => (			// Destructuring component as Component, plus all the rest of the params/props
	<Route {...rest} component={ props => (
		isAuthenticated ? (
			<Redirect to="/dashboard" />
		) : (
			<Component {...props} />
		)
	)} />
)

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid				// Convert either undefined or the 'uid string' to boolean false/true values 
})

export default connect(mapStateToProps)(PublicRoute);