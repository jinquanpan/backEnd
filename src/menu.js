// 全部菜单
export const menu = [{
  icon: 'el-icon-s-home',
  index: '/home',
  title: '首页'
},
{
  icon: 'el-icon-s-platform',
  index: '/workbench',
  title: '我的工作台',
  // 我的控制台
  subs: [
    {
      index: '/workbench/doc-control',
      title: '受控文件',
      show: true,
      // 满意度调查
      subs: [{
        index: '/workbench/doc-control/wait-compile',
        title: '待编制列表'
      }, {
        index: '/workbench/doc-control/wait-approval',
        title: '待审批列表'
      }, {
        index: '/workbench/doc-control/wait-ratify',
        title: '待批准列表'
      }]
    },
    {
      index: '/workbench/doc-audit-manage',
      title: '管审文件',
      show: true,
      // 满意度调查
      subs: [{
        index: '/workbench/doc-audit-manage/wait-compile',
        title: '待编制列表'
      }, {
        index: '/workbench/doc-audit-manage/wait-approval',
        title: '待审批列表'
      }, {
        index: '/workbench/doc-audit-manage/wait-ratify',
        title: '待批准列表'
      }]
    },
    {
      index: '/workbench/doc-audit-internal',
      title: '内审文件',
      show: true,
      // 满意度调查
      subs: [{
        index: '/workbench/doc-audit-internal/wait-compile',
        title: '待编制列表'
      }, {
        index: '/workbench/doc-audit-internal/wait-approval',
        title: '待审批列表'
      }, {
        index: '/workbench/doc-audit-internal/wait-ratify',
        title: '待批准列表'
      }]
    },
    {
      index: '/workbench/not-conform',
      title: '不符合项',
      show: true,
      subs: [{
        index: '/workbench/not-conform/wait-dispose',
        title: '待处理列表'
      }]
    },
    {
      index: '/auth-manage',
      title: '权限管理',
      show: true,
      // 满意度调查
      subs: [{
        index: '/workbench/auth-manage/user',
        title: '用户管理',
        show: true
      }, {
        index: '/workbench/auth-manage/role',
        title: '角色管理',
        show: true
      }]
    }, {
      index: '/workbench/operator-log',
      title: '操作日志'
    }
  ]
},
{
  icon: 'el-icon-edit',
  index: '/doc-control',
  title: '受控文件',
  // 受控文件
  subs: [{
    index: '/doc-control/file-list',
    title: '受控文件'
  }]
},
{
  icon: 'el-icon-setting',
  index: '/doc-external',
  title: '外部文件',
  // 外部文件
  subs: [{
    index: '/doc-external/file-list',
    title: '外部文件'
  }]
},
{
  icon: 'el-icon-rank',
  index: '/doc-audit-internal',
  title: '内审文件',
  // 内审文件
  subs: [{
    index: '/doc-audit-internal/file-list',
    title: '内审文件'
  }]
},
{
  icon: 'el-icon-document',
  index: '/doc-audit-manage',
  title: '管审文件',
  // 管审文件
  subs: [{
    index: '/doc-audit-manage/file-list',
    title: '管审文件'
  }]
},
{
  icon: 'el-icon-menu',
  index: '/not-conform',
  title: '不符合项',
  // 不符合项
  subs: [{
    index: '/not-conform/file-list',
    title: '不符合项'
  }]
},
{
  icon: 'el-icon-news',
  index: '/satisfaction-survey',
  title: '满意度调查',
  // 满意度调查
  subs: [{
    index: '/satisfaction-survey/satisfaction-survey',
    title: '满意度调查'
  }]
},
{
  icon: 'el-icon-info',
  index: '/satisfaction-stastic',
  title: '满意度统计',
  // 满意度统计
  subs: [{
    index: '/satisfaction-stastic/six-line-chart',
    title: '6项指标折线图'
  }, {
    index: '/satisfaction-stastic/single-line-chart',
    title: '单项指标折线图'
  }, {
    index: '/satisfaction-stastic/single-column-chart',
    title: '单项指标直方图'
  }]
}
]
