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
          label="不符合项编号"
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
          label="文件名称"
        />
        <el-table-column
          prop="fileStatusText"
          label="不符合项来源"
/>
        <el-table-column
          prop="fileWriter"
          label="严重性"
/>
        <el-table-column
          prop="fileControlTime"
          label="发现人员"
>
          <template slot-scope="{row}">
            {{ row.fileControlTime | parseTime }}
          </template>
        </el-table-column>
        <el-table-column
          label="发现时间"
          align="left"
        />
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="1000" style="margin-top: 100px" />

    </el-card>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
/>
  </div>
</template>

<script>
import { fileOptions } from '@//util/config'
import {
  // workbenchListReviewing,
  workbenchReview,
  invalidFile
} from '@/api/workbench'

export default {
  data() {
    return {
      listLoading: false,
      list: [
        {
          date: '2016-05-02',
          name: '0.目录.doc',
          transitionDate: '2016/05/02~2016/06/06',
          vserion: 'V0.0.1',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
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

  },
  methods: {
    handleBack() {
    },
    dbclick(row, column) {
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
