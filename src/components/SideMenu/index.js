import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import './index.less'
import icons from '../../constants/icons'

class SideMenu extends Component {
	static defaultProps = {
	  	isShowMenu: true
	}
	render() {
		const { isShowMenu } = this.props

		return(
			<div className={classnames("side_menu",isShowMenu ? "show" : "hide")}>
				<ul className="menu">
					<li>
						<img className="s" src={icons.menu_1_s} alt=""/>
						<img className="h" src={icons.menu_1_h} alt=""/>
						<Link to="/">公共管理</Link>
						<div className="second_menu">
							<div className="second_menu_wrap">
								<ul className="second_menu_item">
									<li>机构管理</li>
									<li>人员管理</li>
									<li>权限管理</li>
									<li>印章管理</li>
									<li>参数管理</li>
								</ul>
							</div>
						</div>
					</li>
					<li>
						<img className="s" src={icons.menu_2_s} alt=""/>
						<img className="h" src={icons.menu_2_h} alt=""/>
						<Link to="/">电子化用印</Link>
					</li>
					<li className="active">
						<img className="s" src={icons.menu_3_s} alt=""/>
						<img className="h" src={icons.menu_3_h} alt=""/>
						<Link to="/">自动化用印</Link>
					</li>
					<li>
						<img className="s" src={icons.menu_4_s} alt=""/>
						<img className="h" src={icons.menu_4_h} alt=""/>
						<Link to="/">统计报表</Link>
					</li>
					<li>
						<img className="s" src={icons.menu_5_s} alt=""/>
						<img className="h" src={icons.menu_5_h} alt=""/>
						<Link to="/">预警管理</Link>
					</li>
				</ul>
			</div>
		)
	}
}

export default SideMenu