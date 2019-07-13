import React, { Component } from 'react'

import './index.less'

class LineInput extends Component {
	static defaultProps = {
	  icon: "",
	  type: "input",
	  placeholder: "请输入",
	  value: "",
	  onChange: () => {}
	}
	onChange = (e) => {
		this.props.onChange(e.target.value)
	}
	render () {
		const { icon, type, placeholder, value } = this.props

		return (
			<div className="line_input">
				<div className="icon">
					<img src={icon} alt=""/>
				</div>
				<div className="input">
					<input value={value} placeholder={placeholder} type={type} onChange={this.onChange.bind(this)} />
				</div>
			</div>
		)
	}
}

export default LineInput