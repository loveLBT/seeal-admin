import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'

import TableStore from './Table'
import constants from '../constants/pages'

export default class User {
	@observable organizations = []
	@observable roles = []

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/account/page',
	  	columns: constants.user.tableColumns
	  })
	}

	@computed get options () {
		return {
			accountState: constants.user.accountState,
			['organization.id']: this.organizations,
			roleIds: this.roles
		}
	}
	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([
			this.tableStore.getData(), 
			this.getOrganizations(),
			this.getRoles()
		])
	}
	@action organizationTreeToArray = (data) => {
		let array = []
		for(let item of data) {
			array.push({
				value: item.data.id,
				label: item.data.organizationName
			})
			if(item.childrenNode && item.childrenNode.length > 0) {
				array = array.concat(this.organizationTreeToArray(item.childrenNode))
			}
		}
		return array
	}
	@action getOrganizations = async () => {
		let organizations = []
		const res = await axios.get('/organization/tree')
		if(res.errorCode === "WR000000") {
			organizations = this.organizationTreeToArray(res.data)
		}

		this.organizations = organizations
	}
	@action roleTreeToArray = (data) => {
		let array = []
		for(let item of data) {
			array.push({
				value: item.data.id.toString(),
				label: item.data.roleName
			})
			if(item.childrenNode && item.childrenNode.length > 0) {
				array = array.concat(this.roleTreeToArray(item.childrenNode))
			}
		}
		return array
	}
	@action getRoles = async () => {
		let roles = []
		const res = await axios.get('/role/tree')
		if(res.errorCode === "WR000000") {
			roles = this.roleTreeToArray(res.data)
		}

		this.roles = roles
	}

	/**
	 * 注销账号
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action onLogout = async (ids) => {
		const res = await axios.put('/account/logout', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('注销成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 停用账号
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStop = async (ids) => {
		const res = await axios.put('/account/stop', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('停用成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 启用账号
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStart = async (ids) => {
		const res = await axios.put('/account/enable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('启用成功')
			this.tableStore.getData()
		}
	}
}