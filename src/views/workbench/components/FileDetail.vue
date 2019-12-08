<template>
  <el-dialog
          :visible.sync="visible"
          title="文件详情"
  >
    <my-row>
      <my-col label="创建时间">{{ detail.createTime }}</my-col>
      <my-col label="批准人">{{ detail.fileApprover }}</my-col>
      <my-col label="文件描述">{{ detail.fileDesc }}</my-col>
      <my-col label="文件名">{{ detail.fileName }}</my-col>
      <my-col label="文件编号">{{ detail.fileNo }}</my-col>
      <my-col label="文件id">{{ detail.fileObjectId }}</my-col>
      <my-col label="审批人">{{ detail.fileReviewer }}</my-col>
      <my-col label="编制人">{{ detail.fileWriter }}</my-col>
      <my-col label="更新时间">{{ detail.updateTime }}</my-col>
    </my-row>
  </el-dialog>
</template>

<script>
import { workbenchDetail } from '@/api/workbench-doc-control'
export default {
  name: 'FileForm',
  components: {},
  props: {
    folderHistory: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      detail: {},
      visible: false
    }
  },
  methods: {
    // 显示新建文件弹框
    show(fileObjectId) {
      this.visible = true
      workbenchDetail({ fileObjectId }).then(res => {
        this.detail = res
      }).catch(_ => {})
    }
  }
}
</script>

<style scoped>
</style>
