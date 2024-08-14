<template>
  <div style="height: 100%">
    <el-card shadow="always" style="height: 80px">
      <el-form :inline="true" class="header_box">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="main_body">
      <el-row style="height: 40px">
        <el-button type="primary" @click="addUser">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </el-row>
      <el-row style="height: calc(100% - 65px)">
        <el-table :data="tableData" style="width: 100%; height: 100%" border>
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="#" align="center" />
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="name" label="用户名字" align="center" />
          <el-table-column prop="username" label="用户名称" align="center" />
          <el-table-column
            prop="roleName"
            label="用户角色"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column prop="updateTime" label="更新时间" align="center" />
          <el-table-column prop="" label="操作" width="300" align="center">
            <template #default="scope">
              <el-button
                size="small"
                icon="User"
                type="primary"
                @click="setRole(scope.row.id)"
              >
                角色分配
              </el-button>
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                @click="editUser(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                @click="deleteUser(scope.row.id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row style="height: 40px; float: right">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[1, 10, 20, 30, 40]"
          background
          layout="sizes,total, prev, pager, next"
          :total="total"
          size="small"
          @current-change="currentChange"
          @size-change="sizeChange"
        />
      </el-row>
    </el-card>
    <el-drawer
      v-model="drawerFlag"
      :title="isAdd ? '新增用户' : '修改用户'"
      direction="ltr"
      class="demo-drawer"
      @close="closeDrawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="userform" :rules="rules" ref="ruleFormRef">
          <el-form-item
            label="用户姓名"
            prop="username"
            placeholder="请输入用户姓名"
          >
            <el-input v-model="userform.username" />
          </el-form-item>
          <el-form-item
            label="用户昵称"
            prop="name"
            placeholder="请输入用户昵称"
          >
            <el-input v-model="userform.name" />
          </el-form-item>
          <el-form-item
            label="用户密码"
            prop="password"
            v-if="isAdd"
            placeholder="请输入用户密码"
          >
            <el-input v-model="userform.password" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawerFlag = false">取消</el-button>
          <el-button type="primary" @click="submitUser(ruleFormRef)">
            确认
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { reqUserInfo, reqSaveUser, reqUpdateUser } from '@/api/acl/user/index'
import { allResponseData, Records, User } from '@/api/acl/user/type'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
let pageSize = ref<number>(10)
let pageNum = ref<number>(1)
let total = ref<number>(0)
let tableData = ref<Records>([])
let drawerFlag = ref<boolean>(false)
let isAdd = ref<boolean>(true)
let userform = reactive<User>({
  username: '',
  name: '',
  password: '',
})
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  name: string
  username: string
  password: string
}
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
})
async function getHasUser(pager = 1) {
  pageNum.value = pager
  const result: allResponseData = await reqUserInfo(
    pageNum.value,
    pageSize.value,
  )
  if (result.code == 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}
function setRole(id) {}
function editUser(row: User) {
  Object.assign(userform, row)
  isAdd.value = false
  drawerFlag.value = true
}
function deleteUser(id) {}
function currentChange(data: number) {
  getHasUser(data)
}
function sizeChange() {
  getHasUser()
}
const addUser = () => {
  isAdd.value = true
  drawerFlag.value = true
}
const submitUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (isAdd.value) {
        reqSaveUser(userform)
          .then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: '新增用户成功！',
                type: 'success',
              })
              getHasUser()
              drawerFlag.value = false
            }
          })
          .catch(() => {
            ElMessage({
              message: '新增用户失败！',
              type: 'warning',
            })
          })
      } else {
        reqUpdateUser(userform)
          .then((res) => {
            if (res.code == 200) {
              ElMessage({
                message: '修改用户成功！',
                type: 'success',
              })
              getHasUser(pageNum.value)
              drawerFlag.value = false
              window.location.reload()
            }
          })
          .catch(() => {
            ElMessage({
              message: '修改用户失败！',
              type: 'warning',
            })
          })
      }
    }
  })
}
const closeDrawer = () => {
  Object.assign(userform, {
    username: '',
    name: '',
    password: '',
  })
  ruleFormRef.value?.resetFields()
}
onMounted(() => {
  getHasUser()
})
</script>
<style scoped lang="scss">
.header_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main_body {
  margin: 10px 0;
  height: calc(100% - 100px);
  background: #fff;
}
::v-deep .el-form--inline .el-form-item {
  margin: 0;
}
::v-deep .el-card__body {
  height: calc(100% - 40px);
}
</style>
