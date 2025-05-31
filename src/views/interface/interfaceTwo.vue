<template>
  <div class="container">
    <div class="left-column">
      <!-- 通过label-class-name添加类，使用:deep伪类选择器来修改<el-descriptions-item>的标签样式。没有用 -->
      <!-- 通过具名插槽v-slot 为label添加class，并在style中修改-->
      <el-descriptions direction="vertical" :column="1">
        <template v-slot:title>
          <span class="my-title">钢轨表面裂纹</span>
        </template>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">表面裂纹1维修条件:</span>
          </template>
          <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[0].content"
          >作业:{{ data[0].content}}; 劳动人数:{{ data[0].laborNumber }}; 劳动定额:{{ data[0].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[0].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">表面裂纹2维修条件:</span>
          </template>
           <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[1].content"
          >作业:{{ data[1].content}}; 劳动人数:{{ data[1].laborNumber }}; 劳动定额:{{ data[1].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[1].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">表面裂纹3维修条件:</span>
          </template>
          <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[3].content"
          >作业:{{ data[3].content}}; 劳动人数:{{ data[3].laborNumber }}; 劳动定额:{{ data[3].laborQuota }}</span><!-- 暂时有点问题 -->
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[3].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">表面裂纹4维修条件:</span>
          </template>
          <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[3].content"
          >作业:{{ data[3].content}}; 劳动人数:{{ data[3].laborNumber }}; 劳动定额:{{ data[3].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[3].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">表面裂纹5维修条件:</span>
          </template>
         <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[4].content"
          >作业:{{ data[4].content}}; 劳动人数:{{ data[4].laborNumber }}; 劳动定额:{{ data[4].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[4].content"
          >暂不需维修</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="right-column">
      <el-descriptions direction="vertical" :column="1">
        <template v-slot:title>
          <span class="my-title">钢轨轨头磨损</span>
        </template>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">轨头磨损1维修条件:</span>
          </template>
         <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[2].content"
          >作业:{{ data[2].content}}; 劳动人数:{{ data[2].laborNumber }}; 劳动定额:{{ data[2].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[2].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">轨头磨损2维修条件:</span>
          </template>
         <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[6].content"
          >作业:{{ data[5].content}}; 劳动人数:{{ data[5].laborNumber }}; 劳动定额:{{ data[5].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[6].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">轨头磨损3维修条件:</span>
          </template>
          <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[7].content"
          >作业:{{ data[6].content}}; 劳动人数:{{ data[6].laborNumber }}; 劳动定额:{{ data[6].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[7].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">轨头磨损4维修条件:</span>
          </template>
       <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[7].content"
          >作业:{{ data[7].content}}; 劳动人数:{{ data[7].laborNumber }}; 劳动定额:{{ data[7].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[7].content"
          >暂不需维修</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            <span class="my-label">轨头磨损5维修条件:</span>
          </template>
        <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && data[8].content"
          >作业:{{ data[8].content}}; 劳动人数:{{ data[8].laborNumber }}; 劳动定额:{{ data[8].laborQuota }}</span>
            <span
            style="border: 1px solid #ccc; padding: 10px; display: inline-block; width: 96%" v-if="flag && !data[8].content"
          >暂不需维修</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

// 定义数据类型
interface Condition {
  type: number
  serial: number
  content: string
  laborNumber: number
  laborQuota: number
}

// 创建响应式的引用对象
const data = ref<Condition[]>([])
//异步请求完成后修改flag，并通过v-if，使得数据访问在异步请求完成后执行
const flag = ref(false)

// 加载数据
async function loadData() {
  try {
    const response = await axios.get('http://localhost:5173/map/repairConditions.json')
    data.value = response.data.RepairConditions
    console.log('数据加载成功：', data.value)
    flag.value = true
  } catch (error) {
    console.error('加载数据时出错：', error)
  }
}
onMounted(loadData)
</script>


<style scoped>
.container {
  display: flex;
  background-color: #f0f0f0;
}

.left-column {
  flex: 2;
  border: 2px solid #dbdcde;
  padding: 10px;
  margin-right: 10px; /* 设置右侧间距 */
  background-color: #f0f0f0;
}

.right-column {
  flex: 2;
  border: 2px solid #dbdcde;
  padding: 10px;
  margin-left: 10px; /* 设置左侧间距 */
  background-color: #f0f0f0;
}

.el-descriptions {
  margin-top: 20px;
}
/* :deep(.my-label){
    color: red;
} */
.my-label {
  color: red;
}
</style>
