<template>
  <div class="pdf">
    <!--    <pdf src="../../..//static/report.pdf" />-->
    <el-button @click="visible = true">浏览pdf</el-button>
    <iframe v-if="visible" src="http://demo.zphtown.com/res/report.pdf" style="width:100%;height: 100vh;position: fixed;left:0;top:0;" />
    <i
v-if="visible"
class="el-icon-close"
style="position: fixed;left:20px;top:60px;font-size:30px;z-index:3;color:#fff;cursor: pointer;"
       @click="visible = false"
/>
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {}
}
</script>
