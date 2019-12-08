<template>
    <el-table
        v-loading="listLoading"
        :data="dat"
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
          label="受控文件id"
          prop="fileId"
        />
        <el-table-column
          label="发起人"
          prop="fileStarter"
        />
        <el-table-column
          label="创建日期"
          prop="createTime"
        />
        <el-table-column
          label="修改日期"
          prop="updateTime"
        />
        <el-table-column
          label="版本"
          prop="version"
        />
        <el-table-column
          label="生效日期"
          prop="effectiveDate"
        />
        <el-table-column
          label="备注信息"
          prop="remark"
        />
      </el-table>

</template>

<script type="es6">
import { listDetails } from '@/api/doc-external'
export default {
  props: ['dat'],
  data() {
    return {
      // loading: false,
      visible: false,
      data: {}
    }
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
