<template>
  <el-row>
    <el-card id="search-box" style="margin: 50px 0 20px 0;">
      <el-input v-model="input" placeholder="请输入文件名" style="width: 10%; margin: 0 5px 0 5px" />
      <el-input v-model="input" placeholder="请输入版本号" style="width: 10%; margin: 0 5px 0 5px" />
      <el-input v-model="input" placeholder="请输入发起人" style="width: 10%; margin: 0 5px 0 5px" />
      <el-input v-model="input" placeholder="请输入确认人" style="width: 10%; margin: 0 5px 0 5px" />
      <el-input v-model="input" placeholder="请输入负责人" style="width: 10%; margin: 0 5px 0 5px" />
      <el-select v-model="value" placeholder="文件状态" style="width: 10%; margin: 0 5px 0 5px">
        <el-option
          v-for="item in fileStates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="生效日期"
        :picker-options="pickerOptions1"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="修改日期"
        :picker-options="pickerOptions1"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-card>
    <el-card style="margin-bottom:20px;">
      <el-button size="mini" type="primary">
        <i class="el-icon-caret-left el-icon--right" />返回上级文件夹
      </el-button>
      <el-button size="mini" type="primary">
        新建不符合项
        <i class="el-icon-circle-plus-outline el-icon--right" />
      </el-button>
      <el-button size="mini" type="primary">
        发布
        <i class="el-icon-upload el-icon--right" />
      </el-button>
      <el-button size="mini" type="primary">
        下载
        <i class="el-icon-download el-icon--right" />
      </el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="文件名" />
        <el-table-column prop="lanch" label="发起人" />
        <el-table-column prop="auditer" label="确认人" />
        <el-table-column prop="auditer" label="部门负责人" />
        <el-table-column prop="auditer" label="负责人" />
        <el-table-column prop="auditer" label="验证人" />
        <el-table-column prop="vserion" label="版本" />
        <el-table-column prop="date" label="修改日期" />

        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">确认</el-button>
            <el-button type="info" size="mini" @click="handleEdit(scope.$index, scope.row)">初审</el-button>
            <el-button type="warning" size="mini" @click="handleEdit(scope.$index, scope.row)">验证</el-button>
            <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">版本</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 100px" />
    </el-card>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '年度总结大会',
          vserion: 'V0.0.1',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '会议签到表.xlsx',
          vserion: 'V0.0.1',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-03',
          name: '参会人员名单.doc',
          vserion: 'V0.0.1',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      fileStates: [
        { value: '失效', lable: 'INVALID' },
        { value: '发起', lable: 'COMFIRM' },
        { value: '确认', lable: 'COMFIRM' },
        { value: '初审', lable: 'INVALID' },
        { value: '整改', lable: 'INVALID' },
        { value: '验证', lable: 'INVALID' },
        { value: '有效', lable: 'INVALID' }
      ]
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
