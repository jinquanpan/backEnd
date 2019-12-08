import { defaultFolderId } from '@/util/config'
export default {
  data() {
    return {
      folderHistory: [defaultFolderId]
    }
  },
  methods: {
    $_handleBack() {
      this.folderHistory.pop()
      this.listQuery.folderId = this.folderHistory[this.folderHistory.length - 1] || ''
      this.getList()
    },
    $_inserFolder(row) {
      if (row.folderId) {
        this.listQuery.folderId = row.folderId
        this.folderHistory.push(row.folderId)
        this.getList()
      }
    },
    $_handleFilter(state) {
      if (state === 'reset') {
        this.$refs.searchForm.resetFields()
      }
      this.listQuery.page = 1
      this.getList()
    }
  }
}
