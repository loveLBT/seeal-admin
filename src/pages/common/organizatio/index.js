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
import importModal from '../../../hoc/importModal'

@inject("organizatioStore", "profileStore")
@importModal({
	downloadUrl: "/organization/excel/template",
	downloadName: "机构模板",
	uploadUrl: "/organization/excel/import"
})
@modalDetail({
	formItems: constants.organizatio.modalDetailItems
})
@modalForm({
	formItems: constants.organizatio.modalFormItems
})
@observer
class Organizatio extends Component {
	componentDidMount() {
		const { organizatioStore } = this.props
		organizatioStore.initData()
	}
	/**
	 * 新增（不写在store里面是为了给高阶组件modalForm调用此方法）
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	onModalSave = async (config) => {
		const { organizatioStore } = this.props
		const { tableStore } = organizatioStore
		let data = {...config.data}
		data.parentOrganizationId = data.parentOrganization ? data.parentOrganization.id : undefined
		data.address = {...data.address, ...data.address1}

		try {
			const res = await axios({
				method: data.id ? "put" : "post",
				url: "/organization",
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
		const { organizatioStore, profileStore } = this.props
		const { tableStore } = organizatioStore
		const  dropDowmMenu = (
			<Menu>
				<Menu.Item 
					key="0"
					onClick={() => {
						organizatioStore.onStart(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量启用
			  </Menu.Item>
			  <Menu.Item 
			  	key="1"
			  	onClick={() => {
			  		organizatioStore.onStop(tableStore.selectedRowKeys.slice().join(','))
			  	}}
			  >
			  	批量停用
			  </Menu.Item>
			  <Menu.Item 
			  	key="2"
			  	onClick={() => {
			  		organizatioStore.onLogout(tableStore.selectedRowKeys.slice().join(','))
			  	}}
			  >
			  	批量注销
			  </Menu.Item>
			  <Menu.Item 
			  	key="3"
			  	onClick={() => {
			  		this.props.importModal.onOpen({
			  			title: "机构管理数据导入",
			  			data: {
				  			token: profileStore.userInfo.token
				  		}
			  		})
			  	}}
			  >
			  	批量导入
			  </Menu.Item>
			  <Menu.Item 
			  	key="4" 
			  	onClick={() => {
				  	tableStore.onExport({
				  		url: "/organization/excel/export",
				  		fileName: "机构管理"
				  	})
				  }}
			  >
			  	导出列表
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
								title: "查看机构",
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
								title: "编辑机构",
								formData: {...record, address1: record.address},
								options: organizatioStore.options
							})
						}}
					>
						编辑
					</Button>
					<Popconfirm
						title='确认注销该条数据吗？'
						onConfirm={() => organizatioStore.onLogout(record.id)}
					>
						<Button style={{marginLeft: '5px'}} size='small'>注销</Button>
					</Popconfirm>
				</Fragment>
			)
		}

		return (
			<div className="page organizatio">
				<div className="page_header">
					<div className="left">机构管理</div>
					<div className="right">
						<Button 
							onClick={() => {
								this.props.modalForm.onOpen({
									title: "新增机构", 
									options: organizatioStore.options, 
									formData: {}
								})
							}} 
							type="primary"
						>
							新增机构
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
						formItems={constants.organizatio.searchFormItems}
						options={organizatioStore.options}
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

export default Organizatio