import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/page/recommend/recommend'
import mine from '@/page/mine/mine'
import rank from '@/page/rank/rank'
import login from '@/page/login/login'
import listDetail from '@/page/list-detail/list-detail'

Vue.use(Router)

Router.prototype.go = function () {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: recommend,
      children: [
        {
          path: ':id',
          component: listDetail
        }
      ]

    },
    {
      path: '/mine',
      component: mine,
      children: [
        {
          path: '/login',
          component: login
        }
      ]
    },
    {
      path: '/rank',
      component: rank
    }
  ],
  linkActiveClass: 'active',
  mode: 'history'
})
