import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import { createBrowserHistory } from 'history'							// Must be ver 4.x if using react-router-dom 5.x
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'
import PrivateRoute from './PrivateRoute'

// This is our own Browser History object that we can use elsewhere, not just in routed Components
export const history = createBrowserHistory()				// So we can use our own Browser History in other files

const AppRouter = () => (
	<Router history={history} >	{/* <Router> lets us specify out own custom history object, which can be used elsewhere (not just routed Components) */}
		<div>	{/* Router expects only 1 child, so wrap in a DIV */}
			<Header />
			<Switch>	{/* Switch allows only ONE Route to match, then stops */}
				<Route path="/" component={LoginPage} exact={true} />	{/* Without exact '/' would match all routes */}
				<PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />		{/* Only available if logged in */}
				<PrivateRoute path="/create" component={AddExpensePage} />
				<PrivateRoute path="/edit/:id" component={EditExpensePage} />		{/* ReactRouter will pass props to all components of Routes */}
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</Router>
)

export default AppRouter;