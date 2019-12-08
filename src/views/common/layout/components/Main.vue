<template>
    <div class="container">
      <tags />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <div class="contents">
          <transition name="fade-transform" mode="out-in">
              <router-view />
          </transition>
        </div>
       </el-scrollbar>
    </div>
</template>
<script>
import Tags from './Tags.vue'
export default {
  components: {
    Tags
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px);
  overflow: hidden;
  width: 100%;
  .contents{
    padding: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
}
</style>
