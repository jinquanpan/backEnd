<template>
  <el-row>
    <el-card
      id="search-box"
      style="margin: 50px 0 20px 0;"
    >
      <el-input
        v-model="listQuery.fileName"
        placeholder="请输入文件名"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-input
        v-model="listQuery.docExternalId"
        placeholder="请输入版本号"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-input
        v-model="listQuery.filePath"
        placeholder="请输入编号"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-select
        v-model="listQuery.externalType"
        placeholder="文件状态"
        style="width: 10%; margin: 0 5px 0 5px"
      >
        <el-option
          v-for="item in fileStates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        v-model="listQuery.effectiveStartDate"
        align="right"
        type="date"
        placeholder="生效日期"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-date-picker
        v-model="listQuery.effectiveEndDate"
        align="right"
        type="date"
        placeholder="结束日期"
        style="width: 10%; margin: 0 5px 0 5px"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter()"
      >搜索</el-button>
      <el-button
        icon="el-icon-delete"
        @click="handleFilter('reset')"
      >重置</el-button>
    </el-card>
    <el-card style="margin-bottom:20px;">
      <el-button
        size="mini"
        type="primary"
        @click="Superior()"
      >
        <i class="el-icon-caret-left el-icon--right" />返回上级文件夹
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="createFile()"
      >
        新建文件夹
        <i class="el-icon-circle-plus-outline el-icon--right" />
      </el-button>
      <el-button
        size="mini"
        type="primary"
        @click="handleAddFile()"
      >
        发起
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >

        <el-table-column
          prop="fileName"
          label="文件名"
          width="200px"
        >
            <!-- <file-icon :name="fileName" /> -->
            <template slot-scope="{row}">
              <div class="filename-container">
               <file-icon :name="row.docName" @click="folderInto(row)" />
              <div class="right">
                 <i
                 v-if="row.isFile"
                  class="el-icon-menu"
                  @click="fileDetails(row)"
                />
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fileNo"
          label="文件编号"
          width="170px"
        />
        <el-table-column
          prop="version"
          label="版本"
          width="170px"
        />
        <el-table-column
          prop="externalType"
          label="文件类型"
          width="170px"
        />
        <el-table-column
          prop="effectiveDate"
          label="生效日期"
          width="170px"
        />

        <el-table-column
          label="操作"
          width="400"
          style=""
          align="center"
        >
          <template slot-scope="scope" style="display:flex">
            <el-button
              v-if="scope.row.isFile"
              type="warning"
              size="mini"
              @click="handleUpgrade(scope.$index, scope.row)"
            >升级</el-button>
            <el-button
              v-if="scope.row.isFile"
              type="success"
              size="mini"
              @click.stop="getVersions(scope.$index, scope.row)"
            >版本</el-button>
            <el-button
              v-if="scope.row.isFile"
              type="danger"
              size="mini"
              @click="handleDownload(scope.$index, scope.row)"
            >下载</el-button>
            <el-button
              v-if="scope.row.isFile"
              type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >生效</el-button>
            <el-button
              v-if="scope.row.isFile"
              type="primary"
              size="mini"
              @click="handDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top: 100px"
        current-change="pages"
        @current-change="distribution"
      />
      <div
        v-if="isFileNum"
        style="margin-top: 20px;font-size:14px;"
      >
        <span style="margin-right:30px">文件个数：{{ fileNum.fileCount }}</span>
        <span>文件夹个数：{{ fileNum.fileFolder }}</span>
      </div>
    </el-card>

    <!-- 这是上传和升级 -->
    <el-dialog
      :visible.sync="fileDialogVisible"
      :title="this.isSaveFile ? '发起' : '升级'"
>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        size="small"
      >
        <el-form-item
          label="文件编号:"
          prop="fileNo"
          class="textAlign"
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
          label="版本号:"
          prop="version"
        >
        <el-input v-model="form.version" />
        </el-form-item>
        <el-form-item
          label="文件备注信息:"
          prop="remark"
