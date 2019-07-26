import React, { Component, Fragment } from 'react'
import { Button, Dropdown, Menu, Icon, Table, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import qs from 'qs'

import constants from '../../../constants/pages'
import SearchForm from '../../../components/SearchForm'
import modalForm from '../../../hoc/modalForm'
import modalDetail from '../../../hoc/modalDetail'

@inject("resourcesStore")
@modalDetail({
	formItems: constants.resources.modalDetailItems
})
@modalForm({
	formItems: constants.resources.modalFormItems
})
@observer
class Resources extends Component {
	componentDidMount() {
		const { resourcesStore } = this.props
		resourcesStore.initData()
	}
	/**
	 * 新增（不写在store里面是为了给高阶组件modalForm调用此方法）
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	onModalSave = async (config) => {
		const { resourcesStore } = this.props
		const { tableStore } = resourcesStore
		const data = {
			...config.data
		}

		try {
			const res = await axios({
				method: data.id ? "put" : "post",
				url: "/resource",
				data: qs.stringify(data, {allowDots: true})
			})
			if(res.errorCode === "WR000000") {
				config.success(res)
				tableStore.getData()
			}else{
				config.fail()
			}
		} catch(e) {
			config.fail(e)
		}
	}
	render() {
		const { resourcesStore } = this.props
		const { tableStore } = resourcesStore
		const  dropDowmMenu = (
			<Menu>
				<Menu.Item 
					key="0"
					onClick={() => {
						resourcesStore.onRemove(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量删除
			  </Menu.Item>
			</Menu>
		)
		const tableAction = {
			title: '操作',
			key: 'action',
			fixed: 'right',
			align: 'center',
			width: 220,
			render: (text, record) => (
				<Fragment>
					<Button 
						size='small'
						onClick={() => {
							this.props.modalDetail.onOpen({
								title: "查看资源",
								formData: record
							})
						}}
					>
						查看
					</Button>
					<Button 
						style={{marginLeft: '5px'}} 
						size='small'
						onClick={() => {
							this.props.modalForm.onOpen({
								title: "编辑资源",
								formData: record,
								options: resourcesStore.options
							})
						}}
					>
						编辑
					</Button>
					<Popconfirm
						title='确认删除该条数据吗？'
						onConfirm={() => resourcesStore.onRemove(record.id)}
					>
						<Button style={{marginLeft: '5px'}} size='small'>删除</Button>
					</Popconfirm>
				</Fragment>
			)
		}

		return (
			<div className="page resources">
				<div className="page_header">
					<div className="left">资源管理</div>
					<div className="right">
						<Button 
							onClick={() => {
								this.props.modalForm.onOpen({
									title: "新增机构", 
									options: resourcesStore.options, 
									formData: {}
								})
							}} 
							type="primary"
						>
							新增资源
						</Button>
						<Dropdown
							overlay={tableStore.filterColumnsMenu}
							trigger={['click']}
							visible={tableStore.filterColumnsMenuVisible}
							onVisibleChange={tableStore.onFilterColumnsMenuChange}
						>
							<Button>
								筛选列
								<Icon type="caret-down"/>
							</Button>
							
						</Dropdown>
						<Dropdown
							overlay={dropDowmMenu}
							trigger={['click']}
						>
							<Button>
								更多
								<Icon type="caret-down"/>
							</Button>
						</Dropdown>
					</div>
				</div>
				<div className="page_wrapper">
					<SearchForm 
						onSearch={tableStore.onSearch}
						onReset={tableStore.onReset}
						formData={tableStore.formValues}
						formItems={constants.resources.searchFormItems}
						options={resourcesStore.options}
					/>

					<Table 
						columns={[...tableStore.columns.slice(), tableAction]} 
						dataSource={tableStore.data.slice()} 
						className="table"
						bordered={true}
						loading={tableStore.loading}
						rowClassName={(record, index) => classnames("table_row_odd", {"table_row_event": (index + 1) % 2 === 0})}
						pagination={tableStore.pagination}
						rowSelection={tableStore.rowSelection} 
						scroll={{x: tableStore.scroll}}
					/>
				</div>
				
			</div>
		)
	}
}

export default Resources