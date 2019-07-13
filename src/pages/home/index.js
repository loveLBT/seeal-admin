import React,{ Component } from 'react'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom';

import BasicLayout from '../../layout/BasicLayout'
import Organizatio from '../../pages/common/organizatio'
import Role from '../../pages/common/role'

class Home extends Component {
	render() {
		return (
			<Router basename="/home">
				<BasicLayout>
					<Switch>
						<Redirect exact path="/common" to="/common/organizatio" />
						<Route path="/common/organizatio" component={Organizatio} />
						<Route path="/common/role" component={Role} />
					</Switch>
				</BasicLayout>
			</Router>
		)
	}
}

export default Home