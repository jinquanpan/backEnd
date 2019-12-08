import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import homeRoutes from './homeRoutes'
import VueRouter from 'vue-router'
import getPageTitle from '@/util/get-page-title'
import Layout from '@/views/common/layout/layout'
import RouterView from '@/router/RouterView'

Vue.use(Router)
const getComponent = (name) => () => import(`@/views/${name}`)
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: getComponent('common/login')
    },
    {
      path: '/403',
      component: getComponent('common/error/403'),
      meta: { title: '403' }
    },
    {
      path: '/404',
      component: getComponent('common/error/404'),
      meta: { title: '404' }
    },
    {
      path: '/test',
      component: () => getComponent('common/test')
    },
    {
      path: '/pdf',
      redirect: '/pdf/1',
      component: RouterView,
      children: [
        {
          path: '/1',
          component: () => getComponent('common/pdf')
        },
        {
          path: '/2',
          component: getComponent('common/pdf/pdf2')
        },
        {
          path: '/3',
          component: getComponent('common/pdf/pdf3')
        }
      ]
    },
    {
      path: '/',
      component: Layout,
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
