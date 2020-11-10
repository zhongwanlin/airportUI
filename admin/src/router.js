import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const routes = [{
    path: "*",
    redirect: "/login"
  },
  {
    name: "login",
    path: "/login",
    component: () => import("./pages/login.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    name: "index",
    path: "/index",
    component: () => import("./pages/index.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    name: "welcome",
    path: "/welcome",
    component: () => import("./pages/welcome.vue"),
    meta: {
      title: "我的桌面"
    }
  },
  
  //#region 区域管理
  {
    name: "regional",
    path: "/regional",
    component: () => import("./pages/regConfig/regional.vue"),
    meta: {
      title: "区域管理"
    }
  },
  //#endregion
  
  //#region 内容管理
  {
    name: "columnManage",
    path: "/columnManage",
    component: () => import("./pages/contentMange/columnManage.vue"),
    meta: {
      title: "栏目管理"
    }
  },
  {
    name: "articleManage",
    path: "/articleManage",
    component: () => import("./pages/contentMange/articleManage.vue"),
    meta: {
      title: "文章管理"
    }
  },
  {
    name: "linkManage",
    path: "/linkManage",
    component: () => import("./pages/contentMange/linkManage.vue"),
    meta: {
      title: "链接管理"
    }
  },
  //#endregion

  //#region 统计报表
  {
    name: "deviceReport",
    path: "/deviceReport",
    component: () => import("./pages/statistical/deviceReport.vue"),
    meta: {
      title: "设备使用报表"
    }
  },
  {
    name: "userReport",
    path: "/userReport",
    component: () => import("./pages/statistical/userReport.vue"),
    meta: {
      title: "用户使用报表"
    }
  },
  {
    name: "modalReport",
    path: "/modalReport",
    component: () => import("./pages/statistical/modalReport.vue"),
    meta: {
      title: "模块调用报表"
    }
  },
  {
    name: "modalLogReport",
    path: "/modalLogReport",
    component: () => import("./pages/statistical/modalLogReport.vue"),
    meta: {
      title: "模组调用报表"
    }
  },
  //#endregion

  //#region 系统管理
  {
    name: "arganization",
    path: "/arganization",
    component: () => import("./pages/system/arganization.vue"),
    meta: {
      title: "组织架构"
    }
  },
  {
    name: "roleManage",
    path: "/roleManage",
    component: () => import("./pages/system/roleManage.vue"),
    meta: {
      title: "角色管理"
    }
  },
  {
    name: "accountManage",
    path: "/accountManage",
    component: () => import("./pages/system/accountManage.vue"),
    meta: {
      title: "账号管理"
    }
  },
  {
    name: "params",
    path: "/params",
    component: () => import("./pages/system/params.vue"),
    meta: {
      title: "参数配置"
    }
  },
  //#endregion
  
  //#region 语音识别
  {
    name: "voiceHelper",
    path: "/voiceHelper",
    component: () => import("./pages/voiceManage/voiceHelper.vue"),
    meta: {
      title: "语音助手"
    }
  },
  //#endregion

  //#region 紧急预案
  {
    name: "emergency",
    path: "/emergency",
    component: () => import("./pages/emergency/index.vue"),
    meta: {
      title: "紧急预案"
    }
  },
  //#endregion

  //#region 用户反馈
  {
    name: "feedbackManage",
    path: "/feedbackManage",
    component: () => import("./pages/feedbackManage/index.vue"),
    meta: {
      title: "用户反馈"
    }
  },
  //#endregion

  //#region 用户反馈
  {
    name: "faceManage",
    path: "/faceManage",
    component: () => import("./pages/faceManage/index.vue"),
    meta: {
      title: "人脸管理"
    }
  },
  //#endregion

  //#region 设备管理
  {
    name: "deviceList",
    path: "/deviceList",
    component: () => import("./pages/deviceManage/deviceList.vue"),
    meta: {
      title: "设备列表"
    }
  },
  {
    name: "versionManage",
    path: "/versionManage",
    component: () => import("./pages/deviceManage/versionManage.vue"),
    meta: {
      title: "设备列表"
    }
  }
  //#endregion
];

const router = new Router({
  routes,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
});

router.beforeEach((to, from, next) => {
  const name = to.name;
  clearInterval(window.timeIterval);
  next();
});

export {
  router
};