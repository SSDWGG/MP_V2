export default [
  {
    path: '/',
    redirect: '/toCreate',
  },
  // show page
  {
    path: '/toCreate',
    name: 'toCreate',
    icon: 'AlertOutlined',
    component: './toCreate',
  },
  // 登录注册忘记密码
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
        layout: false,
        path: '/user/register',
        component: './user/register',
      },
      {
        name: 'forget',
        layout: false,
        path: '/user/forget',
        component: './user/forget',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },

  // 日程表
  {
    path: '/todolist',
    name: 'todolist',
    icon: 'ClockCircleOutlined',
    component: './todolist',
  },
  // 备忘录
  {
    path: '/memorandum',
    name: 'memorandum',
    icon: 'UnorderedListOutlined',
    routes: [
      {
        path: '/memorandum',
        hideInMenu: true,
        component: './memorandum',
      },
      {
        name: 'addTextDetailEditor',
        path: '/memorandum/addTextDetailEditor',
        hideInMenu: true,
        component: './memorandum/textDetailEditor',
      },
      {
        path: `/memorandum/editTextDetail/:memoid`,
        name: 'editTextDetail',
        hideInMenu: true,
        component: './memorandum/textDetail',
      },
      // 富文本模式备忘录
      {
        path: `/memorandum/editTextDetailEditor/:memoid`,
        name: 'editTextDetailEditor',
        hideInMenu: true,
        component: './memorandum/textDetailEditor',
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
    icon: 'TrophyOutlined',
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
        name: 'whiteTest',
        icon: 'smile',
        path: '/funComponents/whiteTest',
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
        component: './funComponents/whiteTest',
      },
      {
        name: 'horizontalWaterfalls',
        icon: 'smile',
        path: '/funComponents/horizontalWaterfalls',
       
        access: 'canAdmin',
        component: './funComponents/horizontalWaterfalls',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  // 聊天
  {
    name: 'socket',
    icon: 'SendOutlined',
    path: '/socket',
    routes: [
      {
        path: '/socket',
        redirect: '/socket/socketTest',
      },
      {
        name: 'socketTest',
        icon: 'smile',
        path: '/socket/socketTest',
        access: 'canAdmin',
        component: './socket/socketTest',
      },
      {
        name: 'room',
        icon: 'smile',
        path: '/socket/room',
        component: './socket/room',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  // 管理员专用
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
