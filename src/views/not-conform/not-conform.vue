<template>
  <el-row>
    <el-card class="mb20 no-padding-bottom">
      <el-form ref="searchForm" inline :model="listQuery">
        <el-form-item prop="fileName">
          <el-input v-model="listQuery.fileNo" placeholder="不符合项编号" clearable />
        </el-form-item>
        <!-- 这里要修改 -->
        <el-form-item prop="fileStatus">
          <el-select v-model="listQuery.fileStatus" placeholder="状态" clearable>
            <el-option v-for="item in fileOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item prop="filePublishStartTime">
          <el-input v-model="listQuery.filePublishStartTime" placeholder="文件名称" clearable />
        </el-form-item>
        <el-form-item prop="filePublishEndTime">
          <el-input v-model="listQuery.filePublishEndTime" placeholder="确认人" clearable />
        </el-form-item>
        <el-form-item prop="fileName">
          <el-input v-model="listQuery.fileName" placeholder="部门责任人" clearable />
        </el-form-item>
        <el-form-item prop="fileName">
          <el-input v-model="listQuery.fileName" placeholder="具体负责人" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleFilter()">搜索</el-button>
          <el-button icon="el-icon-delete" @click="handleFilter('reset')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <el-button
        :disabled="backVisible"
        icon="el-icon-caret-left"
        size="mini"
        type="primary"
        @click="handleBack"
      >返回上级文件夹</el-button>
      <el-button
        v-if="$hasPermission('doc-control:file-list:create')"
        icon="el-icon-circle-plus-outline"
        size="mini"
        type="primary"
        @click="handleAddFolder()"
      >新建文件夹</el-button>
      <el-button
        v-if="$hasPermission('doc-control:file-list:publish')"
        icon="el-icon-upload"
        size="mini"
        type="primary"
        @click="handleAddFile()"
      >发起 </el-button>
    </el-card>

    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
        @cell-click="cellClick"
      >
        <el-table-column prop="folderName" label="编号" width="80">
          <template slot-scope="{row}">
            <file-icon :name="row.fileName || row.folderName" />
          </template>
        </el-table-column>
        <el-table-column prop="fileNo" label="文件名称" width="80" />
        <el-table-column prop="fileWriter" label="不符合项来源" width="110" />
        <el-table-column prop="fileReviewer" label="发现人员" width="80" />
        <el-table-column prop="fileApprover" label="发现时间" width="80" />
        <el-table-column prop="version" label="被审核部门" width="100" />
        <el-table-column prop="fileStatusText" label="判定依据" width="80" />
        <el-table-column prop="filePublishTime" label="不符合项原因" width="110">
          <template slot-scope="{row}">
            {{ row.fileControlTime|parseTime }}
          </template>
        </el-table-column>
        <el-table-column label="严重性" />
        <el-table-column label="确认人" />
        <el-table-column label="部门负责人" width="100" />
        <el-table-column label="具体负责人" width="100" />
        <el-table-column prop="filePublishTime" label="验证人">
          <template slot-scope="{row}">
            {{ row.fileControlTime|parseTime }}
          </template>
        </el-table-column>
        <el-table-column label="状态" style="text-align: left" width="420">
          <template slot-scope="{row}">
            <el-button v-if="!row.isFile" type="primary" size="mini" @click.stop="handleAddFolder(row)">重命名</el-button>
            <el-button
              v-if="!row.isFile && $hasPermission('doc-control:file-list:delete')"
              type="danger"
              size="mini"
              @click.stop="handleDelFolder(row)"
            >删除</el-button>
            <template v-else>
              <el-button
                v-if="row.fileStatus == 'CONTROLLED'"
                type="warning"
                size="mini"
                @click.stop="handleReAudit(row)"
              >升级</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:version')"
                type="success"
                size="mini"
                @click.stop="getVersions(row)"
              >版本</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:download')"
                type="warning"
                size="mini"
                @click.stop="handleDownload(row)"
              >下载</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:delete')"
                size="mini"
                type="danger"
                @click.stop="handleDelFile(row)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;font-size:14px;">
        <span style="margin-right:30px">文件个数：{{ fileCount }}</span>
        <span>文件夹个数：{{ list.length - fileCount }}</span>
      </div>

      <pagination
              v-show="total>0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="getList"
      />
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      title="发起"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-form-item label="不符合项编号:" prop="fileNo">
          <el-input v-model="form.fileNo" />
        </el-form-item>
        <el-form-item label="来源:" prop="fileStatus">
          <el-select v-model="form.fileStatus">
            <el-option
              v-for="item in fileOptions"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件名称:" prop="fileName">
          <el-input v-model="form.fileName" />
        </el-form-item>
        <el-form-item label="确认人:" prop="fileWriter">
          <el-input v-model="form.fileWriter" />
        </el-form-item>
        <el-form-item label="责任部门:" prop="fileReviewer">
          <el-input v-model="form.fileReviewer" />
        </el-form-item>
        <el-form-item label="部门责任人:" prop="fileApprover">
          <el-input v-model="form.fileApprover" />
        </el-form-item>
        <el-form-item label="具体负责人	:" prop="fileDesc">
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item label="验证人:" prop="fileDesc">
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item label="判定依据:" prop="fileDesc">
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item label="严重性:" prop="fileDesc">
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item label="不符合项原因:" prop="fileDesc">
          <el-input v-model="form.fileDesc" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="pulishLoading" @click="handlePublish">发起</el-button>
          <el-button
            :loading="pulishLoading"
            @click="dialogVisible = false"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="fileVersionVisible" title="版本列表" width="1200px">
      <VersionList
        v-if="fileNoForVersion"
        :id="fileNoForVersion"
      />
    </el-dialog>
  </el-row>
