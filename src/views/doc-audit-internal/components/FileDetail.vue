<template>
  <el-dialog
          title="文件详情"
          :visible.sync="visible"
  >
    <my-row v-loading="loading">
      <my-col label="文件编号">{{ data.fileNo }}</my-col>
      <my-col label="文件名">{{ data.fileName }}</my-col>
      <my-col label="编制人">{{ data.fileWriter }}</my-col>
      <my-col label="审批人">{{ data.fileReviewer }}</my-col>
      <my-col label="批准人">{{ data.fileApprover }}</my-col>
      <my-col label="文件描述">{{ data.fileDesc }}</my-col>
      <my-col label="创建日期">{{ data.createTime }}</my-col>
      <my-col label="修改日期">{{ data.updateTime }}</my-col>
    </my-row>
  </el-dialog>
</template>

<script type="es6">
import { docAuditInternalDetail } from '@/api/doc-audit-internal'
export default {
  data() {
    return {
      loading: true,
      visible: false,
      data: {}
    }
  },
  methods: {
    show(id) {
      this.visible = true
      this.loading = true
      docAuditInternalDetail(id).then(res => {
        this.data = res
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