>
        <el-input v-model="form.remark" />
        </el-form-item>

        <el-form-item
          v-if="this.isSaveFile"
          label="生效日期:"
          prop="effectiveDate"
        >
        <el-date-picker
            v-model="form.effectiveDate"
            type="date"
            placeholder=""
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          v-if="this.isSaveFile==false"
          label="生效日期:"
          prop="fileEffectiveDate"
        >
        <el-date-picker
            v-model="form.fileEffectiveDate"
            type="date"
            placeholder=""
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          v-if="this.isSaveFile==false"
          label="旧版本作废时间:"
          prop="invalidTime"
        >
        <el-date-picker
            v-model="form.invalidTime"
            type="date"
            placeholder=""
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item
          label="文件类型:"
          prop="fileType"
        >
          <el-select v-model="form.externalType">
            <el-option
              v-for="item in fileTypes"
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
            @change="uploadFileChange"
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
    <!-- <VersionList ref="versioinList" /> -->
    <el-dialog
      :visible.sync="fileVersionVisible"
      :before-close="editionCallback"
      title="版本列表"
      width="1200px"
    >
    <VersionList :id="fileNoForVersion" @sendChildData="ChildData" />
    </el-dialog>

     <el-dialog :visible.sync="openDetails" title="文件详情">
    <FileDetail :dat="fileDetail" />
     </el-dialog>

    <el-dialog title="新建文件夹" :visible.sync="listFather" class="demo-ruleForm">
      <el-form label-width="100">
        <el-form-item
            label="文件夹名称:"
          >
          <el-input v-model="folder.folderName" />
          </el-form-item>

          <el-form-item>
          <el-button
            type="primary"
            @click="creadteFolder()"
          >提交</el-button>
          <el-button
          @click="creadteFail()"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-row>
</template>

<script>
import { listExternal, listDelete, listEffect, docExternalUpgrade, docExternalSaveFile, listCreate, folderCreadte, listDetails, fileType } from '@/api/doc-external'
import UploadFile from '@/components/UploadFile'
import VersionList from './VersionList'
import FileDetail from './FileDetail'

