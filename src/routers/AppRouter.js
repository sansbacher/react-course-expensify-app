import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'

const AppRouter = () => (
	<BrowserRouter>
		<div>	{/* BrowserRouter expects only 1 child, so wrap in a DIV */}
			<Header />
			<Switch>	{/* Switch allows only ONE Route to match, then stops */}
				<Route path="/" component={ExpenseDashboardPage} exact={true} />	{/* Without exact '/' would match all routes */}
				<Route path="/create" component={AddExpensePage} />
				<Route path="/edit/:id" component={EditExpensePage} />		{/* ReactRouter will pass props to all components of Routes */}
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouter;