import Vue from 'vue'
import Router from 'vue-router'
import indexWrap from '@/components/indexWrap'
import searchPage from '@/components/searchPage'
import cateList from "@/components/cateList"
import goodsDetail from "@/components/goodsDetail"
import login from "@/components/login"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'indexWrap',
      component: indexWrap
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    },
    {
      path: '/cateList',
      name: 'cateList',
      component: cateList
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: goodsDetail
    }, {
      path: '/login',
      name: 'login',
      component: login
    },

  ]
})
