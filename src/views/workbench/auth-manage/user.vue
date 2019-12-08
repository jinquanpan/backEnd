<template>
  <el-row>
    <el-card id="search-box" style="margin: 50px 0 20px 0;">
      <el-form ref="searchForm" :model="listQuery" inline>
        <el-form-item>
          <el-input v-model="listQuery.fileName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="listQuery.fileName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="listQuery.stutus" placeholder="用户状态">
            <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
          <el-button icon="el-icon-delete" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd()">新增用户</el-button>
    </el-card>

    <el-card>
      <el-table v-loading="listLoading" :data="list" stripe style="width: 100%">
        <el-table-column prop="id" label="用户id" width="100" />
        <el-table-column prop="loginName" label="用户名" width="100" />
        <el-table-column prop="operatorName" label="姓名" width="100" />
        <el-table-column prop="roleNames" label="角色列表" width="200">
          <template slot-scope="{row}">
            {{ row.roleNames.join(' ') }}
          </template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态" width="100" />
        <el-table-column prop="isLockedText" label="是否锁定" width="100" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" style="text-align: left" width="420">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleAdd(row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="handleChangePwd(row)">重置密码</el-button>
            <el-button v-if="row.status === 'ENABLED'" type="danger" size="mini" @click="handleToggleStatus(row)">停用</el-button>
            <el-button v-else type="success" size="mini" @click="handleToggleStatus(row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
    />

    <el-dialog :visible.sync="dialogVisible" :title="`${form.id ? '编辑' : '新增'}用户`">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="small">
        <el-form-item label="用户名:" prop="loginName">
          <el-input v-model="form.loginName" style="width:300px" />
        </el-form-item>
        <el-form-item label="真是姓名:" prop="operatorName">
          <el-input v-model="form.operatorName" style="width:300px" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="登录密码:" prop="loginPassword">
          <el-input v-model="form.loginPassword" style="width:300px" />
        </el-form-item>
        <el-form-item label="角色:" prop="roleIds">
          <el-select v-model="form.roleIds" multiple style="width:300px">
            <el-option v-for="item in roles" :key="item.label" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="5" style="width:500px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="pulishLoading" @click="handleSubmit">提交</el-button>
          <el-button :loading="pulishLoading" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { operatorAdd, operatorUpdate, operatorList, operatorRoleSelectList, operatorEnable, operatorDisable, operatorResetPassword } from '@/api/system'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        loginName: '',
        operatorName: '',
        roleId: '',
        stutus: '',
        page: 1,
        limit: 20
      },
      statusList: [
        { label: '正常', value: 'ENABLED' },
        { label: '停用', value: 'DISABLED' }
      ],
      dialogVisible: false,
      form: {
        loginName: '',
        operatorName: '',
        loginPassword: '',
        roleIds: [],
        remark: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入登陆名' }],
        operatorName: [{ required: true, message: '请输入真实姓名' }],
        loginPassword: [{ required: true, message: '请输入登陆密码' }],
        roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }]
      },
      roles: []
    }
  },
  created() {
    this.getList()
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      operatorRoleSelectList().then(res => {
        let arr = []
        for (let key in res) {
          arr.push({
            label: res[key],
            value: key
          })
        }
        this.roles = arr
      })
    },
    getList() {
      operatorList(this.listQuery).then((res) => {
        this.list = res.list
        this.total = res.total
      })
    },
    handleAdd(row) {
      this.dialogVisible = true
      if (row) {
        let roleIds = this.roles.filter(v => row.roleNames.some(child => child === v.label))
        roleIds = roleIds.map(v => v.value)
        this.form = {
          loginName: row.loginName,
          operatorName: row.operatorName,
          roleIds,
          remark: row.remark,
          id: row.id
        }
      } else {
        this.form = {
          loginName: '',
          operatorName: '',
          loginPassword: '',
          roleIds: [],
          remark: ''
        }
      }
      this.$refs.form && this.$refs.form.resetFields()
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const http = this.form.id ? operatorUpdate : operatorAdd
          http(this.form).then(() => {
            this.$message.success(`${this.form.id ? '编辑' : '新增'}成功`)
            this.getList()
            this.handleCancel()
          })
        }
      })
    },
    handleToggleStatus(row) {
      const msg = row.status === 'ENABLED' ? '停用' : '启用'
      const http = row.status === 'ENABLED' ? operatorDisable : operatorEnable
      this.$myConfirm(`${msg}此用户`, (done) => {
        http(row.id).then(() => {
          done()
          this.getList()
        })
      })
    },
    handleChangePwd(row) {
      this.$myConfirm('重置密码', (done) => {
        operatorResetPassword(row.id).then(() => {
          done()
        })
      })
    }
  }
}
</script>

