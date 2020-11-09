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

	};

	return config;
}(config || {}));

export default config;