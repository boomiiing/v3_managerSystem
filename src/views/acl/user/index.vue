<template>
  <div style="height: 100%">
    <el-card shadow="always" style="height: 80px">
      <el-form :inline="true" class="header_box">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入名称" clearable v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="!keyword">
            搜索
          </el-button>
          <el-button type="primary" plain @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="always" class="main_body">
      <el-row style="height: 40px">
        <el-button type="primary" @click="addUser">新增</el-button>
        <el-button
          type="danger"
          @click="batchRemove"
          :disabled="multipleSelection.length == 0"
        >
          批量删除
        </el-button>
      </el-row>
      <el-row style="height: calc(100% - 65px)">
        <el-table
          :data="tableData"
          style="width: 100%; height: 100%"
          border
          @selection-change="handleSelectionChange"
        >
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
                @click="setRole(scope.row)"
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
    <el-drawer
      v-model="roleFlag"
      title="角色分配"
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
            <el-input v-model="userform.username" disabled />
          </el-form-item>
          <el-form-item label="用户角色" prop="roleName">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="item in allRole"
                :key="item.id"
                :label="item.roleName"
                :value="item"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="roleFlag = false">取消</el-button>
          <el-button type="primary" @click="submitUserRole()">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  reqUserInfo,
  reqSaveUser,
  reqUpdateUser,
  getAllRole,
  doAssignRole,
  removeuser,
  BatchRemoveuser,
} from '@/api/acl/user/index'
import {
  allResponseData,
  Records,
  User,
  allRoleResponse,
  roles,
  assignRoles,
} from '@/api/acl/user/type'
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
let pageSize = ref<number>(10)
let pageNum = ref<number>(1)
let total = ref<number>(0)
let tableData = ref<Records>([])
let drawerFlag = ref<boolean>(false)
let isAdd = ref<boolean>(true)
let roleFlag = ref<boolean>(false)
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
    keyword.value,
  )
  if (result.code == 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}
async function setRole(row: any) {
  const result: allRoleResponse = await getAllRole(row.id)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    handleCheckedCitiesChange(result.data.assignRoles)
    roleFlag.value = true
  }
  Object.assign(userform, row)
}
function editUser(row: User) {
  Object.assign(userform, row)
  isAdd.value = false
  drawerFlag.value = true
}
async function deleteUser(id: number) {
  try {
    const confirmed = await ElMessageBox.confirm(
      '是否确认删除当前用户?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    if (confirmed === 'confirm') {
      const result = await removeuser(id)
      if (result.code == 200) {
        getHasUser(pageNum.value)
        ElMessage({
          message: '用户删除成功！',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '用户删除失败！',
          type: 'warning',
        })
      }
    }
  } catch (err) {
    ElMessage({
      message: '删除过程中发生错误！',
      type: 'error',
    })
  }
}
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
const checkAll = ref(false)
const isIndeterminate = ref(true)
const allRole = ref<roles>([])
let userRole = ref<roles>([])
const submitUserRole = async () => {
  const data: assignRoles = {
    roleIdList: [],
    userId: userform.id as number,
  }
  userRole.value.forEach((ele) => {
    if (ele.id) {
      data.roleIdList.push(ele.id)
    }
  })
  const result = await doAssignRole(data)
  if (result.code == 200) {
    getHasUser(pageNum.value)
    roleFlag.value = false
    ElMessage({
      message: '用户角色修改成功！',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '用户角色修改失败！',
      type: 'warning',
    })
  }
}
const multipleSelection = ref<number[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val.map((ele) => ele.id as number)
}
const batchRemove = async () => {
  const confirmed = await ElMessageBox.confirm(
    '是否确认删除选中的用户?',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
  if (confirmed === 'confirm') {
    const result = await BatchRemoveuser(multipleSelection.value)
    if (result.code == 200) {
      getHasUser(pageNum.value)
      ElMessage({
        message: '用户删除成功！',
        type: 'success',
      })
    } else {
      ElMessage({
        message: '用户删除失败！',
        type: 'warning',
      })
    }
  }
}
let keyword = ref('')
const search = () => {
  getHasUser()
}
const reset = () => {
  keyword.value = ''
  getHasUser()
}
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: roles) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRole.value.length
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
