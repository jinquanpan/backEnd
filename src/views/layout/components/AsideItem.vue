<template>
  <div>
    <template v-for="item in menus">
      <template v-if="item.subs">
        <el-submenu
                :key="item.index"
                :index="item.index"
        >
          <template slot="title">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-for="subItem in item.subs">
            <el-submenu
                    v-if="subItem.subs"
                    :key="subItem.index"
                    :index="subItem.index"
            >
              <template slot="title">
                <i :class="subItem.icon" />
                <span slot="title">{{ subItem.title }}</span>
              </template>
              <el-menu-item
                      v-for="(threeItem,i) in subItem.subs"
                      :key="i"
                      :index="threeItem.index"
              >{{ threeItem.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item
                    v-else
                    :key="subItem.index"
                    :index="subItem.index"
            >{{ subItem.title }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item
                v-if="item.index.indexOf('http')==-1"
                :key="item.index"
                :index="item.index"
        >
          <i :class="item.icon" />
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
        <a
                v-else
                :key="item.index"
                :href="item.index"
                target="_blank"
        >
          <el-menu-item>
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </a>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AsideItem',
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
</style>
