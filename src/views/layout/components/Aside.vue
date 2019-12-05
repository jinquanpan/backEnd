<template>
  <div class="aside">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="true"
        :default-active="onRoutes"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        active-text-color="#bdb7ff"
        router
        @select="select"
      >
        <AsideItem :menus="menus" />
        <!--<template v-for="item in menus">
          <template v-if="item.subs">
            <el-submenu
                    :index="item.index"
                    :key="item.index"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu
                        v-if="subItem.subs"
                        :index="subItem.index"
                        :key="subItem.index"
                >
                  <template slot="title">
                    <i :class="subItem.icon"></i>
                    <span slot="title">{{subItem.title }}</span>
                  </template>
                  <el-menu-item
                          v-for="(threeItem,i) in subItem.subs"
                          :key="i"
                          :index="threeItem.index"
                  >{{threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item
                        v-else
                        :index="subItem.index"
                        :key="subItem.index"
                >{{subItem.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
                    :index="item.index"
                    :key="item.index"
                    v-if="item.index.indexOf('http')==-1"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.title }}</span>
            </el-menu-item>
            <a
                    :href="item.index"
                    target="_blank"
                    v-else
                    :key="item.index"
            >
              <el-menu-item>
                <i :class="item.icon"></i>
                <span slot="title">{{item.title }}</span>
              </el-menu-item>
            </a>
          </template>
        </template>-->
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import AsideItem from './AsideItem'
import { mapState } from 'vuex'
export default {
  components: {
    AsideItem
  },
  computed: {
    onRoutes() {
      return this.$route.path
    },
    ...mapState(['isCollapse']),
    menus() {
      return this.$store.getters.menu
    }
  },
  created() {
    // console.log('this.$store.getters.menu value')
    // console.log(JSON.stringify(this.$store.getters.menu))
  },
  methods: {
    select(index, indexPath) {
      if (indexPath.indexOf('home') > -1) return
      if (index !== null) {
        let breadList = ['home']
        breadList.push(...indexPath)
        this.$store.commit('app/SET_BREAD', breadList)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.aside {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    height: 100%;
    text-align: left;
  }
  .el-menu--collapse {
    height: 100%;
  }
}
</style>
