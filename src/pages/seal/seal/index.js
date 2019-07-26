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

@inject("sealStore")
@modalDetail({
	formItems: constants.seal.modalDetailItems
})
@modalForm({
	formItems: constants.seal.modalFormItems
})
@observer
class Seal extends Component {
	componentDidMount() {
		const { sealStore } = this.props
		sealStore.initData()
	}
	/**
	 * 新增（不写在store里面是为了给高阶组件modalForm调用此方法）
	 * @param  {[type]} config [description]
	 * @return {[type]}        [description]
	 */
	onModalSave = async (config) => {
		const { sealStore } = this.props
		const { tableStore } = sealStore
		let data = {...config.data}
		data.organizationId = data.organization ? data.organization.id : undefined
		data.sealTypeId = data.sealType ? data.sealType.id : undefined

		try {
			const res = await axios({
				method: data.id ? "put" : "post",
				url: "/seal",
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
		const { sealStore } = this.props
		const { tableStore } = sealStore
		const  dropDowmMenu = (
			<Menu>
				<Menu.Item 
					key="0"
					onClick={() => {
						sealStore.onStart(tableStore.selectedRowKeys.slice().join(','))
					}}
				>
					批量启用
			  </Menu.Item>
			  <Menu.Item 
			  	key="1"
			  	onClick={() => {
			  		sealStore.onStop(tableStore.selectedRowKeys.slice().join(','))
			  	}}
			  >
			  	批量停用
			  </Menu.Item>
			  <Menu.Item 
			  	key="2"
			  	onClick={() => {
			  		sealStore.onLogout(tableStore.selectedRowKeys.slice().join(','))
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
								title: "查看印章",
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
								title: "编辑印章",
								formData: record,
								options: sealStore.options
							})
						}}
					>
						编辑
					</Button>
				</Fragment>
			)
		}

		return (
			<div className="page organizatio">
				<div className="page_header">
					<div className="left">印章管理</div>
					<div className="right">
						<Button 
							onClick={() => {
								this.props.modalForm.onOpen({
									title: "新增印章", 
									options: sealStore.options, 
									formData: {}
								})
							}} 
							type="primary"
						>
							新增印章
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
						formItems={constants.seal.searchFormItems}
						options={sealStore.options}
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

export default Seal