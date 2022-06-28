export default [
  {
    path: '/',
    redirect: '/todolist',
  },
  // 登录注册
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/login',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/allUser',
        name: 'allUser',
        icon: 'smile',
        component: './admin/allUser',
      },
      {
        component: './404',
      },
    ],
  },
  // 日程表
  {
    path: '/todolist',
    name: 'todolist',
    icon: 'smile',
    component: './todolist',
  },
  // 备忘录
  {
    path: '/memorandum',
    name: 'memorandum',
    icon: 'CheckCircleOutlined',
    routes: [
      {
        path: '/memorandum',
        hideInMenu: true,
        component: './memorandum',
      },
      {
        name: 'addTextDetail',
        path: '/memorandum/addTextDetail',
        hideInMenu: true,
        component: './memorandum/textDetail',
      },
      {
        path: `/memorandum/editTextDetail/:memoid`,
        name: 'editTextDetail',
        hideInMenu: true,
        component: './memorandum/textDetail',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  // 有趣组件收集区
  {
    name: 'funComponents',
    icon: 'CheckCircleOutlined',
    path: '/funComponents',
    routes: [
      {
        path: '/funComponents',
        redirect: '/funComponents/main',
      },
      {
        name: 'main',
        icon: 'smile',
        path: '/funComponents/main',
        component: './funComponents',
      },
      // list因为带宽原因会很卡
      {
        name: 'listFC',
        icon: 'smile',
        access: 'canAdmin',
        path: '/funComponents/listFC',
        component: './funComponents/listFC',
      },
      {
        name: 'test',
        icon: 'smile',
        path: '/funComponents/test',
        // https://pro.ant.design/zh-CN/docs/advanced-menu
        /**
         * @name false 时不展示顶栏
         */
        headerRender: false,
        /**
         * @name false 时不展示页脚
         */
        footerRender: false,
        /**
         * @name false 时不展示菜单
         */
        menuRender: false,
        /**
         * @name false 时不展示菜单顶栏
         */
        menuHeaderRender: false,

        access: 'canAdmin',
        component: './funComponents/test',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  // 聊天
  // {
  //   name: 'chat',
  //   icon: 'CheckCircleOutlined',
  //   path: '/chat',
  //   routes: [
  //     {
  //       path: '/chat',
  //       redirect: '/chat/room',
  //     },
  //     {
  //       name: 'room',
  //       icon: 'smile',
  //       path: '/chat/room',
  //       component: './chat/room',
  //     },
  //     {
  //       name: 'adminRoom',
  //       icon: 'smile',
  //       path: '/chat/adminRoom',
  //       access: 'canAdmin',
  //       component: './chat/adminRoom',
  //     },

  //     // 匹配不到路径自动跳转404
  //     {
  //       component: '404',
  //     },
  //   ],
  // },
  // 音乐
  // {
  //   name: 'music',
  //   icon: 'CheckCircleOutlined',
  //   path: '/music',
  //   routes: [
  //     {
  //       path: '/music',
  //       redirect: '/music/list',
  //     },
  //     {
  //       name: 'musiclist',
  //       icon: 'smile',
  //       path: '/music/list',
  //       component: './music/list',
  //     },
  //     // 匹配不到路径自动跳转404
  //     {
  //       component: '404',
  //     },
  //   ],
  // },
  // 个人主页
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
      {
        component: './404',
      },
    ],
  },
  //未匹配跳转404
  {
    component: './404',
  },
  // {
  //   name: 'result',
  //   icon: 'CheckCircleOutlined',
  //   path: '/result',
  //   routes: [
  //     {
  //       path: '/result',
  //       redirect: '/result/success',
  //     },
  //     {
  //       name: 'success',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './result/success',
  //     },
  //     {
  //       name: 'fail',
  //       icon: 'smile',
  //       path: '/result/fail',
  //       component: './result/fail',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },

  // {
  //   name: 'exception',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       path: '/exception',
  //       redirect: '/exception/403',
  //     },
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './exception/403',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './exception/404',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './exception/500',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
];
