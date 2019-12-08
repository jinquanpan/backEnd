<template>
  <div>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="fileName"
          label="文件名"
          width="300"
        >
          <template slot-scope="{row}">
            <FileNameContainer :row="row" @menu-click="handleFileChange(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="fileNo" label="文件编号" width="150" />
        <el-table-column prop="fileStatusText" label="文件状态" width="100" />
        <el-table-column prop="version" label="版本号" width="150" />
        <el-table-column prop="fileWriter" label="编制人" width="100" />
        <el-table-column label="操作" align="left" width="300">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleApproval(row)">审批</el-button>
            <el-button type="warning" size="mini" @click="handleDownload(row)">下载</el-button>
            <el-button size="mini" type="danger" @click="handleInvalidFile(row)">作废</el-button>
          </template>
        </el-table-column>
        <el-table-column />
      </el-table>
    </el-card>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <FileDetail ref="fileDetail" />
  </div>
</template>

<script>
import { workbenchListReviewing, workbenchReview, invalidFile } from '@/api/workbench-doc-control'
import FileDetail from '../components/FileDetail'
import FileNameContainer from '@/components/FileNameContainer'
export default {
  components: {
    FileDetail,
    FileNameContainer
  },
  data() {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    // 详情
    handleFileChange(row) {
      if (row.fileObjectId) {
        this.$refs.fileDetail.show(row.fileObjectId)
      }
    },
    // 审批
    handleApproval(row) {
      this.$myConfirm(row.fileName + ' 通过审批', (done) => {
        workbenchReview(row.fileObjectId).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 作废
    handleInvalidFile(row) {
      this.$delConfirm(row.fileName + '，且不可逆', (done) => {
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
