var list = [{
    fileWriter: '', // 编制人
    fileReviewer: '', // 审批人
    fileApprover: '', // 批准人
    date: "2016-05-02",
    name: "xxx文件夹1",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1518 弄",
    fileStatus: 'CONTROL',
    folder: true,
    children: [{
        fileWriter: '张三', // 编制人
        fileReviewer: '李四', // 审批人
        fileApprover: '王五', // 批准人
        date: "2016-05-04",
        name: "xxx文档.doc",
        vserion: "V0.0.1",
        address: "上海市普陀区金沙江路 1517 弄",
        fileStatus: 'CONTROL'
      },
      {
        fileWriter: '张三', // 编制人
        fileReviewer: '李四', // 审批人
        fileApprover: '王五', // 批准人
        date: "2016-05-04",
        name: "xxx文档2.pdf",
        vserion: "V0.0.1",
        address: "上海市普陀区金沙江路 1517 弄",
        fileStatus: 'CONTROL'
      },
    ]
  },
  {
    fileWriter: '', // 编制人
    fileReviewer: '', // 审批人
    fileApprover: '', // 批准人
    date: "2016-05-02",
    name: "xxx文件夹2",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1518 弄",
    fileStatus: 'CONTROL',
    folder: true,
    children: [{
        fileWriter: '张三', // 编制人
        fileReviewer: '李四', // 审批人
        fileApprover: '王五', // 批准人
        date: "2016-05-04",
        name: "不知道是什么文档.doc",
        vserion: "V0.0.1",
        address: "上海市普陀区金沙江路 1517 弄",
        fileStatus: 'CONTROL'
      },
      {
        fileWriter: '张三', // 编制人
        fileReviewer: '李四', // 审批人
        fileApprover: '王五', // 批准人
        date: "2016-05-04",
        name: "不知道是什么文档2.pdf",
        vserion: "V0.0.1",
        address: "上海市普陀区金沙江路 1517 弄",
        fileStatus: 'CONTROL'
      },
    ]
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
    fileNumber: '1000001',
    date: "2016-05-04",
    name: "3.目标分解及考核办法.doc",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1517 弄",
    fileStatus: 'CONTROL'
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
      fileNumber: '1000001',
    date: "2016-05-01",
    name: "4.考核记录表.xls",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1519 弄",
    fileStatus: 'CONTROL'
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
      fileNumber: '1000001',
    date: "2016-05-03",
    name: "7.隐私协议.xls",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1516 弄",
    fileStatus: 'CONTROL'
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
      fileNumber: '1000001',
    date: "2016-05-03",
    name: "7.安全生产管理网络.pdf",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1516 弄",
    fileStatus: 'CONTROL'
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
      fileNumber: '1000001',
    date: "2016-05-03",
    name: "7.安全手册.ppt",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1516 弄",
    fileStatus: 'CONTROL'
  },
  {
    fileWriter: '张三', // 编制人
    fileReviewer: '李四', // 审批人
    fileApprover: '王五', // 批准人
      fileNumber: '1000001',
    date: "2016-05-03",
    name: "7.用户协议.ppt",
    vserion: "V0.0.1",
    address: "上海市普陀区金沙江路 1516 弄",
    fileStatus: 'CONTROL'
  }
]

export default [{
  url: '/file/list',
  type: 'get',
  response: options => {
    return list
  }
}]
