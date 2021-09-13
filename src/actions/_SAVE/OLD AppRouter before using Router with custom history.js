import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'

// This (typical) version uses BrowserRouter which has "history" baked in, but is constrained to use only by Components

const AppRouter = () => (
	<BrowserRouter>			{/* Includes a Browser History instance, registers with Router, but only available within a routed component. Eg: .props.history.push('/') */}
		<div>	{/* BrowserRouter expects only 1 child, so wrap in a DIV */}
			<Header />
			<Switch>	{/* Switch allows only ONE Route to match, then stops */}
				<Route path="/" component={LoginPage} exact={true} />	{/* Without exact '/' would match all routes */}
				<Route path="/dashboard" component={ExpenseDashboardPage} />
				<Route path="/create" component={AddExpensePage} />
				<Route path="/edit/:id" component={EditExpensePage} />		{/* ReactRouter will pass props to all components of Routes */}
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouter;