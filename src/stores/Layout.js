import { observable, action } from 'mobx'

import { wheel } from '../utils/commonFunc'

export default class Profile {
	@observable isShowMenu = true
	@observable scrollNavTabX = 0

	/**
	 * 控制左侧菜单显示隐藏
	 * @return {[type]} [description]
	 */
	@action onTraggleMenu = () => {
		this.isShowMenu = !this.isShowMenu
	}
	/**
	 * tab栏滚动到最右边边
	 * @param  {[type]} navBarWrapperWidth [description]
	 * @param  {[type]} tagListWidth       [description]
	 * @return {[type]}                    [description]
	 */
	@action onScrollRight = (navBarWrapperWidth, tagListWidth) => {
		if(tagListWidth > navBarWrapperWidth)
			this.scrollNavTabX = tagListWidth - navBarWrapperWidth
	}
	/**
	 * tab栏滚动到最左边
	 * @return {[type]} [description]
	 */
	@action onScrollLeft = () => {
		this.scrollNavTabX = 0
	}
	/**
	 * tab栏鼠标上下滚动
	 * @param  {[type]} event              [description]
	 * @param  {[type]} navBarWrapperWidth tab栏容器宽度
	 * @param  {[type]} tagListWidth       tab内容实际宽度
	 * @return {[type]}                    [description]
	 */
	@action onScroll = (event, navBarWrapperWidth, tagListWidth) => {
		const delta = wheel(event.nativeEvent)
		if(tagListWidth > navBarWrapperWidth) {
			if(delta < 0) {
				if((this.scrollNavTabX + 100) >= (tagListWidth-navBarWrapperWidth)) {
					this.scrollNavTabX = tagListWidth-navBarWrapperWidth
				}else {
					this.scrollNavTabX = this.scrollNavTabX + 100
				}
				
			}else {
				if((this.scrollNavTabX-100) <= 0) {
					this.scrollNavTabX = 0
				}else {
					this.scrollNavTabX = this.scrollNavTabX - 100
				}
			}
		}
	}
}