<template>
  <el-upload
          action="/admin"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-change="changeFile"
          :on-exceed="handleExceed"
          :accept="accept"
  >
    <el-button :loading="loading" size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传word, excel, ppt, pdf文件，且不超过500Mb</div>
  </el-upload>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    allowExt: {
      type: Array,
      default: () => ['doc', 'docx', 'xls', 'xlsx', 'ptt', 'pptx', 'pdf']
    }
  },
  computed: {
    accept() {
      return this.allowExt.map(item => `.${item}`).join(', ')
    }
  },
  methods: {
    beforeUpload(file) {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      const isAllow = this.allowExt.includes(ext.toLowerCase())
      if (!isAllow) {
        this.$message.error('只能上传word，excel，ppt, pdf文件')
      }
      return isAllow
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    changeFile(file) {
      const fileFormat = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()
      const raw = file.raw
      this.$emit('update:file', raw)
      this.$emit('update:fileFormat', fileFormat)
      this.$emit('change', {
        file: raw,
        fileFormat: fileFormat
      })
    }
  }
}
</script>
