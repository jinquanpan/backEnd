<template>
  <div>
    <div class="mb20">
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
      >
        <el-table-column
          label="文件编号"
          prop="fileNo"
        />
        <el-table-column
          label="文件名"
          prop="fileName"
        />
        <el-table-column
          label="版本号"
          prop="version"
        />
        <el-table-column
          label="发布时间"
          prop="createTime"
        />
        <el-table-column
          label="文件类型"
          prop="externalType"
        />
        <el-table-column
          label="操作"
          style="text-align: left"
          width="60"
        >
          <template slot-scope="{row}">
            <el-button
              type="warning"
              size="mini"
              @click.stop="handleDownload(row)"
            >下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  docExternalVersions
} from '@/api/doc-external'
export default {
  props: {
    id: {
      type: [Number, String],
      default: ''
    }
  },
  data() {
    return {
      list: [],
      listLoading: false
    }
  },
  watch: {
    id() {
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (!this.id) return
      this.listLoading = true
      console.log('fileNo', this.fileNo)
      docExternalVersions(this.id).then((res) => {
        this.list = res
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
