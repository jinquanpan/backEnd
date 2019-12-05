<template>
  <el-tabs type="border-card">
    <el-tab-pane label="iconfont">
      <Iconfont />
    </el-tab-pane>
    <el-tab-pane label="elementIcom">
      <ElementIcon />
    </el-tab-pane>
    <el-tab-pane label="pdf">
      <iframe :src="src" frameborder="0" style="width: 100%; height: 100%;position:fixed;left:0;top:0" />
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import ElementIcon from './elementIcom'
import Iconfont from './iconfont'
export default {
  components: {
    ElementIcon,
    Iconfont
  },
  data() {
    return {
      src: 'http://demo.zphtown.com/res/report.pdf'
    }
  }
}
</script>
