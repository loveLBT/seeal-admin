import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'
import qs from 'qs'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Organization {
	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/deviceType/page',
	  	columns: constants.deviceType.tableColumns
	  })
	}

	@computed get options () {
		return {
			deviceTypeState: constants.deviceType.deviceTypeState
		}
	}
	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([this.tableStore.getData()])
	}
	/**
	 * 注销设备型号
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action onLogout = async (ids) => {
		const res = await axios.put('/deviceType/batchCancellation', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('注销成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 停用设备型号
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStop = async (ids) => {
		const res = await axios.put('/deviceType/batchUnable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('停用成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 启用设备型号
	 * @param  {[type]} ids [description]
	 * @return {[type]}     [description]
	 */
	@action onStart = async (ids) => {
		const res = await axios.put('/deviceType/batchEnable', qs.stringify({ids}, {allowDots: true}))
		if(res.errorCode === 'WR000000') {
			message.success('启用成功')
			this.tableStore.getData()
		}
	}
}