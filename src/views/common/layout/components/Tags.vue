<template>
  <!-- 打开标签的容器 -->
  <div class="tags">
    <scroll-pane wrap-class="scrollbar-wrapper">
      <ul class="tagslist">
        <li
          v-for="(item,index) in tagsList"
          :key="index"
          class="tags-li"
          :class="{'active': item.path === $route.fullPath}"
          @click.prevent.right="contextMenu(item, $event)"
        >
          <router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
          <span class="tags-li-icon" @click="closeTag(item)">
            <i class="el-icon-close" />
          </span>
        </li>
      </ul>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>
<script>
import ScrollPane from './ScrollPane'
import { mapGetters } from 'vuex'
export default {
  components: {
    ScrollPane
  },
  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {}
    }
  },
  computed: {
    ...mapGetters(['tagsList'])
  },
  watch: {
    // 监听路由变化
    $route(newValue, oldValue) {
      this.addTags(newValue)
    }
  },
  created() {
    this.addTags(this.$route)
  },
  methods: {
    // 添加标签
    addTags(route) {
      if (route.meta && route.meta.hidden) return
      if (this.tagsList.some(item => item.path === route.fullPath)) return
      this.saveTagsList([...this.tagsList, {
        title: route.meta.title,
        path: route.fullPath,
        name: route.name
      }])
    },
    closeTag({ path }) {
      const len = this.tagsList.length
      if (len === 1) {
        return this.$message.warning('不可全都关闭')
      }
      this.saveTagsList(this.tagsList.filter(item => item.path !== path))
      // 如果关闭的是当前页面，则跳到列表最后一个
      if (path === this.$route.fullPath) {
        this.$router.push(this.tagsList[len - 2]['path'])
      }
      if (this.visible) {
        this.visible = false
      }
    },
    saveTagsList(list) {
      this.$store.commit('app/TAGES_LIST', list)
    },
    contextMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    refreshSelectedTag(tag) {
      this.$router.replace({ path: '/redirect' + tag.path })
      this.visible = false
    },
    closeOthersTags({ path }) {
      if (!path) return
      this.saveTagsList(this.tagsList.filter(item => item.path === path))
      this.visible = false
    },
    closeAllTags() {
      this.saveTagsList(this.tagsList.filter((item, index) => index === 0))
      this.visible = false
      this.$nextTick(() => {
        this.$router.replace(this.tagsList[0].path)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/vars.scss';
.tags {
  height: 30px;
  background: $base-white;
  box-shadow: 0 5px 10px #ddd;
  z-index: 10;
}

.tags .tagslist {
  box-sizing: border-box;
  width: 1000%;
  height: 100%;
}

.tags-li {
  float: left;
  margin: 3px 5px 2px 3px;
  border-radius: 3px;
  font-size: 12px;
  overflow: hidden;
  cursor: pointer;
  height: 23px;
  line-height: 23px;
  border: 1px solid #e9eaec;
  background: $base-white;
  padding: 0 5px 0 12px;
  vertical-align: middle;
  color: $base-666;
  /*-webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;*/
}

.tags-li:not(.active):hover {
  background: $base-f8;
}

.tags-li.active {
  color: $base-white;
  border: 1px solid $base-color;
  background-color: $base-color;
}

.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: $base-666;
}

.tags-li.active .tags-li-title {
  color: $base-white;
}

.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  // width: 110px;
  height: 30px;
  background: $base-white;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.contextmenu {
  width:80px;
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>

