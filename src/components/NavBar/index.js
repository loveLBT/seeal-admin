import React, { Component } from 'react'
import { Icon } from 'antd'
import { withRouter } from 'react-router-dom'

import './index.less'
import Tag from '../Tag'

/**
 * 鼠标滚轮事件
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
const wheel = (event) => {
	let delta = 0
    if (!event) event = window.event
    if (event.wheelDelta) {						//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
        delta = event.wheelDelta/120
        if (window.opera) delta = -delta		//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    } else if (event.detail) {					//FF浏览器使用的是detail,其值为“正负3”
        delta = -event.detail/3;
    }
    
    return delta
}
const STORAGE_TAB_MENUS = "STORAGE_TAB_MENUS"

@withRouter
class NavBar extends Component {
	static defaultProps = {
	  data: []
	}
	constructor(props) {
	  super(props)
		//从session获取菜单数据
		const strMenus = sessionStorage.getItem(STORAGE_TAB_MENUS)
	  this.state = {
	  	scrollX: 0,
	  	menus: strMenus ? JSON.parse(strMenus) : [],
	  	currentMenu: {}
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
		const { data } = this.props
		for(let item of data) {
			if(pathname === item.link) {
				this.addMenu(item)
				this.setState({ currentMenu: item }, () => {
					this.mathScrooX(item)
				})
			}
		}
	}
	/**
	 * 匹配当前菜单的位置
	 * @param  {[type]} currentMenu [description]
	 * @return {[type]}             [description]
	 */
	mathScrooX = (currentMenu) => {
		const navBarWrapperWidth = this.navBarWrapper.clientWidth
		const tag = this[`tag-${currentMenu.id}`].tag
		const tagOffsetLeft = tag.offsetLeft + tag.offsetWidth + 5
		if(tagOffsetLeft - navBarWrapperWidth > 0) {
			this.setState({
				scrollX: tagOffsetLeft - navBarWrapperWidth
			})
		}else {
			this.setState({
				scrollX: 0
			})
		}
	}
	/**
	 * 删除菜单
	 * @param  {[type]} menu  [description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	removeMenu = (menu, index) => {
		const { menus, currentMenu } = this.state
		
		// 用filter函数过滤掉点击菜单
		const newMenus = menus.filter((item) => item.link !== menu.link)
		this.setState({
			menus: newMenus
		})
		sessionStorage.setItem(STORAGE_TAB_MENUS, JSON.stringify(newMenus))
		
		// 判断当前菜单是不是被点击得菜单
		if(menu.link === currentMenu.link) {
			// 判断点击得菜单是不是最后一个菜单
 			if(index === menus.length-1 && index !==0) {
 				this.props.history.push(menus[index-1].link)
 			}else{
 				this.props.history.push(menus[index+1].link)
 			}
		}
	}
	/**
	 * 添加菜单
	 * @param  {[type]} menu [description]
	 * @return {[type]}      [description]
	 */
	addMenu = (menu) => {
		const { menus } = this.state
		//判断菜单是否存在
		const isHav = menus.some((item) => item.link === menu.link)
		if(!isHav) {
			this.setState({
				menus: [...menus, menu]
			})
			sessionStorage.setItem(STORAGE_TAB_MENUS, JSON.stringify([...menus, menu]))
		}
	}
	/**
	 * tab栏滚动到最右边边
	 * @param  {[type]} navBarWrapperWidth [description]
	 * @param  {[type]} tagListWidth       [description]
	 * @return {[type]}                    [description]
	 */
	onScrollRight = (navBarWrapperWidth, tagListWidth) => {
		if(tagListWidth > navBarWrapperWidth)
			this.setState({
				scrollX: tagListWidth - navBarWrapperWidth
			})
	}
	/**
	 * tab栏滚动到最左边
	 * @return {[type]} [description]
	 */
	onScrollLeft = () => {
		this.setState({
			scrollX: 0
		})
	}
	/**
	 * tab栏鼠标上下滚动
	 * @param  {[type]} event              [description]
	 * @param  {[type]} navBarWrapperWidth tab栏容器宽度
	 * @param  {[type]} tagListWidth       tab内容实际宽度
	 * @return {[type]}                    [description]
	 */
	onScroll = (event, navBarWrapperWidth, tagListWidth) => {
		const { scrollX } = this.state
		const delta = wheel(event.nativeEvent)
		if(tagListWidth > navBarWrapperWidth) {
			if(delta < 0) {
				if((scrollX + 100) >= (tagListWidth-navBarWrapperWidth)) {
					this.setState({
						scrollX: tagListWidth-navBarWrapperWidth
					})
				}else {
					this.setState({
						scrollX: scrollX + 100
					})
				}
			}else {
				if((scrollX-100) <= 0) {
					this.setState({
						scrollX: 0
					})
				}else {
					this.setState({
						scrollX: scrollX - 100
					})
				}
			}
		}
	}
	render() {
		const { scrollX, menus, currentMenu } = this.state

		return (
			<div className="nav_bar">
				<div onClick={this.onScrollLeft.bind(this)} className="scroll_left">
					<Icon type="left" />
				</div>
				<div ref={ref=>this.navBarWrapper=ref} className="nav_bar_wrapper">
					<div
						ref={ref=>this.tagList=ref} 
						style={{left: `-${scrollX}px`}} 
						className="tag_list"
						onWheel={(event) => {
							const navBarWrapperWidth = this.navBarWrapper.clientWidth
							const tagListWidth = this.tagList.clientWidth
							this.onScroll(event, navBarWrapperWidth, tagListWidth)
						}}
					>
						{menus.map((item, index) => 
							<Tag 
								ref={ref=>this[`tag-${item.id}`]=ref}
								key={index}
								{...item} 
								isActive={item.link === currentMenu.link} 
								onClose={this.removeMenu.bind(this, item, index)}
							/>
						)}
					</div>
				</div>
				<div 
					onClick={() => { 
						const navBarWrapperWidth = this.navBarWrapper.clientWidth
						const tagListWidth = this.tagList.clientWidth
						this.onScrollRight(navBarWrapperWidth, tagListWidth)
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