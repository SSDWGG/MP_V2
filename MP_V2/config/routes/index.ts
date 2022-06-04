export default [
  {
    path: '/',
    redirect: '/user',
  },
  {
    path: '/todolist',
    name: 'todolist',
    icon: 'smile',
    component: '@/pages/todolist',
  },
  {
    name: 'chat',
    icon: 'CheckCircleOutlined',
    path: '/chat',
    routes: [
      {
        path: '/chat',
        redirect: '/chat/room',
      },
      {
        name: 'chatroom',
        icon: 'smile',
        path: '/chat/room',
        component: '@/pages/chat/room',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
  {
    name: 'music',
    icon: 'CheckCircleOutlined',
    path: '/music',
    routes: [
      {
        path: '/music',
        redirect: '/music/list',
      },
      {
        name: 'musiclist',
        icon: 'smile',
        path: '/music/list',
        component: '@/pages/music/list',
      },
      // 匹配不到路径自动跳转404
      {
        component: '404',
      },
    ],
  },
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
        component: '@/pages/user/login',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: '@/pages/user/register',
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
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './todolist',
      },
      {
        component: './404',
      },
    ],
  },

  {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        path: '/result',
        redirect: '/result/success',
      },
      {
        name: 'success',
        icon: 'smile',
        path: '/result/success',
        component: '@/pages/result/success',
      },
      {
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
        component: '@/pages/result/fail',
      },
      {
        component: './404',
      },
    ],
  },

  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: '@/pages/exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: '@/pages/exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: '@/pages/exception/500',
      },
      {
        component: './404',
      },
    ],
  },

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
        component: '@/pages/account/center',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: '@/pages/account/settings',
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
];
