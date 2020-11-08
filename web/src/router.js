import Vue from "vue";
import Router from "vue-router";
import utility from "./common/utility";
Vue.use(Router);

const routes = [{
    path: "*",
    redirect: "/index"
  },
  {
    name: "index",
    path: "/index",
    component: () => import("./pages/index.vue"),
    meta: {
      title: "首页"
    }
  }
];

const router = new Router({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    };
  }
});

router.beforeEach((to, from, next) => {
  // const name = to.name;
  document.title = "机场旅客信息服务系统";
  utility.setSessionStorage("page", {
    from: from.name,
    to: to.name
  });
  next();
});

export {
  router
};