<template>
  <el-row :gutter="30" class="custom-detail"><slot /></el-row>
</template>

<script>
const defaultLabelWidth = 90
export default {
  name: 'MyRow',
  provide() {
    return {
      myRow: this
    }
  },
  props: {
    gutter: {
      type: Number,
      default: 30
    },
    labelWidth: {
      type: [Number, String],
      default: defaultLabelWidth
    }
  }
}
</script>
