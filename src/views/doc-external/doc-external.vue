<template>
  <el-row>
    <el-card
      id="search-box"
      style="margin: 50px 0 20px 0;"
    >
      <el-input
        v-model="fileName"
        placeholder="请输入文件名"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-input
        v-model="fileId"
        placeholder="请输入版本号"
        style="width: 10%; margin: 0 5px 0 5px"
      />

      <el-select
        v-model="fileState"
        placeholder="文件状态"
        style="width: 10%; margin: 0 5px 0 5px"
      >
        <el-option
          v-for="item in fileStates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="fileDate"
        align="right"
        type="date"
        placeholder="生效日期"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-date-picker
        v-model="fileUpdata"
        align="right"
        type="date"
        placeholder="修改日期"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter()"
      >搜索</el-button>
      <el-button
        icon="el-icon-delete"
        @click="handleFilter('reset')"
      >重置</el-button>
    </el-card>
    <el-card style="margin-bottom:20px;">
      <el-button
        size="mini"
        type="primary"
      >
        <i class="el-icon-caret-left el-icon--right" />返回上级文件夹
      </el-button>
      <el-button
        size="mini"
        type="primary"
      >
        新建文件夹
        <i class="el-icon-circle-plus-outline el-icon--right" />
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleAddFile()"
      >
        发起
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >

        <el-table-column
          prop="fileName"
          label="文件名"
        />
        <el-table-column
          prop="interimTime"
          label="过渡期"
        />
        <el-table-column
          prop="fileNo"
          label="版本"
        />
        <el-table-column
          prop="fileType"
          label="文件类型"
        />
        <el-table-column
          prop="effectiveDate"
          label="生效日期"
        />

        <el-table-column
          label="操作"
          width="350"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="mini"
              @click="handleUpgrade(scope.$index, scope.row)"
            >升级</el-button>
            <el-button
              type="success"
              size="mini"
              @click.stop="getVersions(scope.$index, scope.row)"
            >版本</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDownload(scope.$index, scope.row)"
            >下载</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >生效</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        style="margin-top: 100px"
        current-change="pages"
      />
    </el-card>
    <el-dialog
      :visible.sync="fileDialogVisible"
      :title="form.docExternalId ? '升级' : '发起'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-form-item
          v-if="isSaveFile"
          label="文件编号:"
          prop="fileNo"
        >
          <el-input v-model="form.fileNo" />
        </el-form-item>
        <el-form-item
          label="文件名称:"
          prop="fileName"
        >
          <el-input v-model="form.fileName" />
        </el-form-item>
        <el-form-item
          label="文件说明:"
          prop="fileDesc"
        >
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item
          label="过渡期:"
          prop="fileEffectiveDate"
        >
          <el-date-picker
            v-model="form.interimStartTime"
            type="date"
            placeholder="开始日期"
            value-format="yyyy-MM-dd"
          />
          <el-date-picker
            v-model="form.interimEndTime"
            type="date"
            placeholder="结束日期"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="文件类型:"
          prop="fileType"
        >
          <el-select v-model="form.fileType">
            <el-option
              v-for="item in fileTypes"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="文件:"
          prop="file"
        >
          <UploadFile
            :loading="pulishLoading"
            :file-list="fileList"
            @change="uploadFileChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="pulishLoading"
            @click="handlePublish"
          >提交</el-button>
          <el-button
            :loading="pulishLoading"
            @click="fileDialogVisible = false"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="fileVersionVisible"
      title="版本列表"
      width="1200px"
    >
      <VersionList
        v-if="fileNoForVersion"
        :id="fileNoForVersion"
      />
    </el-dialog>
  </el-row>
</template>

<script>
import { listExternal, listDelete, listEffect, docExternalUpgrade, docExternalSaveFile } from '@/api/doc-external'
import UploadFile from '@/components/UploadFile'
import VersionList from './VersionList'

export default {

  components: {
    VersionList,
    UploadFile
  },
  data() {
    return {
      fileName: '',
      fileId: '',
      fileState: '',
      fileDate: '',
      fileUpdata: '',
      tableData: [
      ],
      listQuery: {
        page: 1,
        limit: 10
      },
      fileStates: [
        { value: '过渡期有效', lable: 'CONTROL' },
        { value: '生效', lable: 'VALID' }
      ],
      fileTypes: [{ value: '法律法规', lable: 'LAW' },
        { value: 'CNAS认可要求', lable: 'CNAS' },
        { value: '标准原文', lable: 'STANDARD_ORIGINAL' },
        { value: '客户标准', lable: 'CUSTOMER_STANDARD' }],
      fileDialogVisible: false,
      fileVersionVisible: false,
      fileNoForVersion: '',
      form: {
        docExternalId: 0,
        fileName: '',
        interimStartTime: '',
        interimEndTime: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: '',
        fileEffectiveDate: ''
      },
      pulishLoading: false,
      fileList: [],
      rules: {
        fileName: [{ required: true, message: '请输入文件名称' }], // 文件名称
        fileDesc: [{ required: true, message: '请输入文件说明' }], // 文件说明
        file: [{ required: true, message: '请选择上传文件', trigger: 'change' }]
      },
      docExternalId: 0
    }
  },
  created() {
    console.log(this)
    this.getList()
  },
  methods: {
    handleEdit(index, rows) {
      var uid = rows.docExternalId
      uid = { docExternalId: uid }
      console.log(uid)
      listEffect(uid).then(res => {
        this.getList()
      })
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleFilter(state) {
      if (state === 'reset') {
        this.fileName = ''
        // this.$refs.searchForm.resetFields()

      }
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      listExternal(this.listQuery).then(res => {
        this.tableData = res.list
        console.log(this.listQuery)
      })
    },
    handleDelFile(index, rows) {
      var uid = rows[index].docExternalId
      uid = { docExternalId: uid }
      console.log(uid)
      listDelete(uid).then(res => {
        this.getList()
      })
    },
    pages(e) {
      console.log(e)
    },
    handleDownload(index, rows) {
      console.log(rows.fileUrl)
      // window.location.href=rows.fileUrl
    },
    handleAddFile(row) {
      this.fileDialogVisible = true
      this.isSaveFile = true
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []
      this.form = {
        fileName: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: '',
        fileEffectiveDate: '',
        docExternalId: 0
      }
    },
    handleUpgrade(index, row) {
      this.fileDialogVisible = true
      this.isSaveFile = false
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []
      this.form = {
        fileName: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: '',
        fileEffectiveDate: '',
        docExternalId: row.docExternalId
      }
      this.docExternalId = row.docExternalId
      console.log('docExternalId', this.docExternalId)
    },
    // 添加文件
    handlePublish(form, done) {
      console.log('添加文件')
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pulishLoading = true
          let form = new FormData()
          this.form.folderId = 0
          for (let i in this.form) {
            form.append(i, this.form[i])
          }
          const http = this.isSaveFile ? docExternalSaveFile : docExternalUpgrade
          this.form.docExternalId = this.docExternalId
          console.log('this.docExternalId', this.docExternalId)
          http(form).then(() => {
            this.getList()
            this.fileDialogVisible = false
            done()
          }).catch(() => {
            this.pulishLoading = false
          })
        }
      })
    },
    // 上传文件
    uploadFileChange({ file, fileFormat }) {
      this.form.fileFormat = fileFormat
      this.form.file = file
    },
    getVersions(index, row) {
      console.log('row.fileNo', row)
      this.fileVersionVisible = true
      this.fileNoForVersion = row.fileNo
      console.log('fileNo', this.fileNoForVersion)
    }
  }
}
</script>

<style scoped>
</style>
