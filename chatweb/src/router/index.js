import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/chat'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat
    }
  ]
})
