<template>
  <el-row>
    <el-card class="mb20 no-padding-bottom">
      <el-form
        ref="searchForm"
        inline
        :model="listQuery"
      >
        <el-form-item prop="fileName">
          <el-input
            v-model="listQuery.fileName"
            placeholder="输入文件名"
            clearable
          />
        </el-form-item>
        <el-form-item prop="fileName">
          <el-input
            v-model="listQuery.fileNo"
            placeholder="输入文件编号"
            clearable
          />
        </el-form-item>
        <el-form-item prop="fileStatus">
          <el-select
            v-model="listQuery.fileStatus"
            placeholder="文件状态"
            clearable
          >
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="filePublishStartTime">
          <el-date-picker
            v-model="listQuery.filePublishStartTime"
            placeholder="请选择起始日期"
            clearable
          />
        </el-form-item>
        <el-form-item prop="filePublishEndTime">
          <el-date-picker
            v-model="listQuery.filePublishEndTime"
            placeholder="请选择结束日期"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="$_handleFilter()"
          >搜索</el-button>
          <el-button
            icon="el-icon-delete"
            @click="$_handleFilter('reset')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <el-button
        :disabled="folderHistory.length === 1"
        icon="el-icon-caret-left"
        size="mini"
        type="primary"
        @click="$_handleBack"
      >返回上级文件夹</el-button>
      <el-button
        v-if="hasPermission('doc-control:file-list:create')"
        icon="el-icon-circle-plus-outline"
        size="mini"
        type="primary"
        @click="handleAddFolder()"
      >新建文件夹</el-button>
      <el-button
        v-if="hasPermission('doc-control:file-list:publish')"
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
      >
        <el-table-column
          prop="folderName"
          label="文件名"
          width="300"
        >
          <template slot-scope="{row}">
            <div class="filename-container">
              <file-icon
                :name="row.fileName || row.folderName"
                @click="$_inserFolder(row)"
              />
              <div class="right">
                <i
                  v-if="row.isFile"
                  class="el-icon-menu"
                  @click="showFileDetail(row)"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileNo"
          label="文件编号"
          width="150"
        />
        <el-table-column
          prop="fileWriter"
          label="编制人"
          width="100"
        />
        <el-table-column
          prop="fileReviewer"
          label="审批人"
          width="100"
        />
        <el-table-column
          prop="fileApprover"
          label="批准人"
          width="100"
        />
        <el-table-column
          prop="version"
          label="版本"
          width="150"
        />
        <el-table-column
          prop="fileStatusText"
          label="状态"
          width="80"
        />
        <el-table-column
          prop="filePublishTime"
          label="发布日期"
          width="150"
        />
        <el-table-column
          label="操作"
          width="420"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="!row.isFile"
              type="primary"
              size="mini"
              @click.stop="handleAddFolder(row)"
            >重命名</el-button>
            <el-button
              v-if="!row.isFile && hasPermission('doc-control:file-list:delete')"
              type="danger"
              size="mini"
              @click.stop="handleDelFolder(row)"
            >删除</el-button>
            <template v-else>
              <el-button
                v-if="row.fileStatus == 'CONTROLLED'"
                type="warning"
                size="mini"
                @click.stop="handleAddFile(row)"
              >升级</el-button>
              <el-button
                v-if="hasPermission('doc-control:file-list:version')"
                type="success"
                size="mini"
                @click.stop="getVersions(row)"
              >版本</el-button>
              <el-button
                v-if="hasPermission('doc-control:file-list:download')"
                type="warning"
                size="mini"
                @click.stop="handleDownload(row)"
              >下载</el-button>
              <el-button
                v-if="hasPermission('doc-control:file-list:delete')"
                size="mini"
                type="danger"
                @click.stop="handleDelFile(row)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column />
      </el-table>

      <div
        v-if="folderHistory.length === 1"
        style="margin-top: 20px;font-size:14px;"
      >
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
      :visible.sync="fileDialogVisible"
      :title="form.docControlId ? '升级' : '发起'"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-form-item
          v-if="!form.docControlId"
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
          label="编制人:"
          prop="fileWriter"
        >
          <el-input v-model="form.fileWriter" />
        </el-form-item>
        <el-form-item
          label="审批人:"
          prop="fileReviewer"
        >
          <el-input v-model="form.fileReviewer" />
        </el-form-item>
        <el-form-item
          label="批准人:"
          prop="fileApprover"
        >
          <el-input v-model="form.fileApprover" />
        </el-form-item>
        <el-form-item
          label="文件说明:"
          prop="fileDesc"
        >
          <el-input v-model="form.fileDesc" />
        </el-form-item>
        <el-form-item
          label="生效日期:"
          prop="fileEffectiveDate"
        >
          <el-date-picker
            v-model="form.fileEffectiveDate"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="文件状态:"
          prop="fileStatus"
        >
          <el-select v-model="form.fileStatus">
            <el-option
              v-for="item in fileOptions"
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
            :file.sync="form.file"
            :file-format.sync="form.fileFormat"
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
    <el-dialog
      title="文件详情"
      :visible.sync="fileDetailDialogVisible"
    >
      <FileDetail :data="fileDetail" />
    </el-dialog>
  </el-row>
