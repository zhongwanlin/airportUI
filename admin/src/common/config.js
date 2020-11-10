const config = (function (config) {
	config.imgPath = "http://47.106.235.8:8888/";
	config.assets = "http://47.106.235.8:8888/assets/";
	// 测试环境
	if (process.env.NODE_ENV === 'development') {
		config.hostName = "http://47.106.235.8:8888";
		console.log("development");
	} else if (process.env.NODE_ENV === 'production') {
		config.hostName = "http://47.106.235.8:8888";
		console.log("production");
	}

	// 接口动作
	config.action = {

		// 用户
		"userLogin": config.hostName+"/sys/user/login", //用户登录
		"userLoginOut": config.hostName+"/sys/user/loginOut", //退出登录
		"userList": config.hostName+"/sys/user/list", //用户列表
		"userAdd": config.hostName+"/sys/user/add", //用户新增
		"userEdit": config.hostName+"/sys/user/edit", //用户修改
		"userDelete": config.hostName+"/sys/user/delete", //用户删除
		"userDisable": config.hostName+"/sys/user/disable", //禁用用户
		"userEnable": config.hostName+"/sys/user/enable", //启用用户

		// 角色
		"roleList": config.hostName+"/sys/role/list", // 角色列表
		"roleAdd": config.hostName+"/sys/role/add", //新增角色
		"roleEdit": config.hostName+"/sys/role/edit", //修改角色
		"roleDelete": config.hostName+"/sys/role/delete", //删除角色
		"roleDisable": config.hostName+"/sys/role/disable", //禁用角色
		"roleEnable": config.hostName+"/sys/role/enable", //启用角色

		// 组织架构
		"orgAdd": config.hostName+"/sys/org/add", // 新增组织架构
		"orgEdit": config.hostName+"/sys/org/edit", // 编辑组织架构
		"orgDelete": config.hostName+"/sys/org/delete", // 编辑组织架构
		"orgList": config.hostName+"/sys/org/list", // 组织架构列表

		// 区域
		"areaList": config.hostName+"/sys/area/list", // 区域列表
		"areaAdd": config.hostName+"/sys/area/add", // 新增区域
		"areaEdit": config.hostName+"/sys/area/edit", // 修改区域
		"areaDelete": config.hostName+"/sys/area/delete", // 删除区域

		// 设备
		"marchineList": config.hostName+"/sys/machine/list", // 区域列表
		"marchineAdd": config.hostName+"/sys/machine/add", // 新增区域
		"marchineEdit": config.hostName+"/sys/machine/edit", // 修改区域
		"marchineDelete": config.hostName+"/sys/machine/delete", // 删除区域

		// 参数配置
		"configList": config.hostName+"/sys/config/list", // 参数列表
		"configAdd": config.hostName+"/sys/config/add", // 新增参数
		"configEdit": config.hostName+"/sys/config/edit", // 修改参数
		"configDelete": config.hostName+"/sys/config/delete", // 删除参数

		// 版本管理
		"versionList": config.hostName+"/sys/version/list", // 版本列表
		"versionAdd": config.hostName+"/sys/version/add", // 新增版本
		"versionEdit": config.hostName+"/sys/version/edit", // 修改版本
		"versionDelete": config.hostName+"/sys/version/delete", // 删除版本
		"versionGet": config.hostName+"/sys/version/get", // 版本详情

		// 文件上传
		"setFileUpload": config.hostName+"/upload/setFileUpload", //文件上传

	};

	return config;
}(config || {}));

export default config;