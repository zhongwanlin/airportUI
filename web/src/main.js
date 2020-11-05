import Vue from "vue";
import App from "./App"; 
import store from './store';
import { router } from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import iView from "view-design";
import VueI18n from 'vue-i18n';
import utility from "./common/utility";
import mock from "./common/mock";
import config from "./common/config";
import zhCN from './common/lang/zh-CN'
import enUS from './common/lang/en-US'
import "view-design/dist/styles/iview.css";
Vue.use(VueAxios, axios);
Vue.use(iView);
Vue.use(VueI18n);

Vue.prototype.$store = store;
Vue.prototype.$utility = utility;
Vue.prototype.$config = config;
Vue.prototype.$mock = mock;

const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识
  messages: {
    'zh-CN': zhCN,   // 中文语言包
    'en-US': enUS   // 英文语言包
  }
});

// 处理与app的交互数据
window.utility = utility;
window.mock = mock;
window.appInfo = {
  "_0": {},
  "_1": {},
  "_2": {},
  "_3": {},
  "_4": {},
  "_5": {},
  "_6": {}
};

new Vue({
  store,
  router,
  utility,
  config,
  mock,
  i18n,
  el: "#app",
  render: h => h(App)
});
