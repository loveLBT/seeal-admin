import React,{ Component, Fragment } from 'react'
import { Modal, Form, message } from 'antd'

import FormItemWrapper from '../components/FormItemWrapper'

const ModalForm = (config) => (WrapperComponent) => {
	return Form.create()(
		class extends Component {
			constructor(props) {
			  super(props)

			  this.state = {
			  	visible: false,
			  	formData: {},
			  	title: "",
			  	options: {},
			  	loading: false
			  }
			}
			/**
			 * 弹出modal并设置数据
			 * @param  {[type]} params [description]
			 * @return {[type]}        [description]
			 */
			onOpen = (params) => {
				this.setState({
					title: params.title,
					visible: true,
					formData: params.formData || {},
					options: params.options || {}
				})
			}
			/**
			 * 关闭modal并清空数据
			 * @return {[type]} [description]
			 */
			onClose = () => {
				const { form } = this.props
				form.resetFields()
				this.setState({
					visible: false,
			  	formData: {},
			  	title: "",
			  	options: {}
				})
			}
			onSave = (e) => {
				const that = this
				const { form } = this.props
				const { formData } = this.state

				form.validateFields((err, values) => {
					if(!err) {
					 this.setState({loading: true})
					 this.wrapperComponent.onModalSave({
					 	data: {...values, id: formData.id},
					 	success: (res) => {
					 		message.success("操作成功")
					 		this.setState({loading: false})
					 		this.onClose()
					 	},
					 	fail: (error) => {
					 		message.error(error)
					 		this.setState({loading: false})
					 	}
					 })
					}
				})
			}
			render(){
				const { form } = this.props
				const { getFieldDecorator } = form
				const { title, visible, formData, options, loading } = this.state
				const newProps = {
					onOpen: this.onOpen
				}
				const formItemLayout = {
					labelCol: {
						xs: {span: 24},
            sm: {span: 4}
					},
					wrapperCol: {
						xs: {span: 24},
            sm: {span: 20}
					}
				}

				return (
					<Fragment>
						<WrapperComponent 
							ref={ref=>this.wrapperComponent=ref}
							{...this.props}
							modalForm={newProps}
						/>
						<Modal
							title={title}
							visible={visible}
							onOk={this.onSave.bind(this)}
							onCancel={this.onClose.bind(this)}
							maskClosable={false}
							confirmLoading={loading}
							width={700}
						>
							<Form {...formItemLayout}>
								{config.formItems.map((item, index) => {
									let childrens = []
									let opts = {}
									if(options[item.dataIndex]) {
										childrens = options[item.dataIndex]
									}
									/**
									 * 判断是否是二级数据
									 * @param  {[type]} item.dataIndex.indexOf(".") !             [description]
									 * @return {[type]}                             [description]
									 */
									if(item.dataIndex.indexOf(".") !== -1) {
										let keys = item.dataIndex.split('.')
										/**
										 * 回去二级数据前判断一级数据是否存在
										 * @param  {[type]} formData[keys[0]] [description]
										 * @return {[type]}                   [description]
										 */
										if(formData[keys[0]]) { 
											opts.initialValue = formData[keys[0]][keys[1]]
										}else {
											opts.initialValue = undefined
										}
									}else {
										opts.initialValue = formData[item.dataIndex]
									}
									
									opts.rules = item.rules || []

									return (
										<Form.Item label={item.title} key={index}>
											{getFieldDecorator(item.dataIndex, opts)(
												<FormItemWrapper data={{...item, childrens}} />
											)}
										</Form.Item>
									)
								})}
							</Form>
						</Modal>
					</Fragment>
				)
			}
		}
	) 
}

export default ModalForm