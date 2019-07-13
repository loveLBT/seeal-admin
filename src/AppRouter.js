import React, { Component } from 'react'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import Home from './pages/home'
import Login from './pages/login'

@inject("profileStore")
@observer
class AppRouter extends Component {
	render() {
		const { profileStore } = this.props
		const { userInfo } = profileStore

		return (
			<Router>
				<Switch>
					<Redirect exact path="/" to={userInfo.isLogin ? "/home" : "/login"} />
					<Route path="/home" render={() => (userInfo.isLogin ? <Home /> : <Redirect to="/login" /> )} />
					<Route path="/login" render={() => (userInfo.isLogin ? <Redirect to="/home" /> : <Login /> )} />
				</Switch>
			</Router>
		)
	}
}

export default AppRouter