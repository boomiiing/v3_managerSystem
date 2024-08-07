<template>
  <div class="login_box">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="ruleForm"
          status-icon
          label-width="auto"
          :rules="rules"
          class="form_box"
          ref="loginForms"
        >
          <h1>Hi!</h1>
          <h2>欢迎来到！</h2>
          <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" :prefix-icon="User" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item label="">
            <el-button
              type="primary"
              style="width: 100%"
              @click="submitForm()"
              :loading="loginLoading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import useUserStore from '@/store/modules/user.ts'
import { useRouter } from 'vue-router'
import { getTime } from '@/utils/time'
let ruleForm = reactive({
  username: '',
  password: '',
})
let loginLoading = ref(false)
let userStore = useUserStore()
let $router = useRouter()
const loginForms = ref()
const rules = {
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
async function submitForm() {
  await loginForms.value.validate()
  loginLoading.value = true
  try {
    await userStore.userLogin(ruleForm)
    loginLoading.value = false
    $router.push('/')
    ElNotification({
      type: 'success',
      title: getTime(),
      message: '登录成功',
    })
  } catch (error) {
    loginLoading.value = false
    ElNotification({
      type: 'error',
      title: getTime(),
      message: (error as Error).message,
    })
  }
}
</script>
<style scoped lang="scss">
.login_box {
  width: 100%;
  height: 100vh;
  // background: #000;
  background: url('../../assets/images/ocean.jpg') no-repeat;
  background-size: cover;
  .form_box {
    width: 60%;
    margin: 30px auto;
    padding: 30px;
    background-color: rgba(39, 65, 75, 0.3);
    border-radius: 15px;
    position: relative;
    top: 60%;
    // left: 50%;
    h1 {
      color: #fff;
      font-size: 40px;
      margin: 0;
    }
    h2 {
      color: #fff;
    }
  }
}
</style>
