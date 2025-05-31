<template>
  <div class="table-container">
    <span style="color: blue">维修设置</span>
    <el-table :data="data" style="width: 100%">
      <el-table-column width="45">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}.</span>
        </template>
      </el-table-column>
      <el-table-column label="维修内容" label-class-name="my-label" header-align="center">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span
              style="
                border: 1px solid #ccc;
                padding: 10px;
                display: inline-block;
                width: 96%;
                color: black;
              "
              v-if="scope.row.content"
              >{{ scope.row.content }}</span
            ><span
              style="
                border: 1px solid #ccc;
                padding: 10px;
                display: inline-block;
                width: 96%;
                color: grey;
              "
              v-else
              >暂无故障信息</span
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column label="维修人数" label-class-name="my-label" header-align="center">
        <template #default="scope">
          <div class="flex flex-wrap gap-4 items-center">
            <el-select
              v-model="scope.row.value1"
              placeholder="Select"
              size="size"
              style="width: 240px"
            >
              <el-option
                v-for="item in repairNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="维修时间" label-class-name="my-label" header-align="center">
        <template #default="scope">
          <div class="flex flex-wrap gap-4 items-center">
            <el-select
              v-model="scope.row.value2"
              placeholder="Select"
              size="size"
              style="width: 240px"
            >
              <el-option
                v-for="item in repairTime"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="主要工具" label-class-name="my-label" header-align="center">
        <template #default="scope">
          <div class="flex flex-wrap gap-4 items-center">
            <el-select
              v-model="scope.row.value3"
              placeholder="Select"
              size="size"
              style="width: 240px"
            >
              <el-option
                v-for="item in mainTool"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const repairNumber = ref([
  {
    value: 1,
    label: '1人',
  },
  {
    value: 2,
    label: '2人'
  },
  {
    value: 3,
    label: '3人'
  },
  {
    value: 4,
    label: '4人'
  },
  {
    value: 5,
    label: '5人'
  }
])
const repairTime = ref([
  {
    value: 50,
    label: '50分钟'
  },
  {
    value: 100,
    label: '100分钟'
  },
  {
    value: 150,
    label: '150分钟'
  },
  {
    value: 200,
    label: '200分钟'
  },
  {
    value: 250,
    label: '250分钟'
  }
])
const mainTool = [
  {
    value: '探伤仪',
    label: '探伤仪'
  }
]
interface Condition {
  type:number,
  serial: number
  content: string
  laborNumber: number
  laborQuota: number
}

// 数据引用
const data = ref<Condition[]>([])

// 加载数据
async function loadData() {
  try {
    const response = await axios.get('http://localhost:5173/map/repairConditions.json')
    data.value = response.data.RepairConditions
    console.log('数据加载成功：', data.value)
  } catch (error) {
    console.error('加载数据时出错：', error)
  }
}
onMounted(loadData)
</script>

<style>
.table-container {
  flex: 2;
  border: 2px solid #dbdcde;
  padding: 10px;
  background-color: #f0f0f0;
}
.my-label {
  color: #0072bd;
}
</style>
