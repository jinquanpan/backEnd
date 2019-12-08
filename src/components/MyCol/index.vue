<template>
  <el-col class="my-col" :span="12">
    <div class="label" :style="{width: myLabelWidth + 'px'}">{{ label }}：</div>
    <div class="value"><slot /></div>
  </el-col>
</template>

<script>
export default {
  name: 'MyCol',
  inject: ['myRow'],
  props: {
    span: {
      type: Number,
      default: 12
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      myLabelWidth: ''
    }
  },
  created() {
    let width = this.labelWidth || this.myRow.labelWidth
    if (/px/.test(width)) {
      width = parseInt(width.toString().replace('px', ''))
    }
    this.myLabelWidth = width
  }
}
</script>

<style scoped>
  .my-col{
    display: flex;
  }
  .value{
    flex:1;
  }
</style>
