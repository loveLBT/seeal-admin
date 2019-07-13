import React, { Component } from 'react'
import { Icon } from 'antd'

import './index.less'
import Tag from '../Tag'

class NavBar extends Component {
	static defaultProps = {
		onScrollRight: () => {},
		onScrollLeft: () => {},
		scrollNavTabX: 0,
		onScroll: () => {}
	}
	render() {
		const { onScrollRight, onScrollLeft, scrollNavTabX, onScroll } = this.props

		return (
			<div className="nav_bar">
				<div onClick={onScrollLeft} className="scroll_left">
					<Icon type="left" />
				</div>
				<div ref={ref=>this.navBarWrapper=ref} className="nav_bar_wrapper">
					<div
						ref={ref=>this.tagList=ref} 
						style={{left: `-${scrollNavTabX}px`}} 
						className="tag_list"
						onWheel={(event) => {
							const navBarWrapperWidth = this.navBarWrapper.clientWidth
							const tagListWidth = this.tagList.clientWidth
							onScroll(event, navBarWrapperWidth, tagListWidth)
						}}
					>
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
						<Tag />
					</div>
				</div>
				<div 
					onClick={() => { 
						const navBarWrapperWidth = this.navBarWrapper.clientWidth
						const tagListWidth = this.tagList.clientWidth
						onScrollRight(navBarWrapperWidth, tagListWidth)
					}} 
					className="scroll_right"
				>
					<Icon type="right" />
				</div>
				<div className="close_right">
					<Icon type="close-circle" />
					<ul className="close_right_wrapper">
						<li>关闭所有</li>
						<li>关闭其他</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default NavBar