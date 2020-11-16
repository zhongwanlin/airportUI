import Vue from "vue";
import App from "./App";
import store from './store';
import {
  router
} from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import iView from "view-design";
import utility from "./common/utility";
import config from "./common/config";
import qs from 'qs';
import $ from "jquery";
import "view-design/dist/styles/iview.css";
Vue.use(VueAxios, axios);
Vue.use(iView);

Vue.prototype.$store = store;
Vue.prototype.$utility = utility;
Vue.prototype.$config = config;
Vue.prototype.$qs = qs;
Vue.prototype.$ = $;

let VueApp = new Vue({
  store,
  router,
  utility,
  config,
  el: "#app",
  render: h => h(App)
});

VueApp.$Message.config({
  top: 150,
  duration: 3
});

axios.interceptors.response.use(
  response => {
    if (response.data.code == "9003") {
      VueApp.$Message.error("登录超时,请重新登录");
      utility.cleanLocalStorage();
      utility.cleanSessionStorage();
      setTimeout(()=>{
        if (window.parent) {
          window.parent.window.location.href = window.location.pathname+'#/login';
        } else {
          window.location.href = window.location.pathname+'#/login';
        }
      }, 2000);
    }
    return response;
  },
  error => {

  }
);