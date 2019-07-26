import React,{ Component } from 'react'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom';

import BasicLayout from '../../layout/BasicLayout'
import Organizatio from '../../pages/common/organizatio'
import Role from '../../pages/common/role'
import Resources from '../../pages/common/resources'
import Jurisdiction from '../../pages/common/jurisdiction'
import User from '../../pages/common/user'

import Device from '../../pages/device/device'
import DeviceType from '../../pages/device/deviceType'

import Seal from '../../pages/seal/seal'

class Home extends Component {
	render() {
		return (
			<Router basename="/home">
				<BasicLayout>
					<Switch>
						<Redirect exact path="/common" to="/common/organizatio" />
						<Route path="/common/organizatio" component={Organizatio} />
						<Route path="/common/role" component={Role} />
						<Route path="/common/resources" component={Resources} />
						<Route path="/common/jurisdiction" component={Jurisdiction} />
						<Route path="/common/user" component={User} />
						
						<Route exact path="/device" component={Device} />
						<Route path="/device/type" component={DeviceType} />

						<Route path="/seal" component={Seal} />
					</Switch>
				</BasicLayout>
			</Router>
		)
	}
}

export default Home