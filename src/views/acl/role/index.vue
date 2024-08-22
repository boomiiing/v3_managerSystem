<template>
  <div style="height: 100%">
    <el-card shadow="always" style="height: 80px">
      <el-form :inline="true" class="header_box">
        <el-form-item label="角色名称:">
          <el-input placeholder="请输入角色名称" clearable v-model="keyword" />
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
        <el-button type="primary" @click="addNewRole">新增角色</el-button>
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
          <el-table-column prop="roleName" label="角色名称" align="center" />
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
                分配权限
              </el-button>
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                @click="alterRole(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                @click="deleteRole(scope.row.id)"
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
    <el-drawer v-model="setRoleFlag" title="分配权限" class="demo-drawer">
      <div class="demo-drawer__content">
        <el-tree
          v-if="setRoleFlag"
          style="max-width: 500px"
          :data="treeData"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          v-loading="treeLoading"
          ref="roleTree"
          :default-checked-keys="defaultChecked"
          default-expand-all
          :current-node-key="currentChecked"
        />
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="setRoleFlag = false">取消</el-button>
          <el-button type="primary" @click="submitSetRole()">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  reqGetAllRole,
  reqSetNewRole,
  reqAlterRole,
  reqDeleteRole,
  reqSetPermission,
  reqGetRolePermission,
  reqAssignPermission,
} from '@/api/acl/role/index'
import { ResponseRoleData, record, Children } from '@/api/acl/role/type'
import { ElMessage, ElMessageBox } from 'element-plus'
const defaultProps = {
  children: 'children',
  label: 'name',
}
let keyword = ref('')
let tableData = ref<record>([])
let pageNum = ref(1)
let pageSize = ref(10)
let total = ref(0)
const getAllRole = async (page = 1) => {
  pageNum.value = page
  const result: ResponseRoleData = await reqGetAllRole(
    pageNum.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    tableData.value = result.data.records
    total.value = result.data.total
  }
}
const handleSelectionChange = () => {}
const alterRole = async (data: record) => {
  const result = await ElMessageBox.prompt('请输入角色名称', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue: data.roleName,
    inputPattern: /^.+$/,
    inputErrorMessage: '请输入角色名称！',
  })
  if (result.action === 'confirm') {
    const response = await reqAlterRole({ id: data.id, roleName: result.value })
    if (response.code == 200) {
      getAllRole()
      ElMessage({
        type: 'success',
        message: `修改角色名称成功！`,
      })
    }
  }
}
let setRoleFlag = ref(false)
let treeLoading = ref(false)
let defaultChecked = ref<number[]>([])
let currentChecked = ref<number[]>([])
let roleTree = ref()
let treeData = reactive<Children[]>([])
let roleId = ref()
const setRole = async (id: number) => {
  setRoleFlag.value = true
  treeLoading.value = true
  roleId.value = id
  const result = await reqGetRolePermission(id)
  if (result.code == 200) {
    treeData = result.data
    defaultChecked.value = []
    getCheckedNode(treeData)
    treeLoading.value = false
  }
  treeLoading.value = false
}
const getCheckedNode = (data: Children[]) => {
  data.forEach((ele) => {
    if (ele.children.length == 0 && ele.select) {
      defaultChecked.value.push(ele.id)
    } else if (ele.children) {
      getCheckedNode(ele.children)
    }
  })
}
const submitSetRole = async () => {
  let arr1 = roleTree.value.getCheckedKeys()
  let arr2 = roleTree.value.getHalfCheckedKeys()
  let permissionId = arr1.concat(arr2)
  const result = await reqAssignPermission(roleId.value, permissionId)
  if (result.code == 200) {
    setRoleFlag.value = false
    getAllRole(pageNum.value)
    ElMessage({
      message: '角色权限修改成功！',
      type: 'success',
    })
  }
}
const deleteRole = async (id: number) => {
  try {
    const confirmed = await ElMessageBox.confirm(
      '是否确认删除当前角色?',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
    if (confirmed === 'confirm') {
      const result = await reqDeleteRole(id)
      if (result.code == 200) {
        getAllRole(pageNum.value)
        ElMessage({
          message: '角色删除成功！',
          type: 'success',
        })
      } else {
        ElMessage({
          message: '角色删除失败！',
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
const search = () => {
  getAllRole()
}
const reset = () => {
  keyword.value = ''
  getAllRole()
}
const addNewRole = async () => {
  const result = await ElMessageBox.prompt('请输入角色名称', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /^.+$/,
    inputErrorMessage: '请输入角色名称！',
  })
  if (result.action === 'confirm') {
    const response = await reqSetNewRole({ roleName: result.value })
    if (response.code == 200) {
      getAllRole()
      ElMessage({
        type: 'success',
        message: `新增角色成功！`,
      })
    }
  }
}
function currentChange(data: number) {
  getAllRole(data)
}
function sizeChange() {
  getAllRole()
}
onMounted(() => {
  getAllRole(1)
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
}
::v-deep .el-form--inline .el-form-item {
  margin: 0;
}
::v-deep .el-card__body {
  height: calc(100% - 40px);
}
</style>
