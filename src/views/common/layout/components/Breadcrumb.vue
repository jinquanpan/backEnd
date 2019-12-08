<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <transition-group name="fade-transform" mode="out-in">
        <template v-for="(item,index) in breadList">
          <el-breadcrumb-item
            :key="index"
            :to="item.redirect || item.path"
          >{{ item.title }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb('update')
    }
  },
  created() {
    this.getBreadcrumb('created')
  },
  methods: {
    // 获取面包屑
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      this.breadList = matched.map(v => {
        return {
          title: v.meta.title,
          path: v.path,
          redirect: v.redirect
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  float: left;
  margin-left: 10px;
}
.el-breadcrumb {
  line-height: 44px;
}
</style>
