import React, { Component, Fragment } from 'react'
import { Modal, Button, Icon, Form, Upload } from 'antd'
import axios from 'axios'

const ImportModal = (config) => (WrapperComponent) => {
	return class extends Component {
		constructor(props) {
		  super(props)
		
		  this.state = {
		  	title: "",
		  	visible: false,
		  	loading: false,
		  	data: {}
		  }
		}
		onOpen = (params) => {
			this.setState({
				title: params.title,
				visible: true,
				data: params.data
			})
		}
		onClose = () => {
			this.setState({
				title: "",
				visible: false,
				data: {}
			})
		}
		onDownLoad = async () => {
			const res = await axios({
				method: 'get',
				url: config.downloadUrl,
				responseType: 'blob'
			})
			const blob = new Blob([res])
			var a = document.createElement('a')
			a.download = `${config.downloadName}.xlsx`
			a.href = window.URL.createObjectURL(blob)
			a.click()
		}
		onUploadChange = (info) => {
			console.log(info)
		}
		render() {
			const { title, visible, loading, data } = this.state
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
			const uploadParams = {
				name: 'excel',
				action: config.uploadUrl,
				headers: {
					Authorization: data.token
				},
				onChange: this.onUploadChange.bind(this),
				accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
			}

			return (
				<Fragment>
					<WrapperComponent 
						ref={ref=>this.wrapperComponent=ref}
						{...this.props}
						importModal={newProps}
					/>
					<Modal
						title={title}
						visible={visible}
						onOk={this.onClose.bind(this)}
						onCancel={this.onClose.bind(this)}
						maskClosable={false}
						confirmLoading={loading}
					>
						<Form {...formItemLayout}>
							<Form.Item label="下载模板">
								<Button
                  type='default'
                  icon='cloud-download'
                  style={{marginLeft: '8px'}}
                  onClick={this.onDownLoad.bind(this)}
                >
                   下载模板
                </Button>
							</Form.Item>
							<Form.Item
								label="选择文件"
							>
								<Upload
                  {...uploadParams}
                >
                  <Button
                  	style={{marginLeft: "8px"}}
                    type='default'
                    icon='cloud-upload'
                  >
                    选择文件
                  </Button>
                </Upload>
							</Form.Item>
						</Form>
					</Modal>
				</Fragment>
			)
		}
	}
}

export default ImportModal