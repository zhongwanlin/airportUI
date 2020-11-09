import md5 from "js-md5";
var utility = (function (utility) {
	// 获取查询字符串参数
	utility.getQueryParams = function (href) {
		// 取得查询字符串并去掉开头问号
		var qs = (!!href) ? href.slice(href.indexOf("?") + 1) : location.search.length > 0 ? location.search.substring(1) :
			'';
		// 保存数据的对像
		var args = {};

		// 取得每一项
		var items = qs.split('&');
		var item = null;
		var name = null;
		var value = null;

		// 将每一项添加到 args 对象中
		for (var i = 0, len = items.length; i < len; i++) {
			item = items[i].split('=');
			name = item[0];
			value = item[1];
			args[name] = value;
		}

		return args;
	};
	//#region  设置 cookie
	/**
	 * @description: 设置cookie
	 * @augments: {name: cookie名, value: cookie值}
	 */
	utility.setcookie = function (name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	};
	//#endregion

	//#region  获取 cookie
	utility.getcookie = function (name) {
		var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (arr != null) {
			return (arr[2]);
		} else {
			return "";
		}
	};
	//#endregion

	//#region  删除 cookie
	utility.delcookie = function (name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.getcookie(name);
		if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	};
	//#endregion

	//#region  保存本地会话
	utility.setSessionStorage = function (key, sessionStorageObj) {
		var flag = null;
		if (!!sessionStorageObj) {
			if (typeof sessionStorageObj == "string") {
				flag = sessionStorageObj;
			} else {
				flag = utility.getSessionStorage(key) || {};
				for (var item in sessionStorageObj) {
					if (sessionStorageObj.hasOwnProperty(item)) {
						flag[item] = sessionStorageObj[item];
					}
				}
			}
			window.sessionStorage.setItem(key, encodeURI(JSON.stringify(flag)));
		} else {
			window.sessionStorage.setItem(key, sessionStorageObj);
		}

	};
	//#endregion

	//#region  获取本地会话信息
	utility.getSessionStorage = function (key) {
		return JSON.parse(decodeURI(window.sessionStorage.getItem(key)));
	};
	//#endregion

	// 清空本地会话信息
	utility.cleanSessionStorage = function () {
		window.sessionStorage.clear();
	};

	// 保存本地存储信息
	utility.setLocalStorage = function (key, localStorageObj) {
		var flag = null;
		if (!!localStorageObj) {
			if (typeof localStorageObj == "string") {
				flag = localStorageObj;
			} else {
				flag = utility.getLocalStorage(key) || {};
				for (var item in localStorageObj) {
					if (localStorageObj.hasOwnProperty(item)) {
						flag[item] = localStorageObj[item];
					}
				}
			}
			window.localStorage.setItem(key, encodeURI(JSON.stringify(flag)));
		} else {
			window.localStorage.setItem(key, localStorageObj);
		}
	};

	// 返回本地存储信息
	utility.getLocalStorage = function (key) {
		return JSON.parse(decodeURI(window.localStorage.getItem(key)));
	};

	// 清空本地存储信息
	utility.cleanLocalStorage = function () {
		window.localStorage.clear();
	};

	// 去掉左右空格
	utility.trim = function (str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};

	//验证输入是否为空
	utility.checkLen = function (str, len) {
		return str.length <= len ? true : false;
	};

	//验证是否中文姓名
	utility.checkName = function (str) {
		return str.match(/[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/) ? true : false;
	};

	//验证手机号码格式是否为手机号码
	utility.checkPhone = function (str) {
		return str.match(/^(13|14|15|16|17|18)[0-9]{8}[0-9]$/) ? true : false;
	};

	// 验证密码格式
	utility.checkPass = function (str) {
		return str.match(/^[a-zA-Z]\w{7,18}$/) ? true : false;
	};

	// 验证银行卡号
	utility.checkBankCard = function (str) {
		return str.match(/^([1-9]{1})(\d{14}|\d{18})$/) ? true : false;
	};

	//验证是否是生日
	utility.checkNumber = function (str) {
		return str.match(/^(1[0-2]|0?[1-9])(0?[1-9]|[1-2][0-9]|3[0-1])$/) ? true : false;
	};

	//验证邮箱
	utility.checkEmail = function (str) {
		return str.match(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/) ? true : false;
	};

	// 验证身份证号码
	utility.checkIdentityNo = function (str) {
		var reg15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
		var reg18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		var bool = false;

		if (str.length == 15 && str.match(reg15)) {
			bool = true;
		} else if (str.length == 18 && str.match(reg18)) {
			bool = true;
		}
		return bool;
	};

	// 获取当前时间信息
	utility.getCurrentTimeInfo = function (dateInfo) {
		var nowDate = typeof dateInfo != undefined ? new Date(dateInfo) : new Date();
		var year = nowDate.getFullYear(); // 年
		var month = nowDate.getMonth() + 1; // 月
		var date = nowDate.getDate(); // 日
		var day = nowDate.getDay(); // 星期
		var hour = nowDate.getHours(); // 时
		var min = nowDate.getMinutes(); // 分
		var second = nowDate.getSeconds(); // 秒
		var weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

		return {
			"year": year,
			"month": month < 10 ? '0' + month : month,
			"date": date < 10 ? '0' + date : date,
			"hour": hour < 10 ? '0' + hour : hour,
			"min": min < 10 ? '0' + min : min,
			"second": second < 10 ? '0' + second : second,
			"day": day,
			"weekDay": weekDay[day]
		};
	};

	// 格式化时间差
	utility.formatTimeDiff = function (list) {
		let listArr = [];
		list.forEach((item, index) => {
			let diffTime = utility.timeDiff(item["createTime"]);
			let createTimeInfo = utility.getCurrentTimeInfo(item["createTime"].replace(/\-/g, "/"));
			let nowInfo = utility.getCurrentTimeInfo(new Date());
			if (diffTime.day == 0) {
				if (nowInfo.year == createTimeInfo.year &&
					nowInfo.month == createTimeInfo.month &&
					nowInfo.date == createTimeInfo.date) {
					list[index]["createTime"] = '今天' + item["createTime"].split(" ")[1];
				} else {
					list[index]["createTime"] = '昨天' + item["createTime"].split(" ")[1];
				}
			} else {
				list[index]["createTime"] = item["createTime"];
			}
		});
		return list;
	};

	// 把图片转换成
	utility.convertImgToBase64 = function (url, callback, outputFormat) {
		var canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d'),
			img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			var dataURL = canvas.toDataURL(outputFormat || 'image/png');
			callback.call(this, dataURL);
			canvas = null;
		};

		img.src = url;
	};

	//日期，在原有日期基础上，增加days天数，默认增加1天
	utility.addDate = function (data, days) {
		if (days == undefined || days == '') {
			days = 1;
		}
		var date = new Date(data);
		date.setDate(date.getDate() + days);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second = date.getSeconds();

		//单位数前面加0
		if (month <= 9) {
			month = "0" + month;
		}
		if (day <= 9) {
			day = "0" + day;
		}
		if (hour <= 9) {
			hour = "0" + hour;
		}
		if (minute <= 9) {
			minute = "0" + minute;
		}
		if (second <= 9) {
			second = "0" + second;
		}

		return {
			date: year + "-" + month + "-" + day,
			dateTime: year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
		};
	};

	// 倒计时
	utility.timeDiff = function (date1, date2) {
		var time1 = date1 ? new Date(date1.replace(/\-/g, "/")).getTime() : new Date().getTime();
		var time2 = date2 ? new Date(date2.replace(/\-/g, "/")).getTime() : new Date().getTime();
		var timediff = Math.abs(time1 - time2);
		var days = Math.floor(timediff / (24 * 3600 * 1000)); // //计算出相差天数

		var leave1 = timediff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
		var hours = Math.floor(leave1 / (3600 * 1000)); // //计算出小时数

		var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
		var minutes = Math.floor(leave2 / (60 * 1000));
		//计算相差秒数
		var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
		var seconds = Math.round(leave3 / 1000);

		return {
			"isOver": time1 < time2,
			"day": days,
			"hour": hours,
			"minute": minutes,
			"second": seconds,
		}
	};

	// 生成随机长度的数字
	utility.generateRandomData = function (n) {
		var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		var res = "";
		for (var i = 0; i < n; i++) {
			var id = Math.ceil(Math.random() * 10);
			res += chars[id];
		}
		return res;
	};

	// 把base64字符串格式化成数组
	utility.formatBase64CodeList = function (base64Code) {
		var base64List = [];
		let index = 0;
		let perSize = 10000;
		let allSize = base64Code.length;
		for (var i = 0; index <= allSize; i++) {
			base64List[i] = base64Code.substring(index, index + perSize);
			index += perSize;
		}
		return base64List;
	};

	// // 获取图片链接
	utility.getObjectURL = function (file) {
		var url = null;
		if (window.createObjectURL != undefined) {
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) {
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) {
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	};

	// 数字转换为中文大写
	utility.numberToChinese = function (str) {
		var num = parseFloat(str);
		var strOutput = "",
			strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
		num += "00";
		var intPos = num.indexOf('.');  
		var outputArr = [];
		if (intPos >= 0){
			num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
		}
		strUnit = strUnit.substr(strUnit.length - num.length);
		for (var i=0; i < num.length; i++){
			strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
		}
		outputArr = strOutput.split('');
		console.log({
			str: strOutput,
			arr: outputArr,
		});
		return {
			str: strOutput,
			arr: outputArr,
		};
	};

	utility.setHeader = function(actionUrl, contentType) {
		var timestamp = Date.parse(new Date());
		var userInfo = utility.getLocalStorage("userInfo");
		return {
			"Content-Type": contentType||'application/x-www-form-urlencoded',
			"version": 100, // 默认100
			"timestamp": timestamp,
			"languageVer": "cn", // cn：中文简体 en：英语 hk：中文繁体
			"appType": 2, // 请求来源类型：1:H5 2:WWW 3:android app 4: ios app
			"actionUrl": actionUrl || "", // 使用接口URL(注意：不包含http://ip:port的服务器域名/IP+端口这部分)
			"userId": !!userInfo ? userInfo["id"] : "",
			"userToken": !!userInfo ? userInfo["userToken"] : "", // 登陆后会有，如无则为空字符串
			"signStr": md5((!!userInfo ? userInfo["userToken"] : "") + (!!userInfo ? userInfo["id"] : "") + timestamp + "100").toUpperCase() // 算法：MD5(userToken + userid+ timestamp+languageVer +version)，安全Key由系统设定
		}
	};

	// 超时登录
	utility.loginTimeOut = function(self) {
		// self.$Message.error("登录已经过期，重新登录");
		// setTimeout(() => {
		// 	self.$utility.cleanSessionStorage();
		// 	window.parent.location.replace("#/login");
		// }, 3000);
	};

	utility.setDepetList = function(list, value, arr) {
		if(!!list && list.length > 0) {
			for(var i = 0, len = list.length; i < len; i++) {
				if(list[i].value == value) {
					arr.push(list[i]["__value"]);
				} else {
					utility.setDepetList(list[i]["children"], value, arr);
				}
			}
		}
	};

	// 把部门设置成树状结构
	utility.getSuperiorDepartmentList = function(self, type, value){
		let formatSuperiorDeprt = function(list) {
            var listInfo = JSON.stringify(list).replace(/id/g, 'value').replace(/deptName/g, 'label').replace(/subDeptList/g, 'children');
            return JSON.parse(listInfo);
		};
		let getSuper = function(list, value, arr) {
			for(var i = 0, len = list.length; i < len; i++) {
                if(list[i].value == value) {
                    arr.push(value);
                    if(list[i].paraDeptId == 0) {
                        return;
                    }
                    getSuper(self.superiorDepartmentList, list[i].paraDeptId, arr);
                } else {
                    getSuper(list[i]["children"], value, arr);
                }
            }
		};
		self.axios({
			method: 'post',
			headers: self.$utility.setHeader(self.$config.service.deptService),
			url: self.$config.action.getDeptTreeList,
			data: self.$qs.stringify({
				"pageNum": 1,
				"pageSize": 10000,
				"companyId": self[type]["companyId"], // 公司ID
			})
		})
		.then(function (res) {
			var arr = [];
			if(res.data.code=='200') {
				self.superiorDepartmentList = [];
				self[type]["paraDeptIds"] = [];
				self.superiorDepartmentList = formatSuperiorDeprt(res.data.data);
				getSuper(self.superiorDepartmentList, self[type][value], arr);
				self[type]["paraDeptIds"] = arr.reverse();
				console.log(self[type][value]);
			} else {
				self.$Message.error(res.data.msg);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	};
	
	return utility;

}(utility || {}));

export default utility