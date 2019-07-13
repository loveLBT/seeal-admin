import { observable, action } from 'mobx'
import { message } from 'antd'
import axios from 'axios'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Organization {
	@observable options = {}

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/role/page',
	  	columns: constants.role.tableColumns
	  })
	}
	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([this.tableStore.getData()])
	}
	/**
	 * 删除表格数据
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	@action onRemove = async (ids) => {
		const res = await axios.delete('/role', {params: {ids}})
		if(res.errorCode === 'WR000000') {
			message.success('删除成功')
			this.tableStore.getData()
		}
	}
}