</template>

<script>
// import UploadFile from '@/components/UploadFile'
// import VersionList from './VersionList'
import {
  docControlList,
  // docControlRelease,
  docControlsaveFolder,
  docControlrenameFolder,
  docControlDeleteFolder,
  docControlSaveFile,
  docControlDelFile } from '@/api/doc-control'
import { fileOptions, defaultFolderId } from '@/util/notState'
import { filterQuery } from '@/util'

export default {
  components: {
    // UploadFile
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        folderId: defaultFolderId, // 所在文件夹id
        fileName: '',
        fileNo: '',
        fileStatus: '',
        filePublishStartTime: '',
        filePublishEndTime: ''
      },
      folderType: 'NOT_COMFORM',
      fileOptions: fileOptions,
      pulishLoading: false,
      dialogVisible: false,
      form: {
        fileName: '',
        fileWriter: '',
        fileReviewer: '',
        fileApprover: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: ''
      },
      rules: {
        fileNo: [{ required: true, message: '不符合项编号' }], // 文件编号
        // fileName: [{ required: true, message: '内审', trigger: 'change' }], // 文件名称
        // fileName: [{ required: true, message: '外审', trigger: 'change' }], // 文件名称
        // fileName: [{ required: true, message: '客户投诉', trigger: 'change' }], // 文件名称
        // fileName: [{ required: true, message: '质量监督', trigger: 'change' }], // 文件名称
        fileWriter: [{ required: true, message: '文件名称' }], // 编制人
        fileReviewer: [{ required: true, message: '确认人' }], // 审批人
        fileApprover: [{ required: true, message: '责任部门' }], // 批准人
        fileDesc: [{ required: true, message: '部门责任人' }], // 文件说明
        folderId: [{ required: true, message: '具体负责人' }], // 所在文件夹id
        fileStatus: [{ required: true, message: '验证人' }], // 文件状态
        file: [{ required: true, message: '判定依据' }]
        // file: [{ required: true, message: '严重性' }],
        // file: [{ required: true, message: '不符合项原因' }]
      },
      fileList: [],
      folderHistory: [defaultFolderId],
      fileVersionVisible: false,
      fileNoForVersion: ''
    }
  },
  computed: {
    backVisible() {
      return this.folderHistory.length === 1
    },
    fileCount() {
      return this.list.map(item => item.isFile).length
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      docControlList(filterQuery(this.listQuery)).then((res) => {
        this.listLoading = false
        this.list = res.list
        this.total = res.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleFilter(state) {
      if (state === 'reset') {
        this.$refs.searchForm.resetFields()
      }
      this.listQuery.page = 1
      this.getList()
    },
    handleBack() {
      this.folderHistory.pop()
      this.listQuery.folderId = this.folderHistory[this.folderHistory.length - 1]
      this.getList()
    },
    cellClick(row, column) {
      if (row.isFile) {
        return
      }
      if (row.folderId) {
        this.listQuery.folderId = row.folderId
        this.folderHistory.push(row.folderId)
        this.getList()
      }
    },
    handleAddFolder(row) {
      this.$myPrompt({
        title: `${row ? '编辑' : '新增'}文件夹`,
        message: '文件夹名称',
        inputValue: row ? row.folderName : '',
        inputPattern: (val) => {
          if (val) return true
          return '请输入文件夹名称'
        },
        success: (value) => {
          let form = {
            folderName: value,
            folderId: this.folderHistory[this.folderHistory.length - 1]
          }
          let http = null
          if (row) {
            form.currentfolderId = row.folderId
            http = docControlrenameFolder
          } else {
            http = docControlsaveFolder
          }
          http(form).then(() => {
            this.getList()
            this.$message.success(`${row ? '编辑' : '新增'}成功！`)
          })
        }
      })
    },
    handleDelFolder(row) {
      this.$delConfirm(row.folderName, (done) => {
        docControlDeleteFolder({ folderId: row.folderId }).then(() => {
          done()
          this.getList()
        })
      })
    },
    handleDelFile(row) {
      this.$delConfirm(row.fileName, (done) => {
        docControlDelFile({
          docControlId: row.docControlId
        }).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 显示新建文件弹框
    handleAddFile() {
      this.dialogVisible = true
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []
    },
    // 上传文件
    uploadFileChange({ file, fileFormat }) {
      this.form.fileFormat = fileFormat
      this.form.file = file
    },
    // 发起提交
    handlePublish() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let form = new FormData()
          this.form.folderId = this.folderHistory[this.folderHistory.length - 1]
          for (let i in this.form) {
            form.append(i, this.form[i])
          }
          this.pulishLoading = true
          docControlSaveFile(form).then(() => {
            this.$message.success('添加文件成功！')
            this.getList()
            this.pulishLoading = false
            this.dialogVisible = false
          }).catch(() => {
            this.pulishLoading = false
          })
        }
      })
    },
    // 下载
    handleDownload(row) {
      window.location.href = row.fileUrl
    },
    getVersions(row) {
      this.fileVersionVisible = true
      this.fileNoForVersion = row.fileNo
    }
  }
}
</script>

<style>
</style>
