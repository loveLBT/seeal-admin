import React, { Component } from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import './index.less'

class Tag extends Component {
	static defaultProps = {
	  isActive: false,
	  onClose: () => {}
	}
	render() {
		const { isActive, name, link, onClose } = this.props

		return (
			<div 
				ref={ref=>this.tag=ref} 
				className="tag"
			>
				<Link to={link} className="tag_wrapper">
					<span className={classnames("dot",{"active": isActive})}></span>
					<span className="text">{name}</span>
				</Link>
				<Icon 
					className="close" 
					style={{color: "#ccc", fontSize: "14px"}} 
					type="close" 
					onClick={onClose}
				/>
			</div>
		)
	}
}

export default Tag