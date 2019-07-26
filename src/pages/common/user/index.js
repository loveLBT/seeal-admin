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

@inject("userStore")
@modalDetail({
	formItems: constants.user.modalDetailItems
})
@modalForm({
	formItems: constants.user.modalFormItems
})
@observer
class User extends Component {
	componentDidMount() {
		const { userStore } = this.props
		userStore.initData()
	}
	/**
	 * 新增（不写在store里面是为了给高阶组件modalForm调用此方法）
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	onModalSave = async (config) => {
		const { userStore } = this.props
		const { tableStore } = userStore
		let data = {...config.data}
		data.organizationId = data.organization ? data.organization.id : undefined

		try {
			const res = await axios({
				method: data.id ? "put" : "post",
				url: "/account",
				data: qs.stringify(data, {allowDots: true})
			})
			if(res.errorCode === "WR000000") {
				config.success(res)
				tableStore.getData()
			}else{
				config.fail("")
			}
		} catch(e) {
			config.fail(e)
		}
	}
	render() {
		const { userStore } = this.props
		const { tableStore } = userStore
		const  dropDowmMenu = (
			<Menu>
				<Menu.Item 
					key="0"
					onClick={() => {
						userStore.onStart(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量启用
			  </Menu.Item>
			  <Menu.Item 
					key="1"
					onClick={() => {
						userStore.onStop(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量停用
			  </Menu.Item>
			  <Menu.Item 
					key="2"
					onClick={() => {
						userStore.onLogout(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量注销
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
								title: "查看账户",
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
							const res = await axios.get(`/account/role/${record.id}`)
							this[`ref-${record.id}`].setState({loading: false})

							if(res.errorCode === "WR000000") {
								this.props.modalForm.onOpen({
									title: "编辑账户",
									formData: {...record, roleIds: res.data.join(",")},
									options: userStore.options
								})
							}
						}}
					>
						编辑
					</Button>
				</Fragment>
			)
		}

		return (
			<div className="page resources">
				<div className="page_header">
					<div className="left">账户管理</div>
					<div className="right">
						<Button 
							onClick={() => {
								this.props.modalForm.onOpen({
									title: "新增账户", 
									options: userStore.options, 
									formData: {}
								})
							}} 
							type="primary"
						>
							新增账户
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
						formItems={constants.user.searchFormItems}
						options={userStore.options}
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

export default User