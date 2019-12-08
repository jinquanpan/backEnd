<template>
  <el-row>
    <el-card class="mb20 no-padding-bottom">
      <el-form
        ref="searchForm"
        inline
        :model="listQuery"
      >
        <el-form-item prop="fileName">
          <el-input v-model="listQuery.fileName" placeholder="输入文件名" clearable />
        </el-form-item>
        <el-form-item prop="fileName">
          <el-input v-model="listQuery.fileNo" placeholder="输入文件编号" clearable />
        </el-form-item>
        <el-form-item prop="fileStatus">
          <el-select v-model="listQuery.fileStatus" placeholder="文件状态" clearable>
            <el-option
              v-for="item in fileOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="filePublishStartTime">
          <el-date-picker v-model="listQuery.filePublishStartTime" placeholder="请选择起始日期" clearable />
        </el-form-item>
        <el-form-item prop="filePublishEndTime">
          <el-date-picker v-model="listQuery.filePublishEndTime" placeholder="请选择结束日期" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="$_handleFilter()">搜索</el-button>
          <el-button icon="el-icon-delete" @click="$_handleFilter('reset')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-bottom:20px;">
      <el-button
        :disabled="folderHistory.length === 1"
        icon="el-icon-caret-left"
        size="mini"
        type="primary"
        @click="$_handleBack"
      >返回上级文件夹</el-button>
      <el-button
        v-if="$hasPermission('doc-control:file-list:create')"
        size="mini"
        type="primary"
        @click="handleAddFolder"
      >新建文件夹 <i class="el-icon-circle-plus-outline el-icon--right" /></el-button>
      <el-button
        v-if="$hasPermission('doc-control:file-list:publish')"
        size="mini"
        type="primary"
        @click="handleAddFile()"
      >发起 <i class="el-icon-upload el-icon--right" /></el-button>
    </el-card>

    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="folderName" label="文件名" width="300">
          <template slot-scope="{row}">
            <FileNameContainer :row="row" @folder-click="$_inserFolder(row)" @menu-click="showFileDetail(row)" />
          </template>
        </el-table-column>
        <el-table-column prop="fileNo" label="文件编号" width="150" />
        <el-table-column prop="fileWriter" label="编制人" width="100" />
        <el-table-column prop="fileReviewer" label="审批人" width="100" />
        <el-table-column prop="fileApprover" label="批准人" width="100" />
        <el-table-column prop="version" label="版本" width="150" />
        <el-table-column
          prop="fileStatusText"
          label="状态"
          width="80"
          />
        <el-table-column
          prop="filePublishTime"
          label="发布日期"
          width="150"
          />
        <el-table-column label="操作" width="420">
          <template slot-scope="{row}">
            <el-button
              v-if="!row.isFile"
              type="primary"
              size="mini"
              @click.stop="handleAddFolder($event, row)"
            >重命名</el-button>
            <el-button
              v-if="!row.isFile && $hasPermission('doc-control:file-list:delete')"
              type="danger"
              size="mini"
              @click.stop="handleDelFolder(row)"
            >删除</el-button>
            <template v-else>
              <el-button
                v-if="row.fileStatus == 'CONTROLLED'"
                type="warning"
                size="mini"
                @click.stop="handleAddFile(row)"
              >升级</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:version')"
                type="success"
                size="mini"
                @click.stop="getVersions(row)"
              >版本</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:download')"
                type="warning"
                size="mini"
                @click.stop="handleDownload(row)"
              >下载</el-button>
              <el-button
                v-if="$hasPermission('doc-control:file-list:delete')"
                size="mini"
                type="danger"
                @click.stop="handleDelFile(row)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column />
      </el-table>

      <div
        v-if="folderHistory.length === 1"
        style="margin-top: 20px;font-size:14px;"
      >
        <span style="margin-right:30px">文件个数：{{ fileCount }}</span>
        <span>文件夹个数：{{ list.length - fileCount }}</span>
      </div>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>

    <FileForm ref="fileForm" :folder-history="folderHistory" @ok="getList()" />
    <VersionList ref="versionList" />
    <FileDetail ref="fileDetail" />
  </el-row>
</template>

<script>
import VersionList from './components/VersionList'
import FileDetail from './components/FileDetail'
import FileForm from './components/FileForm'
import FileNameContainer from '@/components/FileNameContainer'
import {
  docControlList,
  docControlsaveFolder,
  docControlrenameFolder,
  docControlDeleteFolder,
  docControlDelFile
} from '@/api/doc-control'
import { doControlFileOptions, defaultFolderId } from '@/util/config'
import { filterQuery } from '@/util'
import folderMix from '@/util/mixins/folderMix'

export default {
  components: {
    VersionList,
    FileDetail,
    FileForm,
    FileNameContainer
  },
  mixins: [folderMix],
  data() {
    return {
      total: 0,
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        folderId: '', // 所在文件夹id
        fileName: '',
        fileNo: '',
        fileStatus: '',
        filePublishStartTime: '',
        filePublishEndTime: ''
      },
      fileOptions: doControlFileOptions
    }
  },
  computed: {
    fileCount() {
      return this.list.filter(item => item.isFile).length
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      let form = filterQuery(this.listQuery)
      if (!form.folderId) {
        form.folderId = defaultFolderId
      }
      docControlList(form).then((res) => {
        this.listLoading = false
        this.list = res.list
        this.total = res.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleAddFolder(e, row) {
      this.$myPrompt({
        title: `${row ? '编辑' : '新增'}文件夹`,
        message: '文件夹名称',
        inputValue: row ? row.folderName : '',
        inputValidator: (value) => {
          if (value) return true
          return '请输入文件夹名称'
        },
        success: (value) => {
          if (!value) return
          let form = {
            folderName: value,
            folderId: this.folderHistory[this.folderHistory.length - 1]
          }
          let http = null
          if (row) {
            form.currentfolderId = row.folderId
            http = docControlrenameFolder
          } else {
            http = docControlsaveFolder
          }
          http(form).then(() => {
            this.getList()
            this.$message.success(`${row ? '编辑' : '新增'}成功！`)
          })
        }
      })
    },
    // 删除文件
    handleDelFile(row) {
      this.$delConfirm(row.fileName, (done) => {
        docControlDelFile({ docControlId: row.docControlId }).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 删除文件夹
    handleDelFolder(row) {
      this.$delConfirm(row.folderName, (done) => {
        docControlDeleteFolder({ folderId: row.folderId }).then(() => {
          done()
          this.getList()
        })
      })
    },
    // 显示新建文件弹框
    handleAddFile(row) {
      if (typeof row !== 'undefined' && !row.docControlId) {
        return this.$message.warning('参数错误')
      }
      this.$refs.fileForm.show(row)
    },
    showFileDetail(row) {
      if (!row.docControlId) {
        return this.$message.warning('参数错误')
      }
      this.$refs.fileDetail.show(row.docControlId)
    },
    // 获取版本列表
    getVersions(row) {
      if (!row.fileNo) {
        return this.$message.warning('参数错误')
      }
      this.$refs.versionList.show(row.fileNo)
    },
    // 下载
    handleDownload(row) {
      window.location.href = row.fileUrl
    }
  }
}
</script>

<style>
</style>
