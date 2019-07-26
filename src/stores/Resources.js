import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Resources {
	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/resource/page',
	  	columns: constants.resources.tableColumns
	  })
	}

	@computed get options () {
		return {
			httpMethod: constants.resources.httpMethod
		}
	}

	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([this.tableStore.getData()])
	}

	@action onRemove = async (ids) => {
		const res = await axios.delete('/resource', {params: {ids}})
		if(res.errorCode === 'WR000000') {
			message.success('删除成功')
			this.tableStore.getData()
		}
	}
}