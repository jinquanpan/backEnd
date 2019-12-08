<template>
  <el-dialog
          :visible.sync="fileDialogVisible"
          :title="form.docControlId ? '升级' : '发起'"
  >
    <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            size="small"
    >
      <el-form-item
              v-if="!form.docControlId"
              label="文件编号:"
              prop="fileNo"
      >
        <el-input v-model="form.fileNo" />
      </el-form-item>
      <el-form-item
              label="文件名称:"
              prop="fileName"
      >
        <el-input v-model="form.fileName" />
      </el-form-item>
      <el-form-item
              label="编制人:"
              prop="fileWriter"
      >
        <el-input v-model="form.fileWriter" />
      </el-form-item>
      <el-form-item
              label="审批人:"
              prop="fileReviewer"
      >
        <el-input v-model="form.fileReviewer" />
      </el-form-item>
      <el-form-item
              label="批准人:"
              prop="fileApprover"
      >
        <el-input v-model="form.fileApprover" />
      </el-form-item>
      <el-form-item
              label="文件说明:"
              prop="fileDesc"
      >
        <el-input v-model="form.fileDesc" />
      </el-form-item>
      <el-form-item
              label="生效日期:"
              prop="fileEffectiveDate"
      >
        <el-date-picker
                v-model="form.fileEffectiveDate"
                value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item
              label="文件状态:"
              prop="fileStatus"
      >
        <el-select v-model="form.fileStatus">
          <el-option
                  v-for="item in fileOptions"
                  :key="item.label"
                  :value="item.value"
                  :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item
              label="文件:"
              prop="file"
      >
        <UploadFile
                :loading="pulishLoading"
                :file-list="fileList"
                :file.sync="form.file"
                :file-format.sync="form.fileFormat"
        />
      </el-form-item>
      <el-form-item>
        <el-button
                type="primary"
                :loading="pulishLoading"
                @click="handlePublish"
        >提交</el-button>
        <el-button
                :loading="pulishLoading"
                @click="fileDialogVisible = false"
        >取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import { doControlFileOptions } from '@/util/config'
import { docAuditManageSaveFile, docAuditManageDetail, docAuditManageUpgrade } from '@/api/doc-audit-manage'
export default {
  name: 'FileForm',
  components: {
    UploadFile
  },
  props: {
    folderHistory: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        fileName: '',
        fileWriter: '',
        fileReviewer: '',
        fileApprover: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: '',
        fileEffectiveDate: ''
      },
      rules: {
        fileNo: [{ required: true, message: '请输入文件编号' }], // 文件编号
        fileName: [{ required: true, message: '请输入文件名称' }], // 文件名称
        fileWriter: [{ required: true, message: '请输入编制人' }], // 编制人
        fileReviewer: [{ required: true, message: '请输入审批人' }], // 审批人
        fileApprover: [{ required: true, message: '请输入批准人' }], // 批准人
        fileDesc: [{ required: true, message: '请输入文件说明' }], // 文件说明
        folderId: [{ required: true, message: '请输入所在文件夹id' }], // 所在文件夹id
        fileEffectiveDate: [{ required: true, message: '请选择生效日期', trigger: 'change' }], // 生效日期
        fileStatus: [{ required: true, message: '请选择文件状态', trigger: 'change' }], // 文件状态
        file: [{ required: true, message: '请选择上传文件', trigger: 'change' }]
      },
      pulishLoading: false,
      fileList: [],
      fileDialogVisible: false,
      fileOptions: doControlFileOptions
    }
  },
  methods: {
    // 显示新建文件弹框
    show(row) {
      this.fileDialogVisible = true
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []

      if (row) {
        docAuditManageDetail(row.docControlId).then(res => {
          this.form = {
            fileName: res.fileName,
            fileWriter: res.fileWriter,
            fileReviewer: res.fileReviewer,
            fileApprover: res.fileApprover,
            fileDesc: res.fileDesc,
            folderId: res.folderId,
            fileStatus: res.fileStatus,
            file: null,
            fileFormat: res.fileFormat,
            fileNo: res.fileNo,
            fileEffectiveDate: res.fileEffectiveDate,
            docControlId: res.docControlId
          }
        })
      } else {
        this.form = {
          fileName: '',
          fileWriter: '',
          fileReviewer: '',
          fileApprover: '',
          fileDesc: '',
          folderId: '',
          fileStatus: '',
          file: null,
          fileFormat: '',
          fileNo: '',
          fileEffectiveDate: ''
        }
      }
    },
    // 添加或升级文件
    handlePublish(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pulishLoading = true
          let form = new FormData()
          this.form.folderId = this.folderHistory[this.folderHistory.length - 1]
          for (let i in this.form) {
            form.append(i, this.form[i])
          }
          const isEdit = this.form.docControlId
          const http = isEdit ? docAuditManageUpgrade : docAuditManageSaveFile
          http(form).then(() => {
            this.$message.success(isEdit ? '升级成功！' : '新增文件成功！')
            this.pulishLoading = false
            this.fileDialogVisible = false
            this.$emit('ok')
          }).catch(() => {
            this.pulishLoading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