</template>

<script>
import VersionList from './VersionList'
import FileDetail from './FileDetail'
import UploadFile from '@/components/UploadFile'
import {
  docControlList,
  // docControlRelease,
  docControlsaveFolder,
  docControlrenameFolder,
  docControlDeleteFolder,
  docControlSaveFile,
  docControlDelFile,
  docControlDetail,
  docControlUpgrade
} from '@/api/doc-control'
import { doControlFileOptions, defaultFolderId } from '@/util/config'
import { filterQuery } from '@/util'
import folderMix from '@/util/mixins/folderMix'

export default {
  components: {
    VersionList,
    FileDetail,
    UploadFile
  },
  mixins: [folderMix],
  data() {
    return {
      total: 0,
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        folderId: '', // 所在文件夹id
        fileName: '',
        fileNo: '',
        fileStatus: '',
        filePublishStartTime: '',
        filePublishEndTime: ''
      },
      folderType: 'NOT_COMFORM',
      fileOptions: doControlFileOptions,
      fileDialogVisible: false,
      fileVersionVisible: false,
      fileNoForVersion: '',
      isPdf: false,
      pdfSrc: '',
      fileDetailDialogVisible: false,
      fileDetail: {},
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
        fileNo: '',
        fileEffectiveDate: ''
      },
      rules: {
        fileNo: [{ required: true, message: '请输入文件编号' }], // 文件编号
        fileName: [{ required: true, message: '请输入文件名称' }], // 文件名称
        fileWriter: [{ required: true, message: '请输入编制人' }], // 编制人
        fileReviewer: [{ required: true, message: '请输入审批人' }], // 审批人
        fileApprover: [{ required: true, message: '请输入批准人' }], // 批准人
        fileDesc: [{ required: true, message: '请输入文件说明' }], // 文件说明
        folderId: [{ required: true, message: '请输入所在文件夹id' }], // 所在文件夹id
        fileEffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'change' }], // 生效日期
        fileStatus: [{ required: true, message: '请选择文件状态', trigger: 'change' }], // 文件状态
        file: [{ required: true, message: '请选择上传文件', trigger: 'change' }]
      },
      pulishLoading: false,
      fileList: []
    }
  },
  computed: {
    fileCount() {
      return this.list.filter(item => item.isFile).length
    }
  },
  created() {
    console.log(this)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let form = filterQuery(this.listQuery)
      if (!form.folderId) {
        form.folderId = defaultFolderId
      }
      docControlList(form).then((res) => {
        this.listLoading = false
        this.list = res.list
        this.total = res.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleAddFolder(row) {
      this.prompt({
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
      this.delConfirm('此文件夹', (done) => {
        docControlDeleteFolder({ folderId: row.folderId }).then(() => {
          done()
          this.getList()
        })
      })
    },
    handleDelFile(row) {
      this.delConfirm('此文件', (done) => {
        docControlDelFile({
          docControlId: row.docControlId
        }).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 显示新建文件弹框
    handleAddFile(row) {
      this.fileDialogVisible = true
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []

      if (row) {
        docControlDetail(row.docControlId).then(res => {
          this.form = {
            fileName: res.fileName,
            fileWriter: res.fileWriter,
            fileReviewer: res.fileReviewer,
            fileApprover: res.fileApprover,
            fileDesc: res.fileDesc,
            folderId: res.folderId,
            fileStatus: res.fileStatus,
            file: null,
            fileFormat: res.fileFormat,
            fileNo: res.fileNo,
            fileEffectiveDate: res.fileEffectiveDate,
            docControlId: res.docControlId
          }
        })
      } else {
        this.form = {
          fileName: '',
          fileWriter: '',
          fileReviewer: '',
          fileApprover: '',
          fileDesc: '',
          folderId: '',
          fileStatus: '',
          file: null,
          fileFormat: '',
          fileNo: '',
          fileEffectiveDate: ''
        }
      }
    },
    // 添加或升级文件
    handlePublish(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pulishLoading = true
          let form = new FormData()
          this.form.folderId = this.folderHistory[this.folderHistory.length - 1]
          for (let i in this.form) {
            form.append(i, this.form[i])
          }
          const isEdit = this.form.docControlId
          const http = isEdit ? docControlUpgrade : docControlSaveFile
          http(form).then(() => {
            this.$message.success(isEdit ? '升级成功！' : '新增文件成功！')
            this.getList()
            this.pulishLoading = false
            this.fileDialogVisible = false
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
    },
    showFileDetail(row) {
      if (!row.docControlId) {
        return this.$message.warning('参数错误')
      }
      this.fileDetailDialogVisible = true
      docControlDetail(row.docControlId).then(res => {
        this.fileDetail = res
      })
    }
  }
}
</script>

<style>
</style>
