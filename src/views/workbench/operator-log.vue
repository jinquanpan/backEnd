<template>
  <el-card>
    <el-table
            :data="tableData3"
            height="250"
            border
            style="width: 100%"
    >
      <el-table-column prop="name" label="操作员" width="180" />
      <el-table-column prop="name" label="操作员姓名" width="180" />
      <el-table-column prop="operate" label="操作类型" width="180" />
      <el-table-column prop="date" label="操作日期" width="180" />
      <el-table-column prop="address" label="手机号码" />
      <el-table-column prop="email" label="邮箱" />
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        operate: '审核',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-02',
        name: '小虎',
        operate: '批准',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        operate: '编制',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        operate: '作废',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '17688839685',
        email: 'admin@qq.com'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '17688839685',
        email: 'admin@qq.com'
      }]
    }
  }
}
</script>
