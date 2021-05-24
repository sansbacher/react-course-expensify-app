// Higher Order Component (HOC) - component (the HOC) that renders another (regular) component

import React from 'react'
import ReactDOM from 'react-dom'

const Info = props => (
	<div>
		<h1>Info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

const withAdminWarning = (WrappedComponent) => {
	// Regular function returns the HOC
	return props => (
		<div>
			{ props.isAdmin && <p>This is private info. Please don't share!</p> }
			<WrappedComponent {...props} />			{/* spread any props and pass them down as-is to child */}
		</div>
	);
}

/**	// Longer way of doing the same as below
	const requireAuthentication = (WrappedComponent) => {
		return (props) => {
			if (props.isAuthenticated) {
				return (<WrappedComponent {...props} />);
			} else {
				return (
					<div>
						<p>Please login to view the info!</p>
					</div>
				);
			}
		}
	}
	
*/

const requireAuthentication = (WrappedComponent) => {
	return props => (
		<div>
			{props.isAuthenticated ? (
				<WrappedComponent {...props} />
			) : (
				<p>Please login to view the info!</p>
			)}
		</div>
	);
}


const AdminInfo = withAdminWarning(Info)
const AuthInfo = requireAuthentication(Info)

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'))
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'))