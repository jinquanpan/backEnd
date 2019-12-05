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
          width="200"
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
          prop="fileReviewer"
          label="审批人"
          width="150"
        />
        <el-table-column
          label="操作"
          style="text-align: left"
        >
          <template
            v-if="!row.folder"
            slot-scope="{row}"
          >
            <el-button
              type="primary"
              size="mini"
              @click="handleReview(row)"
            >批准</el-button>
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
import {
  workbenchListApproving,
  workbenchApprove,
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
      fileStates: [
        { label: '受控', value: 'CONTROL' },
        { label: '失效', value: 'INVALID' }
      ],
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
      workbenchListApproving(this.listQuery).then((res) => {
        this.list = res.list
        this.total = res.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 批准
    handleReview(row) {
      this.confirm('此文件通过批准', (done) => {
        workbenchApprove(row.fileObjectId).then(() => {
          done()
          this.getList()
        })
      })
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
    // 下载
    handleDownload(row) {
      window.location.href = row.fileUrl
    }
  }
}
</script>
