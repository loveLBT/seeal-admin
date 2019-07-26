import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

import './index.less'

@withRouter
class SideMenu extends Component {
	static defaultProps = {
	  	isShowMenu: true,
	  	firstMenus: [],
	  	secondMenus: []
	}
	constructor(props) {
	  super(props)
	
	  this.state = {
	  	menuId: null
	  }
	}
	componentWillMount () {
		const { location } = this.props
		this.mathPathname(location.pathname)
	}
	componentWillReceiveProps (nextProps) {
		const { location } = nextProps
		this.mathPathname(location.pathname)
	}
	/**
	 * 根据路由pathname匹配firstMenus中得数据
	 * @param  {[type]} pathname [description]
	 * @return {[type]}          [description]
	 */
	mathPathname = (pathname) => {
		const { menuId } = this.state
		const { firstMenus } = this.props

		for(let item of firstMenus) {
			if(pathname.indexOf(item.link) !== -1 && menuId !== item.id) {
				this.setState({ menuId: item.id })
			}
		}
	}
	render() {
		const { menuId } = this.state
		const { isShowMenu, firstMenus, secondMenus } = this.props

		return(
			<div className={classnames("side_menu",isShowMenu ? "show" : "hide")}>
				<ul className="menu">
					{firstMenus.map((item, i) => 
						<li className={classnames("menu_item", {"active": menuId === item.id})} key={i}>
							<img className="menu_img s" src={item.img1} alt=""/>
							<img className="menu_img h" src={item.img2} alt=""/>
							<Link className="menu_name" to={item.link}>{item.name}</Link>
							{secondMenus.filter((list) => list.pid === item.id).length > 0 && 
								<div className="second_menu">
									<div className="second_menu_wrap">
										<div className="second_menu_item">
											{secondMenus.filter((list) => list.pid === item.id).map((list, l) => 
												<Link key={l} className="second_menu_name" to={list.link}>{list.name}</Link>
											)}
										</div>
									</div>
								</div>
							}
						</li>
					)}				
				</ul>
			</div>
		)
	}
}

export default SideMenu