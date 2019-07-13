import React, { forwardRef } from 'react'
import { Input, Select, Cascader } from 'antd'
import { toJS } from 'mobx'

import ChinaAddress from '../../utils/ChinaAddress'

const TextArea = Input.TextArea

const FormItemWrapper = (props, ref) => {
	const { data } = props
	let formItemWrapper = null
	switch (data.type) {
		case "select":
			formItemWrapper = (
				<Select
					ref={ref}
					{...props} 
					placeholder={`请输入${data.title}`}
				>
					{data.childrens.map((opt) => 
						<Select.Option value={opt.value} key={opt.value}>{opt.label}</Select.Option>
					)}
				</Select>
			)
			break
		case "showSearchSelect":
			formItemWrapper = (
				<Select
					ref={ref} 
					{...props}
					showSearch 
					placeholder={`直接选择或者搜索${data.title}`}
				>
					{data.childrens.map((opt) => 
						<Select.Option value={opt.value} key={opt.value}>{opt.label}</Select.Option>
					)}
				</Select>
			)
			break
		case "textarea":
			formItemWrapper = (
				<TextArea 
					ref={ref}
					{...props}
					rows={4} 
					placeholder={`请输入${data.title}`} 
				/>
			)
			break
		case "addressSelect": 
			console.log(toJS(props.value))
			formItemWrapper = (
				<Cascader 
					ref={ref}
					value={props.value ? [props.value.province, props.value.city, props.value.district] : undefined}
					onChange={(val) => {
						if(props.onChange) {
							props.onChange({province: val[0], city: val[1], district: val[2]})
						}
					}}
					placeholder="请选择地区"
					options={ChinaAddress}
					fieldNames={{
						label: "name",
						value: "name",
						children: "list"
					}}
				/>
			)
			break
		default:
			formItemWrapper = (
				<Input 
					ref={ref}
					{...props}
					placeholder={`请输入${data.title}`}
				/>
			)
			break
	}

	return formItemWrapper
}

export default forwardRef(FormItemWrapper)