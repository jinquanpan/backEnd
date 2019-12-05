<template>
  <div v-show="visible" id="mypdf" class="pdf">
    <iframe :src="src" style="width:100%;height: 100%" />
    <i class="el-icon-close" @click="visible = false" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
      src: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .pdf{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    z-index: 100000;
    background: #999;
    .el-icon-close{
      position: fixed;left:20px;top:60px;font-size:30px;z-index:3;color:#fff;cursor: pointer;
    }
  }
</style>

