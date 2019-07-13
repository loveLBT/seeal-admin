export default {
	organizatio: {
		organizatioLevel: [
			{value: "总行", label: "总行"},
			{value: "省行", label: "省行"},
			{value: "市行", label: "世行"},
			{value: "支行", label: "支行"},
			{value: "网点", label: "网点"}
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
		    title: '备注',
		    dataIndex: 'remark',
		    key: 'remark'
		  }
		],
		searchFormItems: [
			{
		    title: '',
		    dataIndex: 'roleName',
		   	type: 'input'
		  },
		  {
		    title: '机构名称',
		    dataIndex: 'roleCode',
		    type: 'input'
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
		    title: '备注',
		    dataIndex: 'remark'
		  },
		]
	}
}
