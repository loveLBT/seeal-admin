import { observable, action } from 'mobx'


export default class Profile {
	@observable isShowMenu = true 	//菜单栏显示隐藏状态
	@observable scrollNavTabX = 0	//标签栏横向滚动距离

	/**
	 * 控制左侧菜单显示隐藏
	 * @return {[type]} [description]
	 */
	@action onTraggleMenu = () => {
		this.isShowMenu = !this.isShowMenu
	}
}