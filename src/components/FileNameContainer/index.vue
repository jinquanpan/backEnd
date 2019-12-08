  <template>
  <div v-if="row.fileName || row.folderName" class="filename-container">
    <file-icon :name="row.fileName || row.folderName" :is-file="isFile" @click="readFile(row)" />
    <div class="right">
      <i v-if="isFile" class="el-icon-menu" @click="menuClick(row)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileNameContainer',
  props: {
    row: {
      type: Object,
      default: () => {
        return {
          fileName: '',
          isFile: ''
        }
      }
    }
  },
  computed: {
    isFile() {
      return this.row.isFile || this.row.isFile === undefined
    }
  },
  methods: {
    readFile(row) {
      if (row.fileUrl) {
        this.$readFile(row.fileUrl)
      } else {
        this.$emit('folder-click', row)
      }
    },
    menuClick(row) {
      this.$emit('menu-click', row)
    }
  }
}
</script>
