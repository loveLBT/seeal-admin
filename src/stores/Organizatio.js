import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Organization {
	@observable parentOrganizations = []

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/organization/page',
	  	columns: constants.organizatio.tableColumns
	  })
	}

	@computed get options () {
		return {
			organizationLevel: constants.organizatio.organizationLevel,
			organizationRange: constants.organizatio.organizationRange,
			['parentOrganization.id']: this.parentOrganizations
		}
	}

	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([this.tableStore.getData(), this.getParentOrganization()])
	}
	/**
	 * 注销机构
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action onLogout = async (ids) => {
		const res = await axios.put('/organization/logout', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('注销成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 停用机构
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStop = async (ids) => {
		const res = await axios.put('/organization/stop', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('停用成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 启用机构
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStart = async (ids) => {
		const res = await axios.put('/organization/enable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('启用成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 获取父级机构数据
	 * @return {[type]} [description]
	 */
	@action getParentOrganization = async () => {
		let parentOrganizations = []
		
		const res = await axios.get('/organization', {
			params: {
				organizationRange: "指定机构及下辖"
			}
		})
		if(res.errorCode === 'WR000000') {
			for(let item of res.data) {
				parentOrganizations.push({value: item.id, label: item.organizationName})
			}
		}
		
		this.parentOrganizations = parentOrganizations
	}

}