import React, { Component, Fragment } from 'react'
import { Modal, Form } from 'antd'

const ModalDetail = (config) => (WrapperComponent) => {
	return class extends Component {
		constructor(props) {
		  super(props)
		
		  this.state = {
		  	title: "",
		  	visible: false,
		  	formData: {}
		  }
		}
		onOpen = (params) => {
			this.setState({
				title: params.title,
				visible: true,
				formData: params.formData
			})
		}
		onClose = () => {
			this.setState({
				title: "",
				visible: false,
				formData: {}
			})
		}
		render() {
			const { title, visible, formData } = this.state
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
						modalDetail={newProps}
					/>
					<Modal
						title={title}
						visible={visible}
						onOk={this.onClose.bind(this)}
						onCancel={this.onClose.bind(this)}
						maskClosable={false}
						width={700}
					>
						<Form {...formItemLayout}>
							{config.formItems.map((item, index) => {
								let value = ''
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
										value = formData[keys[0]][keys[1]]
									}else {
										value = ''
									}
								}else {
									value = formData[item.dataIndex]
								}
								return (
									<Form.Item style={{marginBottom: "0"}} key={index} label={item.title}>
										{value}
									</Form.Item>
								)
							})}
						</Form>
					</Modal>
				</Fragment>
			)
		}
	}
}

export default ModalDetail