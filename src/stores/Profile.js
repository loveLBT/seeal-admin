import { observable, action } from 'mobx'
import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'

import { regNull } from '../utils/reg'

export default class Profile {
	@observable userInfo = {}
	@observable loginLoading = false
	@observable account = ''
	@observable password = ''

	STORAGE_KEY_USER_INFO = 'STORAGE_KEY_USER_INFO'

	constructor() {
		this.restoreUserInfoFormStorage()	
	}

	/**
	 * 输入框数据改变监听
	 * @param  {[type]} key [description]
	 * @param  {[type]} val [description]
	 * @return {[type]}     [description]
	 */
	@action onChange = (key, val) => {
		switch (key) {
			case 'account':
				this.account = val
				break;
			case 'password': 
				this.password = val
			default:
				break;
		}
	}
	/**
	 * 登录验证
	 * @return {[type]} [description]
	 */
	@action login = async () => {
		Promise.all([
			regNull(this.account, '请输入账号'),
			regNull(this.password, '请输入密码')
		])
			.then((res) => {
				const data = {
					username: this.account,
					password: this.password,
					grant_type: 'password',
					client_id: 'client-test',
					client_secret: '123456'
				}

				this.loginLoading = true
				axios.post("/oauth/token", qs.stringify(data))
					.then((res) => {
						this.loginLoading = false
						if(res.tokenType && res.value) {
							this.setUserInfoStorage({token: res.tokenType + res.value, isLogin: true})
						}
					})
					.catch((err) => {
						this.loginLoading = false
					})
			})
			.catch((err) => {
				message.warning(err)
			})
	}
	/**
	 * 登出
	 * @return {[type]} [description]
	 */
	@action logout = () => {
		this.userInfo = {}
		sessionStorage.clear()
	}
	/**
	 * 设置登录信息缓存
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action setUserInfoStorage = (data) => {
		const info = sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)
		let newData = {}
		if(info) {
			const jsInfo = JSON.parse(info)
			const newData = {...jsValue, ...data}
		}else {
			newData = data
		}
		this.userInfo = newData
		sessionStorage.setItem(this.STORAGE_KEY_USER_INFO, JSON.stringify(newData))
	}
	/**
	 * 从缓存中取出登录信息
	 * @return {[type]} [description]
	 */
	@action restoreUserInfoFormStorage = () => {
		const value = sessionStorage.getItem(this.STORAGE_KEY_USER_INFO)
		if(value) {
			this.userInfo = JSON.parse(value)
		}
	}
}