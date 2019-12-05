<template>
  <div>
    <my-row>
      <my-col label="创建日期">{{ data.createTime }}</my-col>
      <my-col label="受控文件id">{{ data.docControlId }}</my-col>
      <my-col label="批准人">{{ data.fileApprover }}</my-col>
      <my-col label="文件描述">{{ data.fileDesc }}</my-col>
      <my-col label="文件名">{{ data.fileName }}</my-col>
      <my-col label="文件编号">{{ data.fileNo }}</my-col>
      <my-col label="审批人">{{ data.fileReviewer }}</my-col>
      <my-col label="编制人">{{ data.fileWriter }}</my-col>
      <my-col label="创建日期">{{ data.createTime }}</my-col>
      <my-col label="修改日期">{{ data.updateTime }}</my-col>
      <my-col label="版本">{{ data.version }}</my-col>
      <my-col label="生效日期">{{ data.fileEffectiveDate }}</my-col>
    </my-row>
  </div>
</template>

<script type="es6">
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
