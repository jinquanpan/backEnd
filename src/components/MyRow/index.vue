<template>
  <el-row :gutter="30" class="custom-detail"><slot /></el-row>
</template>

<script>
export default {
  name: 'MyRow',
  props: {
    gutter: {
      type: Number,
      default: 30
    }
  }
}
</script>
