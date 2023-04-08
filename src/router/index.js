import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: "/property",
    name: "Property",
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/property'),
        meta: { title: '资产管理', icon: 'el-icon-s-finance' }
      }
    ]
  },
  {
    path: "/retrieve",
    name: "Retrieve",
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/retrieve'),
        meta: { title: '领用管理', icon: 'el-icon-s-check' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
