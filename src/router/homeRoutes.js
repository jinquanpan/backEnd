import RouterView from './RouterView'
const getComponent = (name) => () => import(`@/views/${name}`)

export default [
  {
    path: '/redirect/:path*',
    component: getComponent('common/redirect'),
    meta: { title: '重定向', hidden: true }
  },
  {
    path: '/home',
    component: getComponent('home/index'),
    meta: { title: '首页' }
  },
  {
    path: '/doc-control',
    component: RouterView,
    meta: { title: '受控文件' },
    children: [
      {
        path: 'file-list',
        component: getComponent('doc-control/doc-control'),
        meta: { title: '受控文件' }
      }
    ]
  },
  {
    path: '/doc-audit-internal',
    component: RouterView,
    meta: { title: '内审文件' },
    children: [
      {
        path: 'file-list',
        component: getComponent('doc-audit-internal/doc-audit-internal'),
        meta: { title: '内审文件' }
      }
    ]
  },
  {
    path: '/doc-external',
    component: RouterView,
    meta: { title: '外部文件' },
    children: [
      {
        path: 'file-list',
        component: getComponent('doc-external/doc-external'),
        meta: { title: '外部文件' }
      }
    ]
  },
  {
    path: '/doc-audit-manage',
    component: RouterView,
    meta: { title: '管审文件' },
    children: [
      {
        path: 'file-list',
        component: getComponent('doc-audit-manage/doc-audit-manage'),
        meta: { title: '管审文件' }
      }
    ]
  },
  {
    path: '/not-conform',
    component: RouterView,
    meta: { title: '不符合项' },
    children: [
      {
        path: 'file-list',
        component: getComponent('not-conform/not-conform'),
        meta: { title: '不符合项' }
      }
    ]
  },
  {
    path: '/satisfaction-survey',
    component: getComponent('satisfaction-survey/satisfaction-survey'),
    meta: { title: '满意度统计' },
    children: [
      {
        path: 'satisfaction-survey',
        component: getComponent('satisfaction-survey/satisfaction-survey'),
        meta: { title: '满意度统计' }
      }
    ]
  },
  {
    path: '/satisfaction-stastic',
    redirect: '/satisfaction-stastic/six-line-chart',
    meta: { title: '单项指标直方图' },
    component: RouterView,
    children: [{
      path: 'single-line-chart',
      component: getComponent('satisfaction-stastic/single-line-chart'),
      meta: { title: '折线图标折线图' }
    },
    {
      path: 'six-line-chart',
      component: getComponent('satisfaction-stastic/six-line-chart'),
      meta: { title: '6项指标折线图' }
    },
    {
      path: 'single-column-chart',
      component: getComponent('satisfaction-stastic/single-column-chart'),
      meta: { title: '柱状图' }
    }
    ]
  },
  {
    path: '/workbench',
    redirect: '/workbench/operator-log',
    meta: { title: '我的工作台' },
    component: RouterView,
    children: [{
      path: 'operator-log',
      component: getComponent('workbench/operator-log'),
      meta: { title: '操作日志' }
    },
    {
      path: '/workbench/doc-control',
      redirect: '/workbench/doc-control/wait-compile',
      component: RouterView,
      meta: { title: '受控文件' },
      children: [{
        path: '/workbench/doc-control/wait-compile',
        component: getComponent('workbench/doc-control/wait-compile'),
        meta: { title: '待编制列表' }
      }, {
        path: '/workbench/doc-control/wait-approval',
        component: getComponent('workbench/doc-control/wait-approval'),
        meta: { title: '待审批列表' }
      }, {
        path: '/workbench/doc-control/wait-ratify',
        component: getComponent('workbench/doc-control/wait-ratify'),
        meta: { title: '待批准列表' }
      }]
    },
    {
      path: '/workbench/doc-audit-manage',
      redirect: '/workbench/doc-audit-manage/wait-compile',
      component: RouterView,
      meta: { title: '管审文件' },
      children: [{
        path: '/workbench/doc-audit-manage/wait-compile',
        component: getComponent('workbench/doc-audit-manage/wait-compile'),
        meta: { title: '待编制列表' }
      }, {
        path: '/workbench/doc-audit-manage/wait-approval',
        component: getComponent('workbench/doc-audit-manage/wait-approval'),
        meta: { title: '待审批列表' }
      }, {
        path: '/workbench/doc-audit-manage/wait-ratify',
        component: getComponent('workbench/doc-audit-manage/wait-ratify'),
        meta: { title: '待批准列表' }
      }]
    },
    {
      path: '/workbench/doc-audit-internal',
      redirect: '/workbench/doc-audit-internal/wait-compile',
      component: RouterView,
      meta: { title: '内审文件' },
      children: [{
        path: '/workbench/doc-audit-internal/wait-compile',
        component: getComponent('workbench/doc-audit-internal/wait-compile'),
        meta: { title: '待编制列表' }
      }, {
        path: '/workbench/doc-audit-internal/wait-approval',
        component: getComponent('workbench/doc-audit-internal/wait-approval'),
        meta: { title: '待审批列表' }
      }, {
        path: '/workbench/doc-audit-internal/wait-ratify',
        component: getComponent('workbench/doc-audit-internal/wait-ratify'),
        meta: { title: '待批准列表' }
      }]
    },
    {
      path: '/workbench/not-conform',
      redirect: '/workbench/not-conform/wait-dispose',
      component: RouterView,
      meta: { title: '不符合项' },
      children: [{
        path: '/workbench/not-conform/wait-dispose',
        component: getComponent('workbench/not-conform/wait-dispose'),
        meta: { title: '待处理列表' }
      }]
    },
    // {
    //   path:'not_conformity',
    //   redirect:'/workbench/'
    // },
    {
      path: 'auth-manage',
      redirect: '/workbench/auth-manage/user',
      meta: { title: '权限管理' },
      component: RouterView,
      children: [{
        path: 'user',
        component: getComponent('workbench/auth-manage/user'),
        meta: { title: '用户管理' }
      }, {
        path: 'role',
        component: getComponent('workbench/auth-manage/role'),
        meta: { title: '角色管理' }
      }]
    },
    {
      path: 'not_conformity',
      redirect: '/workbench/not_conformity/list-confirm',
      meta: { title: '不符合项' },
      component: RouterView,
      children: [
        {
          path: 'list-Responsible',
          component: getComponent('workbench/not_conformity/list-Responsible'),
          meta: { title: '待处理列表' }
        },
        {
          path: 'list-Verification',
          component: getComponent('workbench/not_conformity/list-Verification'),
          meta: { title: '待验证列表' }
        }
      ]
    }
    ]
  }
]
