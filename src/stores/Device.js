import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Organization {
	@observable organizations = []
	@observable deviceTypes = []

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/device/page',
	  	columns: constants.device.tableColumns
	  })
	}

	@computed get options () {
		return {
			deviceState: constants.device.deviceState,
			['organization.id']: this.organizations,
			['deviceType.id']: this.deviceTypes
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
			this.getDeviceTypes()
		])
	}
	/**
	 * 注销设备
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action onLogout = async (ids) => {
		const res = await axios.put('/device/batchCancellation', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('注销成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 停用设备
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStop = async (ids) => {
		const res = await axios.put('/device/batchUnable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('停用成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 启用启用
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStart = async (ids) => {
		const res = await axios.put('/device/batchUnable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('启用成功')
			this.tableStore.getData()
		}
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
	@action getDeviceTypes = async () => {
		let deviceTypes = []
		const res = await axios.get('/deviceType')
		if(res.errorCode === 'WR000000') {
			for(let item of res.data) {
				deviceTypes.push({
					value: item.id,
					label: item.deviceTypeCode
				})
			}
		}

		this.deviceTypes = deviceTypes
	}
}