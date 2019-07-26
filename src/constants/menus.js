import icons from './icons'

export default {
	firstMenus: [
		{ name: "公共管理", link: "/common", id: 1, pid: 0, img1: icons.menu_1_s, img2: icons.menu_1_h },
		{ name: "印章管理", link: "/seal", id: 2, pid: 0, img1: icons.menu_2_s, img2: icons.menu_2_h },
		{ name: "设备管理", link: "/device", id: 3, pid: 0, img1: icons.menu_3_s, img2: icons.menu_3_h },
		{ name: "用印管理", link: "/xx", id: 4, pid: 0, img1: icons.menu_3_s, img2: icons.menu_3_h },
		{ name: "统计报表", link: "/xx", id: 5, pid: 0, img1: icons.menu_4_s, img2: icons.menu_4_h },
		{ name: "预警管理", link: "/xx", id: 6, pid: 0, img1: icons.menu_5_s, img2: icons.menu_5_h },
	],
	secondMenus: [
		{ name: "机构管理", link: "/common/organizatio", pid: 1, id: 100001 },
		{ name: "角色管理", link: "/common/role", pid: 1, id: 100002 },
		{ name: "资源管理", link: "/common/resources", pid: 1, id: 100003 },
		{ name: "权限管理", link: "/common/jurisdiction", pid: 1, id: 100004 },
		{ name: "用户管理", link: "/common/user", pid: 1, id: 100005 },

		{ name: "印章类型", link: "/seal/type", pid: 2, id: 200001 },
		{ name: "印章管理", link: "/seal", pid: 2, id: 200002 },
		{ name: "电子印章管理", link: "/aa", pid: 2, id: 200003 },

		{ name: "设备类型", link: "/device/type", pid: 3, id: 300001 },
		{ name: "设备管理", link: "/device", pid: 3, id: 300002 },
		{ name: "印控仪电子解锁", link: "/bb", pid: 3, id: 300003 },
		{ name: "用印机应急操作管理", link: "/cc", pid: 3, id: 300004 },
	]
}