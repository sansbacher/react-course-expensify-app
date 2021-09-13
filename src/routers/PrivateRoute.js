import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'

export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => (			// Destructuring component as Component, plus all the rest of the params/props
	<Route {...rest} />
)

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.uid				// Convert either undefined or the 'uid string' to boolean false/true values 
})

export default connect(mapStateToProps)(PrivateRoute);