<template>
  <div style="height: 100%">
    <el-card shadow="always" class="main_body">
      <el-row style="height: 100%">
        <el-table
          row-key="id"
          style="width: 100%; height: 100%"
          :data="tableData"
          border
        >
          <el-table-column prop="name" label="名称" align="center" />
          <el-table-column prop="code" label="权限值" align="center" />
          <el-table-column prop="updateTime" label="修改时间" align="center" />
          <el-table-column prop="" label="操作" width="300" align="center">
            <template #default="scope">
              <el-button
                size="small"
                icon="User"
                type="primary"
                :disabled="scope.row.level == 4"
                @click="addMenu(scope.row)"
              >
                {{ scope.row.level == 3 ? '添加功能' : '添加菜单' }}
              </el-button>
              <el-button
                size="small"
                icon="Edit"
                type="primary"
                :disabled="scope.row.level == 1"
                @click="editMenu(scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="small"
                icon="Delete"
                type="danger"
                :disabled="scope.row.level == 1"
                @click="deleteMenu(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="isAdd ? '新增' : '修改'"
      width="500"
      @close="onClose"
    >
      <el-form :model="menuForm">
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="menuForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限值" label-width="80px">
          <el-input v-model="menuForm.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitSave">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import {
  reqGetPermission,
  reqSavePermission,
  reqEditPermission,
  reqDeletePermission,
} from '@/api/acl/menu/index'
import { Children, Query } from '@/api/acl/menu/type'
import { ElMessage, ElMessageBox } from 'element-plus'

let tableData = reactive<Children[]>([])
const gettPermission = async () => {
  const result = await reqGetPermission()
  if (result.code == 200) {
    Object.assign(tableData, result.data)
  }
}
let dialogFormVisible = ref(false)
let isAdd = ref(false)
let menuForm = ref<Query>({
  name: '',
})
const addMenu = (data: Children) => {
  dialogFormVisible.value = true
  menuForm.value.pid = data.id
  isAdd.value = true
}
const submitSave = async () => {
  if (isAdd.value) {
    const result = await reqSavePermission(menuForm.value)
    if (result.code == 200) {
      dialogFormVisible.value = false
      gettPermission()
      ElMessage({
        message: '新增成功！',
        type: 'success',
      })
    } else {
      dialogFormVisible.value = false
      ElMessage({
        message: '新增失败！',
        type: 'warning',
      })
    }
  } else {
    const result = await reqEditPermission(menuForm.value)
    if (result.code == 200) {
      dialogFormVisible.value = false
      gettPermission()
      ElMessage({
        message: '修改成功！',
        type: 'success',
      })
    } else {
      dialogFormVisible.value = false
      ElMessage({
        message: '修改失败！',
        type: 'warning',
      })
    }
  }
}
const editMenu = (data: Children) => {
  dialogFormVisible.value = true
  isAdd.value = false
  menuForm.value.name = data.name
  menuForm.value.code = data.code as number
  menuForm.value.id = data.id
}
const deleteMenu = async (data: Children) => {
  const result = await reqDeletePermission(data.id)
  if (result.code == 200) {
    dialogFormVisible.value = false
    gettPermission()
    ElMessage({
      message: '删除成功！',
      type: 'success',
    })
  } else {
    dialogFormVisible.value = false
    ElMessage({
      message: '删除失败！',
      type: 'warning',
    })
  }
}
const onClose = () => {
  menuForm.value = {
    name: '',
  }
}
onMounted(() => {
  gettPermission()
})
</script>
<style scoped lang="scss">
.main_body {
  height: 100%;
}
::v-deep .el-card__body {
  height: calc(100% - 40px);
}
</style>
