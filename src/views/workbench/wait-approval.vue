<template>
  <div>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
        @cell-dblclick="dbclick"
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
          prop="fileWriter"
          label="编制人"
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
              @click="handleApproval(row)"
            >审批</el-button>
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
  </div>
</template>

<script>
import { fileOptions } from '@//util/config'
import {
  workbenchListReviewing,
  workbenchReview,
  invalidFile
} from '@/api/workbench'

export default {
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      fileStates: fileOptions,
      pulishLoading: false,
      dialogVisible: false,
      controlForm: {
        fileName: '', // 文件名称
        fileWriter: '', // 编制人
        fileReviewer: '', // 审批人
        fileApprover: '', // 批准人
        fileDesc: '', // 文件说明
        folderId: '', // 所在文件夹id
        filePath: '', // 文件路径
        fileStatus: '' // 文件状态
      },
      fileList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleBack() {
    },
    dbclick(row, column) {
    },
    getList() {
      this.listLoading = true
      workbenchListReviewing(this.listQuery).then((res) => {
        this.list = res.list
        this.total = res.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 审批
    handleApproval(row) {
      this.confirm('此文件通过审批', (done) => {
        workbenchReview(row.fileObjectId).then(() => {
          done()
          this.getList()
        })
      })
    },
    showDialog() {
      this.dialogVisible = true
    },
    handlePublish() {
      this.pulishLoading = true
      setTimeout(() => {
        this.$message.success('success')
        this.pulishLoading = false
      }, 1000)
    },
    handleCancel() {
      this.dialogVisible = false
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
    // 下载
    handleDownload(row) {
      window.location.href = row.fileUrl
    }
  }
}
</script>
