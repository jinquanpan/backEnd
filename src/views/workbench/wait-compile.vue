<template>
  <div>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
        @row-click="rowClick"
        @cell-mouse-enter="row => row.fileButtonVisible = true"
        @cell-mouse-leave="row => row.fileButtonVisible = false"
      >
        <el-table-column
          prop="fileName"
          label="文件名"
        >
          <template slot-scope="{row}">
            <div class="filename-container">
              <file-icon :name="row.fileName || row.folderName" />
              <div
                v-if="row.fileButtonVisible"
                class="button-group"
              >
                <i
                  class="el-icon-menu"
                  @click.stop="handleFileChange(row)"
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
          prop="fileStatusText"
          label="文件状态"
          width="100"
        />
        <el-table-column
          prop="fileStarter"
          label="发起人"
          width="100"
        />
        <el-table-column
          label="操作"
          align="left"
          width="300"
        >
          <template
            v-if="!row.folder"
            slot-scope="{row}"
          >
            <el-button
              type="primary"
              size="mini"
              @click="handleCompile(row)"
            >编制</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="handleDownload(row)"
            >下载</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleInvalidFile(row)"
            >作废</el-button>
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
    <el-dialog
      :visible.sync="fileChangeVisible"
      title="文件变更"
    >
      <h3 class="mb20">基础信息</h3>
      <el-form
        size="mini"
        :model="baseForm"
        label-width="130px"
      >
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item
              label="发起人"
              prop="name"
            >
              <el-input
                v-model="baseForm.name"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="发起所在部门"
              prop="name"
            >
              <el-input
                v-model="baseForm.name"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="流程名称"
              prop="name"
            >
              <el-input
                v-model="baseForm.name"
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3 class="mb20">流程信息</h3>
      <el-form
        :model="flowForm"
        label-width="130px"
        size="mini"
      >
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item
              label="原文件名称"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="原文件版本"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="原所属文件夹"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="原文件编号"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="原文件地址"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="变更说明"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                type="textarea"
                :rows="4"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="新文件名称"
              prop="fileName"
            >
              <el-input v-model="flowForm.fileName" />
            </el-form-item>
            <el-form-item
              label="原文件名称"
              prop="fileName"
            >
              <el-input v-model="flowForm.fileName" />
            </el-form-item>
            <el-form-item
              label="新文件所属文件夹"
              prop="fileName"
            >
              <el-input
                v-model="flowForm.fileName"
                disabled
              />
            </el-form-item>
            <el-form-item
              label="原文件名称"
              prop="fileName"
            >
              <el-input v-model="flowForm.fileName" />
            </el-form-item>
            <el-form-item
              label="文件地址"
              prop="fileName"
            >
              <UploadFile
                :loading="fileChangeLoading"
                :file-list="fileList"
                @change="uploadFileChange"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item align="center">
          <el-button
            type="primary"
            @click="fileChangeSubmit"
          >提交</el-button>
          <el-button @click="fileChangeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import {
  workbenchListWriting,
  workbenchWrite,
  workbenchDetail,
  invalidFile
} from '@/api/workbench'

export default {
  components: {
    UploadFile
  },
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      fileChangeVisible: false,
      fileChangeLoading: false,
      baseForm: {
        name: ''
      },
      flowForm: {
        fileName: ''
      },
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    rowClick(row, column) {
      if (row.folder) {
        this.list = row.children
      }
    },
    getList() {
      this.listLoading = true
      workbenchListWriting(this.listQuery).then((res) => {
        res.list.map(v => {
          v.fileButtonVisible = false
        })
        this.list = res.list
        this.total = res.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 显示变更文件弹框
    handleFileChange(row) {
      this.fileChangeVisible = true
      workbenchDetail(row.fileObjectId).then((res) => {
        console.log(res)
      })
    },
    // 上传文件
    uploadFileChange({ file, fileFormat }) {
      this.flowForm.fileFormat = fileFormat
      this.flowForm.file = file
    },
    fileChangeSubmit() {
      // this.fileChangeLoading = true
      this.$message.success('这是一个操作')
    },
    // 作废
    handleInvalidFile(row) {
      this.confirm('删除文件,且不可逆', (done) => {
        invalidFile(row.fileObjectId).then(() => {
          done()
          this.getList()
        })
      })
    },
    handleCompile(row) {
      this.confirm('此文件通过编制', (done) => {
        workbenchWrite(row.fileObjectId).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 下载
    handleDownload(row) {
      window.location.href = row.fileUrl
    }
  }

}
</script>
