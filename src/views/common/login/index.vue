<template>
  <div class="login-container">
    <vue-particles color="#fff" :particles-number="60" :move-speed="1.5" :line-opacity="0.5" class="bg" />
    <div class="login-form">
      <el-row :gutter="20">
        <el-col :lg="6" :sm="10" class="aa">
            <h3>后台管理系统</h3>
            <el-form
              ref="ruleForm2"
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              label-width="100px"
              class="login-ruleForm"
            >
              <el-form-item label="用户名" prop="loginName">
                <el-input v-model="ruleForm2.loginName" clearable />
              </el-form-item>
              <el-form-item label="密码" prop="loginPassword">
                <el-input v-model="ruleForm2.loginPassword" type="password" autocomplete="off" show-password clearable />
              </el-form-item>
              <el-form-item label="验证码" prop="captcha">
                <div style="width:100%;display:flex;text-align: left">
                  <el-input v-model="ruleForm2.captcha" placeholder="请输入验证码" clearable style="flex:1;margin-right:20px" />
                  <img :src="captchaUrl" alt="" width="80" height="40" style="cursor:pointer" @click="captchaUrl = captchaUrl + Math.random()">
                </div>
              </el-form-item>
              <el-form-item>
                <el-button :loading="btnLoading" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
              </el-form-item>
  <!--            <div class='acount'><span>用户名</span>：admin&nbsp;&nbsp;<span>{{$t('login.password')}}</span>:any</div>-->
  <!--            <div class='acount'><span>密码</span>：user&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{{$t('login.password')}}</span>:any</div>-->
            </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
import { captcha } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      ruleForm2: {
        loginName: 'admin',
        loginPassword: '12345678',
        captcha: ''
      },
      rules2: {
        loginPassword: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        loginName: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }]
      },
      btnLoading: false,
      captchaUrl: captcha + '?' + Math.random()
    }
  },
  created() {
    // 清除用户登录记录
    this.$store.dispatch('user/logout')
    this.$store.dispatch('app/resetData')
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoading = true
          this.$store.dispatch('user/login', this.ruleForm2).then(() => {
            this.btnLoading = false
            this.$router.push('/')
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
.bg{
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login-container {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  .login-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    .aa{
      margin: auto;
      float: none;
    }
    h3{
      line-height: 60px;
      margin-left: 100px
    }
    .acount{
      text-align: left
    }
  }
  /deep/ .el-form-item__label{
    color: #fff;
  }
}

</style>

