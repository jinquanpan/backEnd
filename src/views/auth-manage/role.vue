<template>
  <el-row>
    <el-card id="search-box" style="margin: 50px 0 20px 0;">
      <el-form ref="searchForm" :model="listQuery" inline>
        <el-form-item>
          <el-input v-model="listQuery.fileName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
          <el-button icon="el-icon-delete" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd()">新增角色</el-button>
    </el-card>

    <el-card>
      <el-table v-loading="listLoading" :data="list" stripe style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" width="100" />
        <el-table-column prop="remark" label="备注" width="200" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" style="text-align: left" width="420">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="`${form.id ? '编辑' : '新增'}角色`">
      <el-form :key="formKey" ref="form" :model="form" :rules="rules" label-width="120px" size="small">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input v-model="form.roleName" style="width:200px" />
        </el-form-item>
        <el-form-item label="权限配置:" prop="permissionCodes">
          <el-tree
                  ref="tree"
                  :data="permissions"
                  show-checkbox
                  node-key="permissionCode"
                  :props="defaultProps"
/>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="5" style="width:500px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="pulishLoading" @click="handleSubmit">提交</el-button>
          <el-button :loading="pulishLoading" @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import { roleList, roleAdd, roleUpdate, rolePermissionList, roleDetail, roleRemove } from '@/api/system'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      total: 0,
      listQuery: {
        roleName: '',
        username: '',
        role: '',
        stutus: '',
        page: 1,
        limit: 20
      },
      statusList: [
        { label: '正常', value: 'ZC' },
        { label: '停用', value: 'TY' }
      ],
      dialogVisible: false,
      form: {
        roleName: '',
        permissionCodes: [],
        remark: ''
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名称' }]
      },
      permissions: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      },
      formKey: Math.random()
    }
  },
  created() {
    this.getList()
    this.getPermission()
  },
  methods: {
    getList() {
      this.listLoading = true
      roleList(this.listQuery).then((res) => {
        this.list = res.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    getPermission() {
      rolePermissionList().then(res => {
        this.permissions = res
      })
    },
    resetForm() {
      this.$refs.searchForm && this.$refs.searchForm.resetFields()
      this.getList()
    },
    handleAdd(row) {
      this.dialogVisible = true
      if (row) {
        roleDetail(row.id).then(res => {
          this.form = {
            roleName: res.roleName,
            permissionCodes: res.permissionCodes,
            remark: res.remark,
            id: res.id
          }
          this.$refs.tree.setCheckedKeys(res.permissionCodes)
        })
      } else {
        this.form = {
          roleName: '',
          permissionCodes: [],
          remark: ''
        }
        this.$refs.tree.setCheckedKeys([])
      }
      this.formKey = Math.random()
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.permissionCodes = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
          let http = null
          if (this.form.id) {
            http = roleUpdate
          } else {
            http = roleAdd
          }
          http(this.form).then(() => {
            this.$message.success(`${this.form.id ? '编辑' : '新增'}成功！`)
            this.getList()
            this.dialogVisible = false
          })
        }
      })
    },
    handleDel(row) {
      this.delConfirm('角色', (done) => {
        roleRemove(row.id).then(() => {
          done()
          this.getList()
        })
      })
    }
  }
}
</script>

