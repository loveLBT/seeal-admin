import React,{ Component } from 'react'
import { inject, observer } from 'mobx-react'

import './index.less'
import GlobalHeader from '../../components/GlobalHeader'
import NavBar from '../../components/NavBar'
import SideMenu from '../../components/SideMenu'
import menus from '../../constants/menus'

@inject("layoutStore")
@observer
class BasicLayout extends Component {
	render() {
		const { layoutStore } = this.props

		return (
			<div className="basic_layout">
				<div className="layou_header">
					<GlobalHeader 
						onTraggleMenu={layoutStore.onTraggleMenu} 
						isShowMenu={layoutStore.isShowMenu}
					/>
				</div>
				<div className="layout_wrapper">
					<div className="layout_wrapper_left">
						<SideMenu 
							isShowMenu={layoutStore.isShowMenu} 
							firstMenus={menus.firstMenus}
							secondMenus={menus.secondMenus}
						/>
					</div>
					<div className="layout_wrapper_right">
						<div className="layout_wrapper_nav">
							<NavBar 
								data={menus.secondMenus}
							/>
						</div>
						<div className="layout_wrapper_content">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default BasicLayout