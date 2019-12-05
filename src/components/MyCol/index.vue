<template>
  <el-col :span="12">
    <div class="label">{{ label }}：</div>
    <div class="value"><slot /></div>
  </el-col>
</template>

<script>
export default {
  name: 'MyCol',
  props: {
    span: {
      type: Number,
      default: 12
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
