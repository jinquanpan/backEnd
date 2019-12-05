import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import homeRoutes from './homeRoutes'
import VueRouter from 'vue-router'
import getPageTitle from '@/util/get-page-title'

Vue.use(Router)
const getComponent = (name, component) => () => import(`@/views/${name}/${component || name}`)
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: getComponent('login', 'index')
    },
    {
      path: '/403',
      component: getComponent('error', '403'),
      meta: {
        title: '403'
      }
    },
    {
      path: '/404',
      component: getComponent('error', '404'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/test',
      component: () => import('@/views/test')
    },
    {
      path: '/pdf',
      component: () => import('@/views/pdf')
    },
    {
      path: '/pdf2',
      component: () => import('@/views/pdf/pdf2')
    },
    {
      path: '/pdf3',
      component: () => import('@/views/pdf/pdf3')
    },
    {
      path: '/',
      component: () => import('@/views/layout/layout'),
      redirect: '/home',
      children: homeRoutes
    }
  ]
})
// store.dispatch('user/buildLeftMenu2', store.getters.permission)
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.start()
  var { userName, permission, menu } = store.getters
  var isLogined = userName && permission.length
  if (isLogined) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (menu.length) {
        next()
      } else {
        // 拉取菜单
        store.dispatch('user/buildLeftMenu', permission).then(() => {
          next()
        })
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
      // 如果重定向，要手动关闭Progress
      NProgress.done() // 结束Progress
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
export default router
