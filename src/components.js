import Vue from 'vue'
import Pagination from '@/components/Pagination'
import FileIcon from '@/components/FileIcon'
import store from '@/store/store'
import MyCol from '@/components/MyCol'
import MyRow from '@/components/MyRow'
import Pdf from '@/components/Pdf'

Vue.component(Pagination.name, Pagination)
Vue.component(FileIcon.name, FileIcon)
Vue.component(MyCol.name, MyCol)
Vue.component(MyRow.name, MyRow)
Vue.use(Pdf)

const vuepro = Vue.prototype
vuepro.$delConfirm = function(message, success) {
  return vuepro.$confirm(`此操作将删除 <span style="color: #F56C6C">${message}</span>，是否继续？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  }).then(() => {
    success((msg) => {
      vuepro.$message.success(msg || '删除成功！')
    })
  }).catch(() => {})
}

vuepro.$myConfirm = function(message, success) {
  return vuepro.$confirm(`此操作将 <span style="color: #F56C6C">${message}</span>，是否继续？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    dangerouslyUseHTMLString: true
  }).then(() => {
    success((msg) => {
      vuepro.$message.success(msg || '操作成功')
    })
  }).catch(() => {})
}

vuepro.$myPrompt = function({ title, message, inputValue, inputValidator, success }) {
  vuepro.$prompt(`请输入${message}：`, title || '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: inputValue,
    inputPlaceholder: `请输入${message}`,
    inputValidator: inputValidator
  }).then(({ value }) => {
    success(value)
  }).catch(() => {})
}

vuepro.$hasPermission = function(permi) {
  return store.getters.permission.includes(permi)
}

// 预览文件
vuepro.$readFile = function(fileUrl) {
  if (/(\.pdf)$/.test(fileUrl)) {
    this.$readPdf(fileUrl)
  } else {
    window.open('https://view.officeapps.live.com/op/view.aspx?src=' + fileUrl, '_blank')
  }
}
