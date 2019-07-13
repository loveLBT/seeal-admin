export const regNull = (val, tip) => {
	return new Promise((resolve, reject) => {
		if(!val) {
			reject(tip)
		}else {
			resolve(true)
		}
	})
}

export const regPassword = (val) => {
	return new Promise((resolve, reject) => {
		const reg = /\w{6,18}/
		if(!val) {
			reject("请输入密码")
		}else {
			if(!reg.test(val)) {
				reject("密码长度为6~18位")
			}else {
				resolve(true)
			}
		}
	})
}