export default {
  components: {
    VersionList,
    UploadFile,
    FileDetail
  },
  data() {
    return {
      isFileNum: true,
      fileNum: {},
      openDetails: false,
      fileDetail: [],
      RegressionNum: [0],
      Regression: {
        folderId: '',
        page: '0',
        limit: '10'
      },
      buttonNull: '',
      isSaveFile: '',
      fileName: '',
      fileId: '',
      fileState: '',
      fileDate: '',
      fileUpdata: '',
      tableData: [
      ],
      listQuery: {
        page: 1,
        limit: 10,
        docExternalId: '',
        fileName: '',
        externalType: '',
        filePath: '',
        effectiveStartDate: '',
        effectiveEndDate: ''
      },
      fileStates: [
        { value: '过渡期有效', lable: 'CONTROL' },
        { value: '生效', lable: 'VALID' }
      ],
      fileTypes: [],
      fileDialogVisible: false,
      fileVersionVisible: false,
      fileNoForVersion: '',
      form: {
        effectiveDate: '',
        id: '',
        docExternalId: 0,
        fileName: '',
        interimStartTime: '',
        interimEndTime: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileFormat: '',
        fileNo: '',
        externalType: '',
        version: '',
        fileEffectiveDate: '',
        fileStarter: '',
        remark: ''
      },
      pulishLoading: false,
      fileList: [],
      rules: {
        fileName: [{ required: true, message: '请输入文件名称' }], // 文件名称
        fileDesc: [{ required: true, message: '请输入文件说明' }], // 文件说明
        file: [{ required: true, message: '请选择上传文件', trigger: 'change' }]
      },
      docExternalId: 0,
      detail: false,
      listFather: false,
      folder: {
        folderName: '',
        folderId: ''
      },
      total: 0
    }
  },
  created() {
    this.getList()
    this.filetype()
  },
  methods: {
    handleEdit(index, rows) {
      var uid = rows.docExternalId
      uid = { docExternalId: uid }

      listEffect(uid).then(res => {
        this.getList()
      })
    },
    handleFilter(state) {
      if (state == 'reset') {
        this.listQuery.page = 1
        this.listQuery.docExternalId = ''
        this.listQuery.fileName = ''
        this.listQuery.externalType = ''
        this.listQuery.filePath = ''
        this.listQuery.effectiveStartDate = ''
        this.listQuery.effectiveEndDate = ''
        this.getList()
      } else {
        this.getList()
      }
    },
    getList() {
      if (this.RegressionNum.length <= 1) {
        listExternal(this.listQuery).then(res => {
          this.isFileNum = true
          this.tableData = res.list
          this.total = res.total
          this.fileNum = {
            fileCount: res.fileCount,
            fileFolder: res.fileFolder
          }
        })
      } else {
        this.isFileNum = false
        listExternal(this.Regression).then(res => {
          this.tableData = res.list
          this.total = res.total
        })
      }
    },
    filetype() {
      fileType().then(res => {
        for (let i in res) {
          let o = {}
          o.value = res[i]
          o.lable = i
          this.fileTypes.push(o)
        }
      })
    },
    handleDelFile(index, rows) {
      var uid = rows[index].docExternalId
      uid = { docExternalId: uid }
      console.log(uid)
      listDelete(uid).then(res => {
        this.getList()
      })
    },
    pages(e) {
    },
    handleDownload(index, rows) {
      console.log(rows.fileUrl)
    },
    // 这是发起
    handleAddFile(row) {
      this.isSaveFile = true
      this.fileDialogVisible = true
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []

      this.form = {
        fileName: '',
        fileDesc: '',
        folderId: '',
        fileStatus: '',
        file: null,
        fileEffectiveDate: '',
        docExternalId: 0
      }
      this.form.folderId = this.RegressionNum[this.RegressionNum.length - 1]
    },
    handleUpgrade(index, row) {
      // 升级的接口
      this.fileDialogVisible = true
      this.isSaveFile = false
      this.form.fileNo = row.fileNo
      this.$refs.form && this.$refs.form.resetFields()
      this.fileList = []
      // 获得版本回退的时间
      listDetails(row.docExternalId).then(res => {
        this.form = {
          fileEffectiveDate: res.createTime,
          fileName: res.fileName,
          fileDesc: '',
          fileStatus: '',
          file: null,
          fileFormat: '',
          remark: res.remark,
          version: res.version,
          fileNo: res.fileNo,
          externalType: res.externalType,
          docExternalId: row.docExternalId
        }
        if (!this.form.lastInvalidTime) {
          this.form.lastInvalidTime = res.lastInvalidTime
        }
        this.form.docExternalId = row.id
        this.form.folderId = this.RegressionNum[this.RegressionNum.length - 1]
        this.form.id = row.docExternalId
      })
    },
    // 添加文件
    handlePublish(form, done) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pulishLoading = true
          let form = new FormData()
          for (let i in this.form) {
            form.append(i, this.form[i])
          }
          const http = this.isSaveFile ? docExternalSaveFile : docExternalUpgrade
          http(form).then(() => {
            this.getList()
            this.fileDialogVisible = false
            done()
          }).catch(() => {
            this.pulishLoading = false
          })
        }
      })
    },
    // 上传文件
    uploadFileChange({ file, fileFormat }) {
      this.form.fileFormat = fileFormat
      this.form.file = file
    },
    // 查看版本
    getVersions(index, row) {
      this.fileVersionVisible = true
      this.fileNoForVersion = row.docExternalId
    },
    // 版本回调关闭
    editionCallback() {
      this.fileVersionVisible = false
    },
    // 新建文件夹
    createFile(form, done) {
      this.listFather = true
    },
    distribution(val) {
      // val是拿当前第几页
      this.listQuery.page = val
      this.getList()
      this.Regression.page = val
    },
    show(a) {
    },
    // 查看详情
    fileDetails(row) {
      this.detail = true
      if (row.isFile) {
        // this.fileDetail=row.docExternalId
        this.openDetails = true
        this.fileDetail = []
        listDetails(row.docExternalId).then(res => {
          var obj = {}
          for (let i in res) {
            obj[i] = res[i]
          }
          this.fileDetail.push(obj)
        }).catch(() => {

        })
      }
    },
    // 创建文件夹的发送请求
    creadteFolder() {
      this.folder.folderId = this.Regression.folderId
      // console.log(this.folder.folderId)
      folderCreadte(this.folder).then(res => {
        this.$message({ message: '添加成功', type: 'success' })
        this.listFather = false
        this.folder.folderName = ''
        this.getList()
      }).catch(res => {
        this.folder.folderName = ''
        this.getList()
      })
    },
    // 创建文件夹失败发送的请求
    creadteFail() {
      this.listFather = false
      this.folder.folderName = ''
    },
    // 打开文件夹
    folderInto(row) {
      // console.log(row)
      if (row.isFile == false) {
        // Regression
        this.RegressionNum.push(row.id)
        this.Regression.folderId = this.RegressionNum[this.RegressionNum.length - 1]

        this.getList()
        listExternal(this.Regression).then(res => {
          this.tableData = res.list
          this.total = res.total
        })
      }
    },
    // 查看上一页
    Superior() {
      if (this.RegressionNum.length > 1) {
        // console.log(this.RegressionNum[this.RegressionNum.length-2])
        // console.log(this.RegressionNum)
        this.Regression.folderId = this.RegressionNum[this.RegressionNum.length - 2]
        listExternal(this.Regression).then(res => {
          this.tableData = res.list
          var uesless = this.RegressionNum.splice(this.RegressionNum.length - 1, 1)
          this.total = res.total
        })
        // 禁用
        if (this.RegressionNum.length <= 2) {
          this.isFileNum = true
        }
      } else {

      }
    },
    ChildData(data) {
    },
    // 删除
    handDelete(index, row) {
      if (!row.docExternalId) return
      var data = {}
      data.docExternalId = row.docExternalId
      listDelete(data).then(res => {
        this.getList()
      })
    }
  }

}
</script>

<style scoped>

</style>
