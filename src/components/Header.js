import React from 'react'
import {NavLink} from 'react-router-dom'

// REMOVED:	<NavLink to="/help" activeClassName="is-active">Help</NavLink>

const Header = () => (
	<header>
		<h1>Expensify</h1>
		<NavLink to="/" activeClassName="is-active" exact={true}>Dashboard</NavLink>
		<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
	</header>
)

export default Header;