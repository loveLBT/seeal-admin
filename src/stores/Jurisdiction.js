import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Jurisdiction {
	@observable resourceIds = []
	@observable parentPermissions = []

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/permission/page',
	  	columns: constants.jurisdiction.tableColumns
	  })
	}

	@computed get options () {
		return {
			resourceIds: this.resourceIds,
			['parentPermission.id']: this.parentPermissions
		}
	}

	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([
			this.tableStore.getData(),
			this.getResourceIds(),
			this.getParentPermission()
		])
	}

	@action onRemove = async (ids) => {
		const res = await axios.delete('/permission', {params: {ids}})
		if(res.errorCode === 'WR000000') {
			message.success('删除成功')
			this.tableStore.getData()
		}
	}
	/**
	 * 获取当前用户的所有资源
	 * @return {[type]} [description]
	 */
	@action getResourceIds = async () => {
		let resourceIds = []

		const res = await axios.get('/resource/all')

		if(res.errorCode === 'WR000000') {
			for(let item of res.data) {
				resourceIds.push({value: item.id.toString(), label: item.resourceName})
			}
		}

		this.resourceIds = resourceIds
	}
	@action parentPermissionTreeToArray = (data = []) => {
		let array = []
		for(let item of data) {
			array.push({
				value: item.data.id,
				label: item.data.permissionName
			})
			if(item.childrenNode && item.childrenNode.length > 0) {
				array = array.concat(this.parentPermissionTreeToArray(item.childrenNode))
			}
		}
		return array
	}
	@action getParentPermission = async () => {
		let parentPermissions = []

		const res = await axios.get('/permission/tree')

		if(res.errorCode === 'WR000000') {
			parentPermissions = this.parentPermissionTreeToArray(res.data)
		}

		this.parentPermissions = parentPermissions
	}
}