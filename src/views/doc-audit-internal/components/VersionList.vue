<template>
  <el-dialog
          :visible.sync="fileVersionVisible"
          title="版本列表"
          width="1200px"
  >
    <div class="mb20">
      <el-table
              v-loading="listLoading"
              :data="list"
              stripe
      >
        <el-table-column
                label="文件编号"
                prop="fileNo"
        />
        <el-table-column
                label="文件名"
                prop="fileName"
        />
        <el-table-column
                label="编制人"
                prop="fileWriter"
        />
        <el-table-column
                label="审批人"
                prop="fileReviewer"
        />
        <el-table-column
                label="批准人"
                prop="fileApprover"
        />
        <el-table-column
                label="版本号"
                prop="version"
        />
        <el-table-column
                label="发布时间"
                prop="filePublishTime"
        />
        <el-table-column
                label="作废时间"
                prop="fileInvalidTime"
        />
        <el-table-column
                label="操作"
                style="text-align: left"
                width="60"
        >
          <template slot-scope="{row}">
            <el-button
                    type="warning"
                    size="mini"
                    @click.stop="handleDownload(row)"
            >下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import { docControlListFileVersion } from '@/api/doc-control'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      fileVersionVisible: false
    }
  },
  methods: {
    show(fileNo) {
      this.listLoading = true
      docControlListFileVersion(fileNo).then((res) => {
        this.list = res
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
