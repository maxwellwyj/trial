<template>
  <div class="testarea">
      <el-container class="container">
        <el-header class="header">
          <div class="centered-text">
            <p>轨头综合磨损情况</p>
          </div>
        </el-header>
        <el-main class="main">
        <el-scrollbar>
          <el-table :data="filteredData">
            <el-table-column prop="position" label="Position"></el-table-column>
            <el-table-column prop="wearLevel" label="Wear Level"></el-table-column>
            <el-table-column prop="damageDegree" label="Damage Degree"></el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
      </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import axios from 'axios';

interface fileData {
  position: number;
  wearLevel: number;
  damageDegree: number;
}

const filteredData = ref<fileData[]>([]);
  async function loadData() {
  try {
    const response = await axios.get<any>('http://localhost:5173/map/case2data.json');
    const responseData = response?.data?.data ?? [];
    if (Array.isArray(responseData)) {
      filteredData.value = transformData(responseData);
      console.log('数据加载成功：', filteredData.value);
    } else {
      console.error('服务器返回的数据不是一个有效的数组:', responseData);
    }
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

function transformData(objData: any): fileData[] {
  const transformedData: fileData[] = [];
  for (const item of objData) {
    const railData: fileData = {
    position: item.position,
    wearLevel: item.wearLevel,
    damageDegree: item.damageDegree,
};
    transformedData.push(railData);
  }

  return transformedData;
}

onMounted(() => {
  loadData();
});

</script>

<style scoped>
.textarea {
  height: 250px;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3); 
}
.container {
  margin-top: -20px; /* 负边距消除上方间距 */
}
.header {
  margin-bottom: -20px; /* 负边距消除下方间距 */
}
.main {
  padding-top: 0; /* 消除上方内边距 */
}
</style>