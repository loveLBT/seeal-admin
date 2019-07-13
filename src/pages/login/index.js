import React,{ Component } from 'react'
import { Button, Checkbox } from 'antd'
import { inject, observer } from 'mobx-react'

import icons from '../../constants/icons'
import LineInput from '../../components/LineInput'

import './index.less'

@inject('profileStore')
@observer
class Login extends Component {
	render() {
		const { profileStore } = this.props
		const { account, password, onChange, login, loginLoading } = profileStore

		return (
			<div className="login">
				<div className="login_bg"></div>
				<div className="login_content">
					<h3 className="title">印章后台管理系统</h3>
					<div className="wrapper">
						<LineInput value={account} onChange={(val) => {onChange("account", val)}} type="input" placeholder="请输入账号" icon={icons.account} />
						<LineInput value={password} onChange={(val) => {onChange("password", val)}} type="password" placeholder="请输入密码" icon={icons.password} />
						<Button loading={loginLoading} onClick={login} size="large" block type="primary">立即登录</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default Login