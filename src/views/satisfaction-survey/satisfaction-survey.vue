<template>
    <el-row>
        <el-card id="search-box" style="margin: 50px 0 20px 0;">
            <el-input v-model="input" placeholder="请输入受访人" style="width: 10%; margin: 0 5px 0 5px" />
            <el-input v-model="input" placeholder="请输入手机号" style="width: 10%; margin: 0 5px 0 5px" />
            <el-input v-model="input" placeholder="请输入邮箱" style="width: 10%; margin: 0 5px 0 5px" />

            <el-select v-model="value" placeholder="访问形式" style="width: 10%; margin: 0 5px 0 5px">
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
                    placeholder="受访日期"
                    :picker-options="pickerOptions1"
                    style="width: 10%; margin: 0 5px 0 5px"
            />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-card>
        <el-card>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="受访人" />
                <el-table-column prop="phone" label="手机号码" />
                <el-table-column
prop="email"
label="
        邮箱"
/>
                <el-table-column
prop="visitType"
label="
        访问形式"
/>
                <el-table-column prop="service" label="客服态度" />
                <el-table-column prop="comunication" label="沟通情况" />
                <el-table-column prop="tech" label="技术水平" />
                <el-table-column prop="sample" label="样品流畅度" />
                <el-table-column prop="reqeust" label="投诉及时性" />
                <el-table-column prop="result" label="投诉处理结果" />
                <el-table-column prop="visitDate" label="受访日期" />
            </el-table>
            <el-pagination
background
layout="prev, pager, next"
:total="1000"
                           style="margin-top: 100px"
/>
        </el-card>
    </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          visitDate: '2016-05-02',
          name: '小伟',
          phone: '17688839685',
          email: 'wei@163.com',
          visitType: '短信',
          service: '5星',
          comunication: '5星',
          tech: '5星',
          sample: '5星',
          reqeust: '5星',
          result: '5星'
        },
        {
          visitDate: '2016-05-02',
          name: '小刘',
          phone: '17688839685',
          email: 'wei@163.com',
          visitType: '邮件',
          service: '2星',
          comunication: '5星',
          tech: '3星',
          sample: '4星',
          reqeust: '5星',
          result: '4星'
        }
      ],
      fileStates: [
        { value: '邮件', lable: 'CONTROL' },
        { value: '短信', lable: 'INVALID' }
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
