import routerView from './routerView'
const getComponent = (component) => () => import(`@/views/${component}`)
export default [{
  path: '/home',
  component: getComponent('home/index'),
  meta: { title: '首页' }
},
{
  path: '/doc-control',
  component: routerView,
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
  path: '/doc-internal',
  component: routerView,
  meta: { title: '内审文件' },
  children: [
    {
      path: 'file-list',
      component: getComponent('doc-audit-internal/doc-internal'),
      meta: { title: '内审文件' }
    }
  ]
},
{
  path: '/doc-external',
  component: routerView,
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
  component: routerView,
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
  path: '/doc-audit-internal',
  component: routerView,
  meta: { title: 'doc-audit-internal' },
  children: [
    {
      path: 'file-list',
      component: getComponent('doc-audit-internal/doc-audit-internal'),
      meta: { title: 'doc-audit-internal' }
    }
  ]
},
{
  path: '/not-conform',
  component: routerView,
  meta: { title: '不符合项' },
  children: [
    {
      path: 'file-list',
      component: getComponent('not-conform/not-conform'),
      meta: { title: '不符合项' }
    }
  ]
},
// {
//   path: '/not-',
//   component: routerView,
//   meta: { title: '不符合项' },
//   children: [
//     {
//       path: 'file-list',
//       component: getComponent('not-conform/not-conform'),
//       meta: { title: '不符合项' }
//     }
//   ]
// },
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
  component: routerView,
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
  component: routerView,
  children: [{
    path: 'operator-log',
    component: getComponent('workbench/operator-log'),
    meta: { title: '操作日志' }
  },
  {
    path: 'wait-approval',
    component: getComponent('workbench/wait-approval'),
    meta: { title: '待审批列表' }
  },
  {
    path: 'wait-compile',
    component: getComponent('workbench/wait-compile'),
    meta: { title: '待编制列表' }
  },
  {
    path: 'wait-ratify',
    component: getComponent('workbench/wait-ratify'),
    meta: { title: '待批准列表' }
  },
  // {
  //   path:'not_conformity',
  //   redirect:'/workbench/'
  // },
  {
    path: 'auth-manage',
    redirect: '/workbench/auth-manage/user',
    meta: { title: '权限管理' },
    component: routerView,
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
    component: routerView,
    children: [
      {
        path: 'list-confirm',
        component: getComponent('workbench/not_conformity/list-confirm'),
        meta: { title: '待确认列表' }
      },
      {
        path: 'list-Assign',
        component: getComponent('workbench/not_conformity/list-Assign'),
        meta: { title: '待指派列表' }
      },
      {
        path: 'list-Responsible',
        component: getComponent('workbench/not_conformity/list-Responsible'),
        meta: { title: '待负责列表' }
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
