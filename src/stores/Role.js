import { observable, action, computed } from 'mobx'
import { message } from 'antd'
import axios from 'axios'

import TableStore from './Table'
import constants from '../constants/pages'

export default class Organization {
	@observable roles = []
	@observable permissions = []

	constructor() {
	  this.tableStore = new TableStore({
	  	getUrl: '/role/page',
	  	columns: constants.role.tableColumns
	  })
	}

	@computed get options () {
		return {
			['parentRole.id']: this.roles,
			permissionIds: this.permissions
		}
	}

	/**
	 * 初始化页面数据
	 * @return {[type]} [description]
	 */
	@action initData = () => {
		axios.all([
			this.tableStore.getData(), 
			this.getRole(),
			this.getPermissions()
		])
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
	@action roleTreeToArray = (data) => {
		let array = []
		for(let item of data) {
			array.push({
				value: item.data.id,
				label: item.data.roleName
			})
			if(item.childrenNode && item.childrenNode.length > 0) {
				array = array.concat(this.roleTreeToArray(item.childrenNode))
			}
		}

		return array
	}
	@action getRole = async () => {
		let roles = []

		const res = await axios.get('/role/tree')
		if(res.errorCode === 'WR000000') {
			roles = this.roleTreeToArray(res.data)
		}
		
		this.roles = roles
	}
	@action filterPermissionIdsTree = (data) => {
		let array = []
		for(let item of data) {
			let newItem = {}
			newItem.title = item.data.permissionName
			newItem.key = item.data.id
			if(item.childrenNode && item.childrenNode.length > 0) {
				newItem.children = this.filterPermissionIdsTree(item.childrenNode)
			}

			array.push(newItem)
		}

		return array
	}
	@action getPermissions = async () => {
		let permissions = []

		const res = await axios.get('/permission/tree')
		if(res.errorCode === 'WR000000') {
			permissions = this.filterPermissionIdsTree(res.data)
		}

		this.permissions = permissions
	}
}