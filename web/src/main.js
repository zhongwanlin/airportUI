import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import store from './store';
import config from './common/config';
import utility from './common/utility';
import mock from "./common/mock";
import zhCN from './common/lang/zh-CN';
import enUS from './common/lang/en-US';
import 'animate.css';
Vue.use(VueI18n);

Vue.config.productionTip = false;
Vue.prototype.$utility = utility;
Vue.prototype.$store = store;
Vue.prototype.$config = config;
Vue.prototype.$mock = mock;

App.mpType = 'app';
const i18n = new VueI18n({
	locale: 'zh-CN',    // 语言标识
	messages: {
		'zh-CN': zhCN,   // 中文语言包
		'en-US': enUS   // 英文语言包
	}
});
// 处理与app的交互数据
window.utility = utility;
window.uni = uni;
window.mock = mock;
window.appInfo = {
  "_0": {}, // 设备数据
  "_1": {}, // 人脸数据
  "_2": {}, // 语音数据
  "_3": {}, // 身份证数据
  "_4": {}, // 机票数据
  "_5": {}, // 
  "_6": {}
};

const app = new Vue({
	store,
	config,
	utility,
	i18n,
	...App
});
app.$mount()
