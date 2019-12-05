<template>
  <div>
    <div class="icon-list">
      <div v-for="item in icons" :key="item" v-clipboard:copy="item" v-clipboard:success="success" class="icon-item">
        <i class="iconfont" :class="item" />
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import icons from './icons'
export default {
  data() {
    return {
      icons: icons
    }
  },
  methods: {
    success() {
      this.$message.success('复制成功！')
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-list{
    display: flex;
    flex-flow:row wrap;
    .icon-item{
      padding:30px;
      text-align: center;
      cursor: pointer;
      .iconfont{
        font-size:50px;
      }
      p{
        font-size: 20px;
        margin-top: 10px;
      }
    }
  }
</style>
