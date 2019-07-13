import React from 'react'
import { observable, action, computed } from 'mobx'
import { Menu, Checkbox } from 'antd'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

export default class Table {
	@observable page = 1
	@observable limit = 10
	@observable formValues = {}
	@observable columns = []
	@observable columns_back = []
	@observable data = []
	@observable loading = false
	@observable total = 0
	@observable selectedRowKeys = []
	@observable selectedRows = []
	@observable filterColumnsMenuVisible = false

	constructor(config) {
	 	this.getUrl = config.getUrl
	 	this.columns = config.columns
	 	this.backColumns(config.columns)
	}
	/**
	 * 获取表格数据参数
	 * @return {[type]} [description]
	 */
	@computed get params () {
		return {
			limit: this.limit,
			page: this.page,
			...this.formValues
		}
	}
	/**
	 * 表格行数据
	 * @return {[type]} [description]
	 */
	@computed get rowSelection () {
		return {
			onChange: this.onSelectChange,
			selectedRowKeys: this.selectedRowKeys
		}
	}
	/**
	 * 表格分页
	 * @return {[type]} [description]
	 */
	@computed get pagination () {
		return {
			position: "bottom",
			total: this.total, 
			showSizeChanger: true, 
			showQuickJumper: true,
			onChange: this.onPageChange
		}
	}
	/**
	 * 表格筛选菜单
	 * @return {[type]} [description]
	 */
	@computed get filterColumnsMenu () {
		return (
			<Menu>
				{this.columns_back.map((item, index) => {
					if(!item.fixed) {
						return (
							<Menu.Item key={index}>
								<Checkbox 
									value={item.dataIndex}
									checked={item.checked}
									onChange={this.onCheckChange.bind(this, item.dataIndex)}
								>
									{item.title}
								</Checkbox>
							</Menu.Item>
						)
					}
				})}
				<Menu.Divider/>
				<Menu.Item 
					key={this.columns.length}
				>
					<Checkbox
						indeterminate={this.indeterminate}
						checked={this.checkAll}
						onChange={this.onCheckAllChange.bind(this)}
					>
						全选
					</Checkbox>
				</Menu.Item>
			</Menu>
		)
	}
	/**
	 * 表格长度
	 * @return {[type]} [description]
	 */
	@computed get scroll () {
		let scroll = 200
		for(let item of this.columns) {
			if(item.width) {
				scroll += item.width 
			}else {
				scroll += 150 
			}
		}

		return scroll
	}
	/**
	 * 筛选全选
	 * @return {[type]} [description]
	 */
	@computed get checkAll () {
		return this.columns.slice().length === this.columns_back.slice().length
	}
	/**
	 * 全选状态
	 * @return {[type]} [description]
	 */
	@computed get indeterminate () {
		const fixedColumns = this.columns_back.filter((item) => item.fixed)
		return this.columns.slice().length < this.columns_back.slice().length && this.columns.slice().length > fixedColumns.slice().length
	}
	/**
	 * 表格数据搜索
	 * @param  {[type]} values [description]
	 * @return {[type]}        [description]
	 */
	@action onSearch = (values) => {
		this.formValues = values
		this.getData()
	}
	/**
	 * 搜索条件清空
	 * @return {[type]} [description]
	 */
	@action onReset = () => {
		this.formValues = {}
		this.page = 1
		this.getData()
	}
	/**
	 * 表格分页页码改变监听
	 * @param  {[type]} page     [description]
	 * @param  {[type]} pageSize [description]
	 * @return {[type]}          [description]
	 */
	@action onPageChange = (page, pageSize) => {
		this.page = page
		this.limit = pageSize
		this.getData()
	}
	@action onSelectChange = (selectedRowKeys, selectedRows) => {
		this.selectedRowKeys = selectedRowKeys
		this.selectedRows = selectedRows
	}
	@action onFilterColumnsMenuChange = (visible) => {
		this.filterColumnsMenuVisible = visible
	}
	@action onCheckAllChange = (e) => {
		for(let item of this.columns_back) {
			if(!item.fixed) {
				item.checked = e.target.checked
			}
		}
		this.columns_back = this.columns_back
		this.columns = this.columns_back.filter((item) => item.checked)
	}
	@action onCheckChange = (key, e) => {
		for(let item of this.columns_back) {
			if(key === item.dataIndex) {
				item.checked = e.target.checked
			}
		}
		this.columns_back = this.columns_back
		this.columns = this.columns_back.filter((item) => item.checked)
	}
	/**
	 * 备份columns数据
	 * @param  {[type]} columns [description]
	 * @return {[type]}         [description]
	 */
	@action backColumns = (columns) => {
		let newColumns = []
		for(let item of columns) {
			newColumns.push({
				...item,
				checked: true
			})
		}
		this.columns_back = newColumns
	}
	/**
	 * 表格数据导出
	 * @return {[type]} [description]
	 */
	@action onExport = async (config) => {
		const res = await axios({
			method: 'get',
			url: config.url,
			params: this.formValues,
			responseType: 'blob',
			paramsSerializer: (params) => {
				return qs.stringify(params, {arrayFormat: 'brackets', allowDots: true})
			}
		})
		const blob = new Blob([res])
		var a = document.createElement('a')
		a.download = `${config.fileName}${moment().format('YYYY-MM-DD')}.xlsx`
		a.href = window.URL.createObjectURL(blob)
		a.click()
	}
	/**
	 * 获取表格数据
	 * @return {[type]} [description]
	 */
	@action getData = async () => {
		this.loading = true
		try {
			const res = await axios({
				method: 'get',
				url: this.getUrl,
				params: this.params,
				paramsSerializer: (params) => {
					return qs.stringify(params, {arrayFormat: 'brackets', allowDots: true})
				}
			})
			this.loading = false
			if(res.errorCode === "WR000000") {
				for(let item of res.data.content) {
					item.key = item.id
				}
				this.data = res.data.content
				this.total = res.totalElements
			}
		}catch(err) {
			this.loading = false
		}
	}
}