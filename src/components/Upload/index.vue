<template>
  <el-upload
          action="/admin"
          :auto-upload="false"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-change="changeFile"
          :on-exceed="handleExceed"
          accept=".doc, .docx, .cls, .clsx, .pdf"
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
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    beforeUpload(file) {
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1)
      const isXls = /(xls)|(xlsx)|(doc)|(docx)|(pdf)|(ppt)/.test(ext)
      if (!isXls) {
        this.$message.error('只能上传word，excel，ppt,pdf文件')
      }
      return isXls
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    changeFile(file) {
      // this.form.fileFormat = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase()
      // this.form.file = file.raw
      this.$emit('filechange', file)
    }
  }
}
</script>
