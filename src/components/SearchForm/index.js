import React,{ Component } from 'react'
import { Button, Form, Table } from 'antd'

import FormItemWrapper from '../../components/FormItemWrapper'
import './index.less'

@Form.create()
class SearchForm extends Component {
	static defaultProps = {
	  onSearch: () => {},
	  onReset: () => {},
	  formItems: [],
	  formData: {},
	  options: {}
	}
	onSearch = (e) => {
		e.preventDefault()
		const { form } = this.props
		form.validateFields((err, values) => {
			if(!err) {
				this.props.onSearch(values)
			}
		})
	}
	onReset = (e) => {
		e.preventDefault()
		const { form } = this.props
		form.resetFields()
		this.props.onReset()
	}
	
	render() {
		const { form, formItems, formData, options } = this.props
		const { getFieldDecorator  } = form

		return (
			<Form className="form" layout="inline" onSubmit={this.onSearch.bind(this)}>
				{formItems.map((item, index) => {
					let childrens = []
					let opts = {}
					if(options[item.dataIndex]) {
						childrens = options[item.dataIndex]
					}
					opts.initialValue = formData[item.dataIndex]

					return (
						<Form.Item className="form_item" key={index}>
							{getFieldDecorator(item.dataIndex, opts)(
								<FormItemWrapper data={{...item, childrens}} />
							)}
						</Form.Item>
					)
				})}
				
				
				<Form.Item className="form_item">
					<Button type="primary" htmlType="submit">数据查询</Button>
					<Button onClick={this.onReset.bind(this)} style={{marginLeft: "5px"}}>重置</Button>
				</Form.Item>
			</Form>
		)
	}
}

export default SearchForm