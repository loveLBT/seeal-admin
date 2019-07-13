/**
 * 鼠标滚轮事件
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
export const wheel = (event) => {
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