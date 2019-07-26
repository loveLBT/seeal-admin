import React,{ Fragment } from 'react'

export default {
	organizatio: {
		organizationLevel: [
			{value: "总行", label: "总行"},
			{value: "省行", label: "省行"},
			{value: "市行", label: "市行"},
			{value: "支行", label: "支行"},
			{value: "网点", label: "网点"}
		],
		organizationRange: [
			{value: "指定机构", label: "指定机构"},
			{value: "指定机构及下辖", label: "指定机构及下辖"},
			{value: "辖内机构", label: "辖内机构"}
		],
		tableColumns: [
			{
		    title: '机构代码',
		    dataIndex: 'organizationCode',
		    key: 'organizationCode',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '机构名称',
		    dataIndex: 'organizationName',
		    key: 'organizationName'
		  },
		  {
		    title: '机构级别',
		    dataIndex: 'organizationLevel',
		    key: 'organizationLevel'
		  },
		  {
		    title: '联系人',
		    dataIndex: 'contactUser',
		    key: 'contactUser'
		  },
		  {
		    title: '联系电话',
		    dataIndex: 'phoneNum',
		    key: 'phoneNum'
		  },
		  {
		    title: '详细地址',
		    dataIndex: 'address.fullAddress',
		    key: 'address.fullAddress'
 		  },
		  {
		    title: '父级机构',
		    dataIndex: 'parentOrganization.organizationName',
		    key: 'parentOrganization.organizationName'
		  },
		  {
		    title: '机构状态',
		    dataIndex: 'organizationState',
		    key: 'organizationState'
		  }
		],
		searchFormItems: [
			{
		    title: '机构代码',
		    dataIndex: 'organizationCode',
		   	type: 'input'
		  },
		  {
		    title: '机构名称',
		    dataIndex: 'organizationName',
		    type: 'input'
		  },
		  {
		    title: '机构级别',
		    dataIndex: 'organizationLevel',
		    type: 'select'
		  },
		  {
		    title: '父级机构',
		    dataIndex: 'parentOrganization.id',
		    type: 'showSearchSelect'
		  },
		  {
		    title: '联系人',
		    dataIndex: 'contactUser',
		    type: 'input'
		  },
		  {
		    title: '联系电话',
		    dataIndex: 'phoneNum',
		    type: 'input'
		  },
		  {
		    title: '详细地址',
		    dataIndex: 'address.fullAddress',
		    type: 'input'
		  },
		  {
		    title: '指定机构',
		    dataIndex: 'organizationRange',
		    type: 'select'
		  }
		],
		modalFormItems: [
			{
		    title: '机构代码',
		    dataIndex: 'organizationCode',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入机构代码'}]
		  },
		  {
		    title: '机构名称',
		    dataIndex: 'organizationName',
		    type: 'input',
		    rules: [{required: true, message: '请输入机构名称'}]
		  },
		  {
		    title: '机构级别',
		    dataIndex: 'organizationLevel',
		    type: 'select'
		  },
		  {
		    title: '父级机构',
		    dataIndex: 'parentOrganization.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '请输入机构名称'}]
		  },
		  {
		    title: '联系人',
		    dataIndex: 'contactUser',
		    type: 'input'
		  },
		  {
		    title: '联系电话',
		    dataIndex: 'phoneNum',
		    type: 'input'
		  },
		  {
		    title: '地区选择',
		    dataIndex: 'address1',
		    type: 'addressSelect'
		  },
		  {
		    title: '详细地址',
		    dataIndex: 'address.fullAddress',
		    type: 'input'
		  },
		  {
		  	title: '备注',
		  	dataIndex: 'remark',
		  	type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '机构代码',
		    dataIndex: 'organizationCode'
		  },
		  {
		    title: '机构名称',
		    dataIndex: 'organizationName'
		  },
		  {
		    title: '机构级别',
		    dataIndex: 'organizationLevel'
		  },
		  {
		    title: '父级机构',
		    dataIndex: 'parentOrganization.name'
		  },
		  {
		    title: '联系人',
		    dataIndex: 'contactUser',
		  },
		  {
		    title: '联系电话',
		    dataIndex: 'phoneNum'
		  },
		  {
		    title: '详细地址',
		    dataIndex: 'address.fullAddress'
		  },
		  {
		  	title: '备注',
		  	dataIndex: 'remark'
		  }
		]
	},
	role: {
		tableColumns: [
			{
		    title: '角色名称',
		    dataIndex: 'roleName',
		    key: 'roleName',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '角色代码',
		    dataIndex: 'roleCode',
		    key: 'roleCode'
		  },
		  {
		    title: '父级角色',
		    dataIndex: 'parentRole.roleName',
		    key: 'parentRole.roleName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    key: 'remark'
		  }
		],
		searchFormItems: [
			{
		    title: '角色名称',
		    dataIndex: 'roleName',
		   	type: 'input'
		  },
		  {
		    title: '角色代码',
		    dataIndex: 'roleCode',
		    type: 'input'
		  },
		  {
		    title: '父级角色',
		    dataIndex: 'parentRole.id',
		    type: 'showSearchSelect'
		  },
		],
		modalFormItems: [
			{
		    title: '角色名称',
		    dataIndex: 'roleName',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入机构代码'}]
		  },
		  {
		    title: '角色代码',
		    dataIndex: 'roleCode',
		    type: 'input',
		    rules: [{required: true, message: '请输入机构名称'}]
		  },
		  {
		    title: '父级角色',
		    dataIndex: 'parentRole.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '直接选择或者搜索父级角色'}]
		  },
		  {
		    title: '分配权限',
		    dataIndex: 'permissionIds',
		    type: 'treeSelect',
		    rules: [{required: true, message: '请至少选择一个权限'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  },
		],
		modalDetailItems: [
			{
		    title: '角色名称',
		    dataIndex: 'roleName'
		  },
		  {
		    title: '角色代码',
		    dataIndex: 'roleCode'
		  },
		  {
		    title: '父级角色',
		    dataIndex: 'parentRole.roleName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  },
		]
	},
	resources: {
		httpMethod: [
			{value: "GET", label: "GET"},
			{value: "POST", label: "POST"},
			{value: "PUT", label: "PUT"},
			{value: "DELETE", label: "DELETE"}
		],
		tableColumns: [
			{
		    title: '资源名称',
		    dataIndex: 'resourceName',
		    key: 'resourceName',
		    width: 220,
		    fixed: 'left'
		  },
		  {
		    title: '资源地址',
		    dataIndex: 'resourceUrl',
		    key: 'resourceUrl',
		    width: 220,
		  },
		  {
		    title: '请求类型',
		    dataIndex: 'httpMethod',
		    key: 'httpMethod'
		  },
		  {
		    title: '允许删除',
		    dataIndex: 'isAllowDelete',
		    key: 'isAllowDelete',
		    render: (text, record) => <Fragment>{record.isAllowDelete ? "是" : "否"}</Fragment>
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    key: 'remark'
		  }
		],
		searchFormItems: [
			{
		    title: '资源名称',
		    dataIndex: 'resourceName',
		   	type: 'input'
		  },
		  {
		    title: '资源地址',
		    dataIndex: 'resourceUrl',
		    type: 'input'
		  },
		  {
		    title: '请求类型',
		    dataIndex: 'httpMethod',
		    type: 'select'
		  }
		],
		modalFormItems: [
			{
		    title: '资源名称',
		    dataIndex: 'resourceName',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入机构代码'}]
		  },
		  {
		    title: '资源地址',
		    dataIndex: 'resourceUrl',
		    type: 'input',
		    rules: [{required: true, message: '请输入机构名称'}]
		  },
		  {
		    title: '请求类型',
		    dataIndex: 'httpMethod',
		    type: 'select',
		    rules: [{required: true, message: '请输入机构名称'}]
		  },
		  {
		    title: '允许删除',
		    dataIndex: 'isAllowDelete',
		    type: 'checkbox',
		    valuePropName: 'checked'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '资源名称',
		    dataIndex: 'resourceName'
		  },
		  {
		    title: '资源地址',
		    dataIndex: 'resourceUrl'
		  },
		  {
		    title: '请求类型',
		    dataIndex: 'httpMethod'
		  },
		  {
		    title: '允许删除',
		    dataIndex: 'isAllowDelete',
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	jurisdiction: {
		tableColumns: [
			{
		    title: '权限名称',
		    dataIndex: 'permissionName',
		    key: 'permissionName',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '权限代码',
		    dataIndex: 'permissionCode',
		    key: 'permissionCode'
		  },
		  {
		    title: '父级权限',
		    dataIndex: 'parentPermission.permissionName',
		    key: 'parentPermission.permissionName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    key: 'remark'
		  }
		],
		searchFormItems: [
			{
		    title: '权限名称',
		    dataIndex: 'permissionName',
		   	type: 'input'
		  },
		  {
		    title: '权限代码',
		    dataIndex: 'permissionCode',
		    type: 'input'
		  },
		  {
		    title: '父级权限',
		    dataIndex: 'parentPermission.id',
		    type: 'select'
		  }
		],
		modalFormItems: [
			{
		    title: '权限名称',
		    dataIndex: 'permissionName',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入权限名称'}]
		  },
		  {
		    title: '权限代码',
		    dataIndex: 'permissionCode',
		    type: 'input',
		    rules: [{required: true, message: '请输入权限代码'}]
		  },
		  {
		    title: '父级权限',
		    dataIndex: 'parentPermission.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '请选择父级权限'}]
		  },
		  {
		    title: '权限资源',
		    dataIndex: 'resourceIds',
		    type: 'mutipleSelect',
		    rules: [{required: true, message: '请至少选择一个权限资源'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '权限名称',
		    dataIndex: 'permissionName'
		  },
		  {
		    title: '权限代码',
		    dataIndex: 'permissionCode'
		  },
		  {
		    title: '父级权限',
		    dataIndex: 'parentPermission.permissionName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	user: {
		accountState: [
			{value: "未启用", label: "未启用"},
			{value: "已启用", label: "已启用"},
			{value: "已停用", label: "已停用"},
			{value: "已注销", label: "已注销"},
		],
		tableColumns: [
			{
		    title: '账号名称',
		    dataIndex: 'username',
		    key: 'username',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName',
		    key: 'organization.organizationName'
		  },
		  /*{
		    title: '角色',
		    dataIndex: 'parentPermission.permissionName',
		    key: 'parentPermission.permissionName'
		  },*/
		  {
		    title: '用户状态',
		    dataIndex: 'accountState',
		    key: 'accountState'
		  },
		  {
		    title: '用户状态',
		    dataIndex: 'remark',
		    key: 'remark'
		  }
		],
		searchFormItems: [
			{
		    title: '账号名称',
		    dataIndex: 'username',
		   	type: 'input'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.id',
		    type: 'showSearchSelect'
		  },
		  {
		    title: '用户状态',
		    dataIndex: 'accountState',
		    type: 'select'
		  }
		],
		modalFormItems: [
			{
		    title: '账号名称',
		    dataIndex: 'username',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入账号名称'}]
		  },
		  {
		    title: '密码',
		    dataIndex: 'password',
		    type: 'input',
		    rules: [{required: true, message: '请输入密码'}]
		  },
		/*  {
		    title: '确认密码',
		    dataIndex: 'confirm',
		    type: 'input',
		    rules: [{required: true, message: '请输入确认密码'}]
		  },*/
		  {
		    title: '所属机构',
		    dataIndex: 'organization.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '请选择机构名称'}]
		  },
		  {
		    title: '分配角色',
		    dataIndex: 'roleIds',
		    type: 'mutipleSelect',
		    rules: [{required: true, message: '请选择分配角色'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '账号名称',
		    dataIndex: 'username'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName'
		  },
		  {
		    title: '账号状态',
		    dataIndex: 'accountState'
		  },
		  /*{
		    title: '分配角色',
		    dataIndex: 'parentPermission.permissionName'
		  },*/
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	device: {
		deviceState: [
			{value: "未启用", label: "未启用"},
			{value: "已启用", label: "已启用"},
			{value: "已停用", label: "已停用"},
			{value: "已注销", label: "已注销"},
		],
		tableColumns: [
			{
		    title: '设备编号',
		    dataIndex: 'deviceCode',
		    key: 'deviceCode',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '设备序列号',
		    dataIndex: 'deviceSequenceNo',
		    key: 'deviceSequenceNo'
		  },
		  {
		    title: '设备型号',
		    dataIndex: 'deviceType.deviceTypeCode',
		    key: 'deviceType.deviceTypeCode'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName',
		    key: 'organization.organizationName'
		  },
		  {
		    title: '设备状态',
		    dataIndex: 'deviceState',
		    key: 'deviceState'
		  }
		],
		searchFormItems: [
			{
		    title: '设备编号',
		    dataIndex: 'deviceCode',
		   	type: 'input'
		  },
		  {
		    title: '设备序列号',
		    dataIndex: 'deviceSequenceNo',
		    type: 'input'
		  },
		  {
		    title: '设备型号',
		    dataIndex: 'deviceType.id',
		    type: 'showSearchSelect'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.id',
		   	type: 'showSearchSelect'
		  },
		  {
		    title: '设备状态',
		    dataIndex: 'deviceState',
		    type: 'select'
		  }
		],
		modalFormItems: [
			{
		    title: '设备编号',
		    dataIndex: 'deviceCode',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入设备编号'}]
		  },
		  {
		    title: '设备序列号',
		    dataIndex: 'deviceSequenceNo',
		    type: 'input',
		    rules: [{required: true, message: '请输入设备序列号'}]
		  },
		  {
		    title: '设备型号',
		    dataIndex: 'deviceType.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '直接选择或者搜索设备型号'}]
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '直接选择或者搜索设所属机构'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '设备编号',
		    dataIndex: 'deviceCode'
		  },
		  {
		    title: '设备序列号',
		    dataIndex: 'deviceSequenceNo'
		  },
		  {
		    title: '设备型号',
		    dataIndex: 'deviceType.deviceTypeCode'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	deviceType: {
		deviceTypeState: [
			{value: "未启用", label: "未启用"},
			{value: "已启用", label: "已启用"},
			{value: "已停用", label: "已停用"},
			{value: "已注销", label: "已注销"},
		],
		tableColumns: [
			{
		    title: '型号代码',
		    dataIndex: 'deviceTypeCode',
		    key: 'deviceTypeCode',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '供应商',
		    dataIndex: 'deviceTypeSupplier',
		    key: 'deviceTypeSupplier'
		  },
		  {
		    title: '卡槽数量',
		    dataIndex: 'deviceTypeSlots',
		    key: 'deviceTypeSlots'
		  },
		  {
		    title: '型号状态',
		    dataIndex: 'deviceTypeState',
		    key: 'deviceTypeState'
		  }
		],
		searchFormItems: [
			{
		    title: '型号代码',
		    dataIndex: 'deviceTypeCode',
		   	type: 'input'
		  },
		  {
		    title: '供应商',
		    dataIndex: 'deviceTypeSupplier',
		    type: 'searchSelect'
		  },
		  {
		    title: '型号状态',
		    dataIndex: 'deviceTypeState',
		   	type: 'select'
		  } 
		],
		modalFormItems: [
			{
		    title: '型号代码',
		    dataIndex: 'deviceTypeCode',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入型号代码'}]
		  },
		  {
		    title: '供应商',
		    dataIndex: 'deviceTypeSupplier',
		    type: 'input',
		    rules: [{required: true, message: '请输入供应商'}]
		  },
		  {
		    title: '卡槽数量',
		    dataIndex: 'deviceTypeSlots',
		    type: 'searchSelect',
		    rules: [{required: true, message: '请输入卡槽数量'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '型号代码',
		    dataIndex: 'deviceTypeCode'
		  },
		  {
		    title: '供应商',
		    dataIndex: 'deviceTypeSupplier'
		  },
		  {
		    title: '卡槽数量',
		    dataIndex: 'deviceTypeSlots'
		  },
		  {
		    title: '型号状态',
		    dataIndex: 'deviceTypeState'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	seal: {
		sealState: [
			{value: "未启用", label: "未启用"},
			{value: "已启用", label: "已启用"},
			{value: "已停用", label: "已停用"},
			{value: "已注销", label: "已注销"},
		],
		sealShape: [
			{value: '椭圆形', label: '椭圆形'},
			{value: '圆形', label: '圆形'}
		],
		sealLanguage: [
			{value: "汉语", label: "汉语"},
			{value: "汉_蒙", label: "汉_蒙"},
			{value: "汉_藏", label: "汉_藏"},
			{value: "汉_维", label: "汉_维"},
			{value: "汉_朝鲜", label: "汉_朝鲜"},
		],
		tableColumns: [
			{
		    title: '印章代码',
		    dataIndex: 'sealCode',
		    key: 'sealCode',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '印章类型',
		    dataIndex: 'sealType.sealTypeName',
		    key: 'sealType.sealTypeName'
		  },
		  {
		    title: '印章形状',
		    dataIndex: 'sealShape',
		    key: 'sealShape'
		  },
		  {
		    title: '印章语言',
		    dataIndex: 'sealLanguage',
		    key: 'sealLanguage'
		  },
		  {
		    title: '第一行文字',
		    dataIndex: 'sealTxtLine1',
		    key: 'sealTxtLine1'
		  },
		  {
		    title: '第二行文字',
		    dataIndex: 'sealTxtLine2',
		    key: 'sealTxtLine2'
		  },
		  {
		    title: '少数民族文字',
		    dataIndex: 'sealTxtMinority',
		    key: 'sealTxtMinority'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName',
		    key: 'organization.organizationName'
		  },
		  {
		    title: '印章状态',
		    dataIndex: 'sealState',
		    key: 'sealState'
		  },
		],
		searchFormItems: [
			{
		    title: '印章代码',
		    dataIndex: 'sealCode',
		   	type: 'input'
		  },
		  {
		    title: '印章类型',
		    dataIndex: 'sealType.id',
		    type: 'showSearchSelect'
		  },
		  {
		    title: '印章形状',
		    dataIndex: 'sealShape',
		    type: 'select'
		  },
		  {
		    title: '印章语言',
		    dataIndex: 'sealLanguage',
		   	type: 'select'
		  },
		  {
		    title: '第一行文字',
		    dataIndex: 'sealTxtLine1',
		    type: 'input'
		  },
		  {
		    title: '第二行文字',
		    dataIndex: 'sealTxtLine2',
		    type: 'input'
		  },
		  {
		    title: '少数民族文字',
		    dataIndex: 'sealTxtMinority',
		    type: 'input'
		  },
		  {
		    title: '印章状态',
		    dataIndex: 'sealState',
		    type: 'select'
		  },
		],
		modalFormItems: [
			{
		    title: '印章代码',
		    dataIndex: 'sealCode',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入印章代码'}]
		  },
		  {
		    title: '印章类型',
		    dataIndex: 'sealType.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '请选择印章类型'}]
		  },
		  {
		    title: '印章形状',
		    dataIndex: 'sealShape',
		    type: 'select',
		    rules: [{required: true, message: '请选择印章形状'}]
		  },
		  {
		    title: '印章语言',
		    dataIndex: 'sealLanguage',
		    type: 'select',
		    rules: [{required: true, message: '请选择印章语言'}]
		  },
		  {
		    title: '第一行文字',
		    dataIndex: 'sealTxtLine1',
		    type: 'input',
		    rules: [{required: true, message: '请输入第一行文字'}]
		  },
		  {
		    title: '第二行文字',
		    dataIndex: 'sealTxtLine2',
		    type: 'input',
		    rules: [{required: true, message: '请输入第二行文字'}]
		  },
		  {
		    title: '少数民族文字',
		    dataIndex: 'sealTxtMinority',
		    type: 'input',
		    rules: [{required: true, message: '请输入少数民族文字'}]
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.id',
		    type: 'showSearchSelect',
		    rules: [{required: true, message: '直接选择或者搜索设所属机构'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '印章代码',
		    dataIndex: 'sealCode '
		  },
		  {
		    title: '印章类型',
		    dataIndex: 'sealType.sealTypeName'
		  },
		  {
		    title: '印章形状',
		    dataIndex: 'sealShape'
		  },
		  {
		    title: '印章语言',
		    dataIndex: 'sealLanguage'
		  },
		  {
		    title: '印章状态',
		    dataIndex: 'sealState'
		  },
		  {
		    title: '第一行文字',
		    dataIndex: 'sealTxtLine1'
		  },
		  {
		    title: '第二行文字',
		    dataIndex: 'sealTxtLine2'
		  },
		  {
		    title: '少数民族文字',
		    dataIndex: 'sealTxtMinority'
		  },
		  {
		    title: '所属机构',
		    dataIndex: 'organization.organizationName'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	},
	seayType: {
		tableColumns: [
			{
		    title: '类型代码',
		    dataIndex: 'deviceTypeCode',
		    key: 'deviceTypeCode',
		    width: 160,
		    fixed: 'left'
		  },
		  {
		    title: '类型名称',
		    dataIndex: 'deviceTypeSupplier',
		    key: 'deviceTypeSupplier'
		  },
		  {
		    title: '用印方式',
		    dataIndex: 'deviceTypeSlots',
		    key: 'deviceTypeSlots'
		  },
		  {
		    title: '印章类型用途',
		    dataIndex: 'deviceTypeState',
		    key: 'deviceTypeState'
		  },
		  {
		    title: '类型状态',
		    dataIndex: 'deviceTypeSupplier',
		    key: 'deviceTypeSupplier'
		  },
		  {
		    title: '使用范围个数',
		    dataIndex: 'deviceTypeSupplier',
		    key: 'deviceTypeSupplier'
		  }
		],
		searchFormItems: [
			{
		    title: '类型代码',
		    dataIndex: 'deviceTypeCode',
		   	type: 'input'
		  },
		  {
		    title: '类型名称',
		    dataIndex: 'deviceTypeSupplier',
		    type: 'input'
		  },
		  {
		    title: '用印方式',
		    dataIndex: 'deviceTypeState',
		   	type: 'select'
		  },
		  {
		    title: '类型用途',
		    dataIndex: 'deviceTypeState',
		   	type: 'input'
		  },
		  {
		    title: '类型状态',
		    dataIndex: 'deviceTypeSupplier',
		    key: 'select'
		  },  
		  {
		    title: '使用范围个数',
		    dataIndex: 'deviceTypeState',
		   	type: 'input'
		  }
		],
		modalFormItems: [
			{
		    title: '类型代码',
		    dataIndex: 'deviceTypeCode',
		   	type: 'input',
		   	rules: [{required: true, message: '请输入型号代码'}]
		  },
		  {
		    title: '类型名称',
		    dataIndex: 'deviceTypeSupplier',
		    type: 'input',
		    rules: [{required: true, message: '请输入供应商'}]
		  },
		  {
		    title: '用印方式',
		    dataIndex: 'deviceTypeSlots',
		    type: 'select',
		    rules: [{required: true, message: '请输入卡槽数量'}]
		  },
		  {
		    title: '类型用途',
		    dataIndex: 'deviceTypeSlots',
		    type: 'input',
		    rules: [{required: true, message: '请输入卡槽数量'}]
		  },
		  {
		    title: '使用范围个数',
		    dataIndex: 'deviceTypeSlots',
		    type: 'input',
		    rules: [{required: true, message: '请输入卡槽数量'}]
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark',
		    type: 'textarea'
		  }
		],
		modalDetailItems: [
			{
		    title: '类型代码',
		    dataIndex: 'deviceTypeCode'
		  },
		  {
		    title: '类型名称',
		    dataIndex: 'deviceTypeSupplier'
		  },
		  {
		    title: '用印方式',
		    dataIndex: 'deviceTypeSlots'
		  },
		  {
		    title: '类型用途',
		    dataIndex: 'deviceTypeState'
		  },
		  {
		    title: '类型状态',
		    dataIndex: 'deviceTypeState'
		  },
		  {
		    title: '使用范围个数',
		    dataIndex: 'deviceTypeState'
		  },
		  {
		    title: '备注',
		    dataIndex: 'remark'
		  }
		]
	}
}
