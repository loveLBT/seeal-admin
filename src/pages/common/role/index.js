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

@inject("roleStore")
@modalDetail({
	formItems: constants.role.modalDetailItems
})
@modalForm({
	formItems: constants.role.modalFormItems
})
@observer
class Role extends Component {
	componentDidMount() {
		const { roleStore } = this.props
		roleStore.initData()
	}
	/**
	 * 新增（不写在store里面是为了给高阶组件modalForm调用此方法）
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	onModalSave = async (config) => {
		const { roleStore } = this.props
		const { tableStore } = roleStore
		let data = {...config.data}
		data.parentRoleId = data.parentRole ? data.parentRole.id : undefined

		try {
			const res = await axios({
				method: data.id ? "put" : "post",
				url: "/role",
				data: qs.stringify(data,{allowDots: true})
			})
			if(res.errorCode === "WR000000") {
				config.success(res)
				tableStore.getData()
			}else{
				config.fail(res.data)
			}
		} catch(e) {
			config.fail(e)
		}
	}
	render() {
		const { roleStore } = this.props
		const { tableStore } = roleStore

		const  dropDowmMenu = (
			<Menu>
				<Menu.Item 
					key="0"
					onClick={() => {
						roleStore.onRemove(tableStore.selectedRowKeys.slice().join(','))
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
								title: "角色详情",
								formData: record
							})
						}}
					>
						查看
					</Button>
					<Button
						ref={ref=>this[`ref-${record.id}`]=ref} 
						style={{marginLeft: '5px'}} 
						size='small'
						onClick={async () => {
							this[`ref-${record.id}`].setState({loading: true})
							const res = await axios.get(`/role/permission/${record.id}`)
							this[`ref-${record.id}`].setState({loading: false})

							if(res.errorCode === "WR000000") {
								this.props.modalForm.onOpen({
									title: "编辑角色",
									formData: {...record,permissionIds:res.data.join(",")},
									options: roleStore.options
								})
							}
						}}
					>
						编辑
					</Button>
					<Popconfirm
						title='确认删除该条数据吗？'
						onConfirm={() => {
							roleStore.onRemove(record.id)
						}}
					>
						<Button style={{marginLeft: '5px'}} size='small'>删除</Button>
					</Popconfirm>
				</Fragment>
			)
		}

		return (
			<div className="page organizatio">
				<div className="page_header">
					<div className="left">角色管理</div>
					<div className="right">
						<Button 
							onClick={() => {
								this.props.modalForm.onOpen({
									title: "新增角色", 
									options: roleStore.options, 
									formData: {}
								})
							}} 
							type="primary"
						>
							新增角色
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
						formItems={constants.role.searchFormItems}
						options={roleStore.options}
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

export default Role