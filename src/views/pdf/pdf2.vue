<template>
  <div class="pdf">
    <el-button @click="showPdf">浏览pdf</el-button>
    <div v-show="visible" id="pdf" />
    <i v-if="visible" class="el-icon-close" @click="visible = false" />
  </div>
</template>

<script>
import pdf from 'pdfobject'
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showPdf() {
      this.visible = true
      var options = {
        pdfOpenParams: {
          pagemode: 'thumbs',
          navpanes: 0,
          toolbar: true,
          statusbar: 0,
          view: 'FitV'
        }
      }
      pdf.embed('http://demo.zphtown.com/res/report.pdf', '#pdf', options)
    }
  }
}
</script>

<style scoped>
  #pdf{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #999;
  }
  .el-icon-close{
    position: fixed;
    left:20px;
    top:60px;
    font-size:30px;
    z-index:3;
    color:#fff;
    cursor: pointer;
  }
</style>
