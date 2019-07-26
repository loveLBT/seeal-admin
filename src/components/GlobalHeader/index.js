import React,{ Component } from 'react'
import { Icon } from 'antd'

import './index.less'
import icons from '../../constants/icons'

class GloablHeader extends Component {
	static defaultProps = {
	  	onTraggleMenu: () => {},
	  	isShowMenu: true
	}
	render() {
		const { onTraggleMenu, isShowMenu } = this.props

		return (
			<div className="global_header">

				<h3 className="title" style={{width: isShowMenu ? "168px" : "0"}}>印控仪后台系统</h3>
				<Icon 
					onClick={onTraggleMenu} 
					className="action" 
					style={{fontSize: "20px", color: "#fff"}} 
					type={isShowMenu ? "menu-fold" : "menu-unfold"} 
				/>
				<ul className="right">
					{/*<li>
						<span>Jellal</span>
						<img src={icons.account} alt=""/>
						<ul>
							<li>
								asdasda
							</li>
						</ul>
					</li>
					<li>
						<img src={icons.account} alt=""/>
					</li>
					<li>
						<img src={icons.account} alt=""/>
					</li>*/}
				</ul>
			</div>
		)
	}
}

export default GloablHeader