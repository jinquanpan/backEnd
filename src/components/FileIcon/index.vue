<template>
  <span class="file-icon-component" @click="$emit('click')">
    <i :class="['iconfont', 'file-icon', extIcon]" />
    <span>{{ name }}</span>
  </span>
</template>
<script>
export default {
  name: 'FileIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    folder: {
      type: [String, Boolean, Number],
      default: ''
    }
  },
  computed: {
    extIcon() {
      const lastIndex = this.name.lastIndexOf('.')
      if (this.folder || lastIndex === -1) {
        return 'icon-folder2'
      }
      const ext = this.name.substr(lastIndex + 1)
      var extArr = [
        { label: 'doc,docx', icon: 'icon-word' },
        { label: 'xls,xlsx', icon: 'icon-excel' },
        { label: 'ppt', icon: 'icon-ppt' },
        { label: 'pdf', icon: 'icon-pdf' }
      ]
      var result = ''
      extArr.map(item => {
        if (item.label.indexOf(ext) > -1) {
          result = item.icon
        }
      })
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/vars';
  .file-icon-component{
    cursor: pointer;
  }
  .iconfont{
    font-size:16px;
    vertical-align: middle;
    margin-right: 6px;
  }
  .icon-excel{
    color: #34A853;
    font-size:22px;
  }
  .icon-word{
    color: $primary-color;
    font-size:20px;
  }
  .icon-ppt{
    color: orange;
  }
  .icon-pdf{
    color: #f20000;
  }
  .icon-folder2{
    color: orange;
    font-size:20px;
  }
</style>
