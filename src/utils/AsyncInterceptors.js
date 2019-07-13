import axios from 'axios'
import { message } from 'antd'

import stores from '../stores/'

const { profileStore } = stores
/**
 * 异步请求拦截
 * @param  {[type]} (config [description]
 * @return {[type]}         [description]
 */
axios.interceptors.request.use((config)=>{
	if( profileStore.userInfo.token) {
		config.headers['Authorization'] = profileStore.userInfo.token
	}
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	return config
},(error) => {
	return Promise.reject(error)
})

axios.interceptors.response.use((response)=>{
	return response.data
}, (error) => {
	message.error('网络请求失败')
	let errorMsg = ''
	if(error && error.response) {
		errorMsg = requestError(error.response.status)
	}else {
		errorMsg = '网络请求失败'
	}

	return Promise.reject(errorMsg)
})

/**
 * 请求失败提示
 * @param  {[type]} code [description]
 * @return {[type]}      [description]
 */
const requestError = (code) => {
	let errorMsg = ''
	switch (code) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '请求权限不足'
			break
		case 404:
			errorMsg = '请求api不存在'
			break
		case 500:
			errorMsg = '请求服务端失败'
			break
		default:
			errorMsg = '网络请求失败'
			break;
	}
	return errorMsg
}