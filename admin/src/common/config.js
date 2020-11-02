const config = (function (config) {
	config.hostName = "https://test2.cityeasyplay.com";
	config.imgPath = "https://test2.cityeasyplay.com/lostFound/";
	config.assets = "https://test2.cityeasyplay.com/lostFound/assets/";
	// 测试环境
	if (process.env.NODE_ENV === 'development') {
		config.hostName = "https://test2.cityeasyplay.com";
		console.log("development");
	} else if (process.env.NODE_ENV === 'production') {
		config.hostName = "https://test2.cityeasyplay.com";
		console.log("production");
	}

	// 接口服务
	config.service = {
		"imageService": "/lostFound/base/imageService", // 用户服务
		"userService": "/lostFound/base/userService", // 用户服务
		"deptService": "/lostFound/base/deptService", // 部门服务
		"companyService": "/lostFound/base/companyService", // 公司服务
		"deptUserService": "/lostFound/base/deptUserService", // 部门服务
		"permissionService": "/lostFound/base/permissionService", // 权限服务
		"attachmentService": "/lostFound/base/attachmentService", // 附件
		"cateService": "/lostFound/manage/cateService", // 失物分类
		"areaService": "/lostFound/manage/areaService", // 失物位置
		"warehouseService": "/lostFound/manage/warehouseService", // 失物仓库
		"lostItemService": "/lostFound/manage/lostItemService", // 失物信息
		"lostRegistService": "/lostFound/manage/lostRegistService", // 报失
		"warehouseStoreService": "/lostFound/manage/warehouseStoreService", // 报失
		"uploadService": "/lostFound/base/uploadService", // 附件上传
		"attachmentService": "/lostFound/base/attachmentService", // 附件上传

		// 旅客模块
		"commonService": "/lostFound/user/commonService", // 附件上传
		
		// 微信服务
		"wechat": "/lostFound/wechat/service",
		
		// 评价
		"evaluationService": "/lostFound/client/evaluationService",

		// 内容发布
		"contentService": "/lostFound/article/contentService",

		// 统计
		"statService": "/lostFound/manage/statService",

		// 系统参数
		"sysParaService": "/lostFound/base/sysParaService",

	};

	// 接口动作
	config.action = {

		// imageService：验证码
		"getImgCode": config.hostName + config.service.imageService + "?action=getImgCode", // 获取图形验证码接口 
		"validImgCode": config.hostName + config.service.imageService + "?action=validImgCode", // 校验图形验证码接口  

		// companyService： 公司服务
		"getCompany": config.hostName + config.service.companyService + "?action=getCompany", // 根据ID获取公司信息
		"delCompany": config.hostName + config.service.companyService + "?action=delCompany", // 删除公司接口 
		"saveCompany": config.hostName + config.service.companyService + "?action=saveCompany", // 新增/修改公司接口
		"getCompanyList": config.hostName + config.service.companyService + "?action=getCompanyList", // 获取公司列表数据接口

		// deptService：部门服务
		"getDept": config.hostName + config.service.deptService + "?action=getDept", // 根据部门ID获取部门信息接口
		"delDept": config.hostName + config.service.deptService + "?action=delDept", // 删除部门接口
		"saveDept": config.hostName + config.service.deptService + "?action=saveDept", // 新增修改部门接口
		"getDeptList": config.hostName + config.service.deptService + "?action=getDeptList", // 获取部门列表数据接口
		"getDeptTreeList": config.hostName + config.service.deptService + "?action=getDeptTreeList", // 获取部门列表数据接口（树型结构）

		// deptUserService：部门用户
		"delDeptUser": config.hostName + config.service.deptUserService + "?action=delDeptUser", // 删除部门员工接口
		"saveDeptUser": config.hostName + config.service.deptUserService + "?action=saveDeptUser", // 新增部门员工接口
		"getDeptUserList": config.hostName + config.service.deptUserService + "?action=getDeptUserList", // 获取部门员工列表数据接口

		// userService：用户服务
		"getUser": config.hostName + config.service.userService + "?action=getUser", // 根据ID获取用户信息接口
		"delUser": config.hostName + config.service.userService + "?action=delUser", // 删除用户接口 
		"saveUser": config.hostName + config.service.userService + "?action=saveUser", // 新增修改用户接口
		"userLogin": config.hostName + config.service.userService + "?action=userLogin", // 用户登录接口
		"userLogout": config.hostName + config.service.userService + "?action=userLogout", // 用户退出登录
		"getUserList": config.hostName + config.service.userService + "?action=getUserList", // 获取用户列表数据接口
		"changeUserPwd": config.hostName + config.service.userService + "?action=changeUserPwd", // 用户修改密码接口
		"getUserLogList": config.hostName + config.service.userService + "?action=getUserLogList", // 获取用户操作日志列表数据接口
		"changeUserPwd": config.hostName + config.service.userService + "?action=changeUserPwd", // 获取用户操作日志列表数据接口

		// permissionService：权限服务
		"delRole": config.hostName + config.service.permissionService + "?action=delRole", // 删除角色接口
		"saveRole": config.hostName + config.service.permissionService + "?action=saveRole", // 新增修改系统角色接口
		"getRoleList": config.hostName + config.service.permissionService + "?action=getRoleList", // 获取系统角色列表数据接口
		"delRoleUser": config.hostName + config.service.permissionService + "?action=delRoleUser", // 删除系统角色可用功能接口
		"saveRoleUser": config.hostName + config.service.permissionService + "?action=saveRoleUser", // 新增角色下属用户接口
		"delRoleFunction": config.hostName + config.service.permissionService + "?action=delRoleFunction", // 删除系统角色可用功能接口
		"getRoleUserList": config.hostName + config.service.permissionService + "?action=getRoleUserList", // 获取角色下属用户列表数据接口
		"saveRoleFunction": config.hostName + config.service.permissionService + "?action=saveRoleFunction", // 新增角色可用功能接口
		"getFunctionList": config.hostName + config.service.permissionService + "?action=getFunctionList", // 获取系统操作权限功能项目列表接口
		"getFunctionTreeList": config.hostName + config.service.permissionService + "?action=getFunctionTreeList", // 获取系统操作权限功能项目列表接口
		"getFunctionTreeList": config.hostName + config.service.permissionService + "?action=getFunctionTreeList", // 获取系统操作权限功能项（树型结构）
		"getRoleFunctionList": config.hostName + config.service.permissionService + "?action=getRoleFunctionList", // 获取角色可用功能列表数据接口

		// 失物管理类
		"saveLostCategory": config.hostName + config.service.cateService + "?action=saveLostCategory", // 新增修改失物分
		"getLostCategoryList": config.hostName + config.service.cateService + "?action=getLostCategoryList", // 获取失物分类列表接口
		"delLostCategory": config.hostName + config.service.cateService + "?action=delLostCategory", // 删除分类接口 

		// 失物位置
		"saveLostArea": config.hostName + config.service.areaService + "?action=saveLostArea", // 新增修改失物位置接口
		"getLostAreaList": config.hostName + config.service.areaService + "?action=getLostAreaList", // 获取失物位置列表接口
		"delLostArea": config.hostName + config.service.areaService + "?action=delLostArea", // 删除位置接口

		// 失物仓库
		"getLostWarehouseList": config.hostName + config.service.warehouseService + "?action=getLostWarehouseList", //获取失物仓库列表接口
		"saveLostWarehouse": config.hostName + config.service.warehouseService + "?action=saveLostWarehouse", //新增修改失物仓库接口
		"delLostWarehouse": config.hostName + config.service.warehouseService + "?action=delLostWarehouse", //删除失物仓库接

		// 失物仓库货架
		"getLostWarehouseShelfList": config.hostName + config.service.warehouseService + "?action=getLostWarehouseShelfList", //获取失物仓库货架列表接口
		"saveLostWarehouseShelf": config.hostName + config.service.warehouseService + "?action=saveLostWarehouseShelf", //新增修改失物仓库货架接口
		"delLostWarehouseShelf": config.hostName + config.service.warehouseService + "?action=delLostWarehouseShelf", //删除失物仓库货架接口

		// 失物仓库货架
		"getLostWarehouseShelfSpaceList": config.hostName + config.service.warehouseService + "?action=getLostWarehouseShelfSpaceList", //获取失物仓库货架位置列表接口
		"saveLostWarehouseShelfSpace": config.hostName + config.service.warehouseService + "?action=saveLostWarehouseShelfSpace", //新增修改失物仓库货架位置接口 
		"delLostWarehouseShelfSpace": config.hostName + config.service.warehouseService + "?action=delLostWarehouseShelfSpace", //删除失物仓库货架位置接口  

		// 失物信息
		"saveLostItem": config.hostName + config.service.lostItemService + "?action=saveLostItem", // 新增修改失物信息接口 
		"getLostItemList": config.hostName + config.service.lostItemService + "?action=getLostItemList", // 获取失物详细信息列表接口 
		"delLostItem": config.hostName + config.service.lostItemService + "?action=delLostItem", // 删除失物记录接口 
		"getLostItemLogList": config.hostName + config.service.lostItemService + "?action=getLostItemLogList", // 获取失物变更历史记录列表接口
		"publicQueryLostItem": config.hostName + config.service.lostItemService + "?action=publicQueryLostItem", //获取公示失物列表接口
		"batchShiftOutLostItems": config.hostName + config.service.lostItemService + "?action=batchShiftOutLostItems", //批量移交失物接口 
		"publicQueryLostItem": config.hostName + config.service.lostItemService + "?action=publicQueryLostItem", //获取公示失物列表接口（7天内）
		"matchLostItemAndLostRegister": config.hostName + config.service.lostItemService + "?action=matchLostItemAndLostRegister", //获取公示失物列表接口（7天内）

		// 旅客报失
		"saveLostInfo": config.hostName + config.service.lostRegistService + "?action=saveLostInfo", //新增修改报失信息接口  
		"getLostInfoList": config.hostName + config.service.lostRegistService + "?action=getLostInfoList", //获取报失信息列表接口
		"delLostInfo": config.hostName + config.service.lostRegistService + "?action=delLostInfo", //删除报失信息接口

		// 获取报失信息
		"getLostInfoList": config.hostName + config.service.lostRegistService + "?action=getLostInfoList", //获取报失信息列表接口
		"delLostInfo": config.hostName + config.service.lostRegistService + "?action=delLostInfo", //删除报失信息接口

		// 新增修改失物入库接口
		"saveLostItemStore": config.hostName + config.service.warehouseStoreService + "?action=saveLostItemStore", //新增修改失物入库接口
		"getLostItemStoreList": config.hostName + config.service.warehouseStoreService + "?action=getLostItemStoreList", //获取失物库存信息接口  
		"delLostItemStore": config.hostName + config.service.warehouseStoreService + "?action=delLostItemStore", //删除失物库存信息接口
		"getSpaceStoredLostItemList": config.hostName + config.service.warehouseStoreService + "?action=getSpaceStoredLostItemList", //获取指定货架位置存放的所有失物接口

		// attachmentService：附件
		"getAttachmentList": config.hostName + config.service.attachmentService + "?action=getAttachmentList", // 获取附件列表数据接口
		"delAttachment": config.hostName + config.service.attachmentService + "?action=delAttachment", //删除附件接口
		
		// 旅客模块
		"registerUserByPhone": config.hostName + config.service.commonService + "?action=registerUserByPhone", //删除附件接口
		"checkUserOnly": config.hostName + config.service.commonService + "?action=checkUserOnly", //删除附件接口
		"registerUserByCode": config.hostName + config.service.commonService + "?action=registerUserByCode", //删除附件接口
		"userLoginCommon": config.hostName + config.service.commonService + "?action=userLogin", //删除附件接口
		"resetUserPwd": config.hostName + config.service.commonService + "?action=resetUserPwd", //删除附件接口
		"resetPwd": config.hostName + config.service.commonService + "?action=resetPwd", //删除附件接口
		"userLogoutCommon": config.hostName + config.service.commonService + "?action=userLogout", //删除附件接口
		
		// 获取微信用户网页授权
		"getUserAuthUrl": config.hostName + config.service.wechat + "?opType=getUserAuthUrl", //删除附件接口
		"getWxAuthInfo": config.hostName + config.service.wechat + "?opType=getWxAuthInfo", //获取微信分享安全签名参数接口
		
		// 文件上传接口（base64数据）
		"saveDataFile": config.hostName + config.service.uploadService + "?action=saveDataFile", //文件上传接口（base64数据）
		
		// 旅客评价
		"saveLostCustomerEvaluation": config.hostName + config.service.evaluationService + "?action=saveLostCustomerEvaluation", // 新增修改旅客评价接口  
		"getMyLostCustomerEvaluationList": config.hostName + config.service.evaluationService + "?action=getMyLostCustomerEvaluationList", // 获取我的评价列表接口（旅客使用）
		"getLostCustomerEvaluationList": config.hostName + config.service.evaluationService + "?action=getLostCustomerEvaluationList", // 获取旅客评价列表接口（内部员工使用）

		
		// 内容发布
		"saveArticle": config.hostName + config.service.contentService + "?action=saveArticle", // 新增修改公告文章接口
		"getArticleList": config.hostName + config.service.contentService + "?action=getArticleList", // 获取文章列表接口 
		"delArticle": config.hostName + config.service.contentService + "?action=delArticle", // 删除文章接口

		// 统计
		"getLostStatByStatus": config.hostName + config.service.statService + "?action=getLostStatByStatus", // 按失物状态统计接口
		"getLostStatByCate": config.hostName + config.service.statService + "?action=getLostStatByCate", // 按失物分类统计接口
		"getClientRegisterStatByStatus": config.hostName + config.service.statService + "?action=getClientRegisterStatByStatus", // 按失物分类统计接口
		"getClientRegisterStatByCate": config.hostName + config.service.statService + "?action=getClientRegisterStatByCate", // 按失物分类统计接口

		// 系统参数
		"saveSysPara": config.hostName + config.service.sysParaService + "?action=saveSysPara", // 保存系统参数接口
		"getSysParaList": config.hostName + config.service.sysParaService + "?action=getSysParaList", // 获取系统参数列表接口
		"delSysPara": config.hostName + config.service.sysParaService + "?action=delSysPara", // 删除系统参数接口

	};
	
	// 微信分享
	config.weixinJsApiList = [
		'updateAppMessageShareData',
		'updateTimelineShareData',
		'onMenuShareQQ',
		'onMenuShareAppMessage',
		'onMenuShareTimeline',
		'chooseImage',
		'chooseWXPay',
		'openAddress',
		'hideMenuItems',
		'scanQRCode'
	];

	config.itemFormat = [
		{
			id: 0,
			name: "单行文本框输入"
		},
		{
			id: 1,
			name: "多行文本框输入"
		},
		{
			id: 2,
			name: "单项选择"
		},
		{
			id: 3,
			name: "多项复选框选择"
		},
		{
			id: 4,
			name: "下拉列表选择"
		},
		{
			id: 5,
			name: "日期选择(年-月-日)"
		},
		{
			id: 6,
			name: "时间选择(年-月-日 时:分:秒)"
		},
	];

	// 失物状态
	// 0：未定义
	// 1：失物待确认，外部门员工登记失物时的默认值
	// 2：失物无效
	// 3：失物已入库待认领
	// 4：失物未入库待认领
	// 5：失物待领取
	// 6：失物领取中
	// 7：失物已领取
	// 8：失物已过保质期
	// 9：失物已过保存期
	// 10：过保质期已处理
	// 11：失物已上交国库
	config.lostItemStatus = [{
		id: 0,
		name: ""
	},{
		id: 1,
		name: "待确认"
	},{
		id: 2,
		name: "失物无效"
	},{
		id: 3,
		name: "已入库待认领"
	},{
		id: 4,
		name: "未入库待认领"
	},{
		id: 5,
		name: "待领取"
	},{
		id: 6,
		name: "领取中"
	},{
		id: 7,
		name: "已领取"
	},{
		id: 8,
		name: "已过保质期"
	},{
		id: 9,
		name: "已过保存期",
	},{
		id: 10,
		name: "过保质期已处理"
	},{
		id: 11,
		name: "已上交国库"
	}];

	// 物品使用状态：
	// 0：未定义
	// 1：开封
	// 2：未开封
	// 3：已使用
	// 4：未使用
	config.useStatus = [{
		id: 0,
		name: "",
	},{
		id: 1,
		name: "开封",
	},{
		id: 2,
		name: "未开封",
	},{
		id: 3,
		name: "已使用",
	},{
		id: 4,
		name: "未使用",
	}];

	// 失主证件类型
	// 1：居民身份证
	// 2：护照
	// 3：台湾居民来往大陆通行证
	// 4：驾驶证
	// 5：港澳同胞回乡证或通行证
	// 6:：因公往来港澳特区通行证
	// 7：其他
	config.ownerCertType = [{
		id: 1,
		name: "居民身份证"
	},{
		id: 2,
		name: "护照"
	},{
		id: 3,
		name: "台湾居民来往大陆通行证"
	},{
		id: 4,
		name: "驾驶证"
	},{
		id: 5,
		name: "港澳同胞回乡证或通行证"
	},{
		id: 6,
		name: "因公往来港澳特区通行证"
	},{
		id: 7,
		name: "其他"
	}];

	// 领取失物方式
	// 0：未定义
	// 1：自取
	// 2：他人
	// 3：代发快递
	// 4：快递代收（需委托书）
	config.takeType = [{
		id: 0,
		name: ""
	},{
		id: 1,
		name: "自取"
	},{
		id: 2,
		name: "他人"
	},{
		id: 3,
		name: "代发快递"
	}
	// ,{
	// 	id: 4,
	// 	name: "快递代收（需委托书）"
	// }
];

	// 快递公司 0：无 1：顺丰 2：EMS
	config.deliveryCompanyList = [{
		id: 0,
		name: "",
	},{
		id: 1,
		name: "顺丰",
	},{
		id: 2,
		name: "EMS",
	}];

	// 地点
	// T1
	// T2
	// 客机舱
	// 地面交通
	config.areaCode = [{
		id: "T1",
		name: "T1",
	},{
		id: "T2",
		name: "T2",
	},{
		id: "飞机客舱",
		name: "飞机客舱",
	},{
		id: "机场内",
		name: "机场内",
	},{
		id: "大巴/出租车/网约车/地铁",
		name: "大巴/出租车/网约车/地铁",
	},{
		id: "其他",
		name: "其他",
	}];
	
	// 报失处理状态
	// 0：草稿
	// 1：失物寻找中
	// 2：待选择领取方式（失物找到）
	// 3：待旅客补充委托资料
	// 4：委托书审核中
	// 5：失物领取中
	// 6：失物快递中
	// 7：已认领待评价
	// 8：已结束
	// 9：已取消
	config.clientDealStatus = [{
		id: 0,
		name: "草稿",
	},{
		id: 1,
		name: "失物寻找中",
	},{
		id: 2,
		name: "选择领取方式(失物找到)",
	},{
		id: 3,
		name: "待旅客补充委托资料",
	},{
		id: 4,
		name: "委托书审核中",
	},{
		id: 5,
		name: "失物领取中",
	},{
		id: 6,
		name: "失物快递中",
	},{
		id: 7,
		name: "已认领待评价",
	},{
		id: 8,
		name: "已结束",
	},{
		id: 9,
		name: "已取消",
	}];

	// 0：未定义
// 1：96158
// 2：民航统一查询平台
// 3：工作人员主动匹配
// 4：系统自动匹配
// 5：旅客自行联系
// 6:其他
	config.ownerFromType = [{
		id: 0,
		name: "",
	},{
		id: 1,
		name: "96158",
	},{
		id: 2,
		name: "民航统一查询平台",
	},{
		id: 3,
		name: "工作人员主动匹配",
	},{
		id: 4,
		name: "系统自动匹配",
	},{
		id: 5,
		name: "旅客自行联系",
	},{
		id: 6,
		name: "其他",
	}];

	return config;
}(config || {}));

export default config;