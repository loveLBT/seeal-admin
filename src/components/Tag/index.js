import React, { Component } from 'react'
import { Icon } from 'antd'
import classnames from 'classnames'

import './index.less'

class Tag extends Component {
	static defaultProps = {
	  isActive: false
	}
	render() {
		const { isActive } = this.props

		return (
			<div className="tag">
				<div className="tag_wrapper">
					<span className={classnames("dot",{"active": isActive})}></span>
					<span className="text">公共管理</span>
				</div>
				<Icon className="close" style={{color: "#ccc", fontSize: "14px"}} type="close" />
			</div>
		)
	}
}

export default Tag