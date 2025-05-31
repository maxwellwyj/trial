<template>
  <div>
    <div class="itemChart" id="itemChart"></div>
    <div class="totalCrackChart" id="totalCrackChart"></div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  provide,
  inject,
  ref,
  watch,
  defineProps
} from 'vue';

const $echarts: any = inject('echarts');

// Define data types
interface RailData {
  date: string;
  measurements: {
    position: number;
    surfaceCrack: number;
    railheadWear: number;
    surfaceWear: number;
  }[];
}

interface Measurement {
  position: number;
  surfaceCrack: number;
  railheadWear: number;
  surfaceWear: number;
}

interface SelectedData {
  selectedDate: string;
  measurements: Measurement[];
}

// Receive the selected data passed from the parent component
const props = defineProps<{
  selectedData: SelectedData;
}>();

// Data reference
const selectedData = ref(props.selectedData);

// Watch for changes in selectedData
watch(
  () => props.selectedData,
  (newValue) => {
    selectedData.value = newValue;

    if (selectedData.value) {
      console.log('数据导入成功');
      console.log(selectedData.value); // Display the selectedData in the console
    } else {
      console.log('数据导入失败');
    }

    // Re-render the charts
    renderItemChart();
    renderTotalCrackChart();
  },
  { deep: true }
);

// Render the first chart (position, surfaceCrack, railheadWear)
function renderItemChart() {
  const positions = selectedData.value.measurements.map(
    (item: Measurement) => item.position
  );
  const surfaceCracks = selectedData.value.measurements.map(
    (item: Measurement) => item.surfaceCrack
  );
  const railheadWears = selectedData.value.measurements.map(
    (item: Measurement) => item.railheadWear
  );

  const itemChart = $echarts.init(document.getElementById('itemChart'));

  console.log(selectedData.value); 
  itemChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const dataIndex = params[0].dataIndex;
        const position =positions[dataIndex];
        const surfaceCrack = surfaceCracks[dataIndex];
        const railheadWear = railheadWears[dataIndex];
        return `位置：${position}<br>表面裂纹：${surfaceCrack}<br>轨头磨损：${railheadWear}`;
      },
    },
    xAxis: {
      type: 'category',
      data: positions.map(String),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: surfaceCracks,
        type: 'line',
        name: '表面裂纹',
      },
    ],
  });

}

// Render the second chart (position, surfaceWears)
function renderTotalCrackChart() {
  if (!selectedData.value) return;

  const positions = selectedData.value.measurements.map(
    (item: Measurement) => item.position
  );
  console.log(selectedData.value);
  const surfaceWears = selectedData.value.measurements.map(
    (item: Measurement) => item.surfaceWear
  );

  const totalCrackChart = $echarts.init(
    document.getElementById('totalCrackChart')
  );


  totalCrackChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const dataIndex = params[0].dataIndex;
        const position = selectedData.value.measurements[dataIndex].position;
        const surfaceWear =
          selectedData.value.measurements[dataIndex].surfaceWear;
        return `位置：${position}<br>表面总磨损度：${surfaceWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions.map(String)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: surfaceWears,
        type: 'line',
        name: '表面总磨损度'
      }
    ]
  });
}

// Provide selectedData in the child component
provide('selectedData', selectedData);

onMounted(() => {
  if (selectedData.value) {
    console.log('数据导入成功');
    console.log(selectedData.value); // Display the selectedData in the console
  } 

  renderItemChart();
  renderTotalCrackChart();
});
</script>
<style scoped>
.itemChart,
.totalCrackChart {
  height: 300px;
  width: 100%;
}
</style>


<!-- <template>
  <div>
    <div class="itemChart" id="itChart"></div>
    <div class="totalCrackChart" id="totalCrackChart"></div>
    <div class="dateSelector">
      <label for="datePicker">选择日期：</label>
      <input type="date" id="datePicker" v-model="selectedDate" @change="updateTotalCrackChart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';

// 定义数据类型
interface RailData {
  time: string;
  position: number;
  surfaceCrack: number;
  railheadWear: number;
  surfaceWear: number;
}

// 注入 ECharts
const $echarts: any = inject("echarts");

// 数据引用
const data = ref<RailData[]>([]);
const selectedDate = ref<string>('');

// 加载数据
async function loadData() {
  try {
    const response = await axios.get('http://localhost:5173/map/data.json');
    data.value = response.data.data;
    console.log('数据加载成功：', data.value);
    // 默认选择第一个日期
    if (data.value.length > 0) {
      selectedDate.value = data.value[0].time.split('T')[0];
    }
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

// 组件挂载后加载数据并渲染图表
onMounted(() => {
  loadData().then(() => {
    renderChart();
    renderTotalCrackChart();
  });
});

// 渲染表面裂纹折线图
function renderChart() {
  const positions = data.value.map(item => item.position);
  const surfaceCracks = data.value.map(item => item.surfaceCrack);

  const myChart = $echarts.init(document.getElementById('itChart'));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const dataIndex = params[0].dataIndex;
        const position = data.value[dataIndex].position;
        const surfaceCrack = data.value[dataIndex].surfaceCrack;
        const railheadWear = data.value[dataIndex].railheadWear;
        return `位置：${position}<br>表面裂纹：${surfaceCrack}<br>轨头磨损：${railheadWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions.map(String) // Convert positions to string for labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: surfaceCracks,
        type: 'line',
        name: '表面裂纹'
      }
    ]
  });
}

// 渲染表面总磨损度折线图
function renderTotalCrackChart() {
  updateTotalCrackChart();
}

// 更新表面总磨损度折线图
function updateTotalCrackChart() {
  const selectedData = data.value.filter(item => item.time.split('T')[0] === selectedDate.value);
  const positions = selectedData.map(item => item.position);
  const surfaceWears = selectedData.map(item => item.surfaceWear);

  const totalCrackChart = $echarts.init(document.getElementById('totalCrackChart'));
  totalCrackChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const dataIndex = params[0].dataIndex;
        const date = selectedData[dataIndex].time;
        const surfaceWear = surfaceWears[dataIndex];
        return `日期：${date}<br>表面总磨损度：${surfaceWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions.map(String) // Convert positions to string for labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: surfaceWears,
        type: 'line',
        name: '表面总磨损度'
      }
    ]
  });
}
</script>

<style scoped>
.itemChart,
.totalCrackChart {
  height: 300px;
  width: 100%;
}
.dateSelector {
  margin-top: 20px;
}
</style> -->


  







<!-- <template>
  <div class="itemChart" id="itChart"></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';

// 定义数据类型
interface RailData {
  position: number;
  surfaceCrack: number;
  railheadWear: number;
}

// 注入 ECharts
const $echarts: any = inject("echarts");

// 数据引用
const data = ref<RailData[]>([]);

// 加载数据
async function loadData() {
  try {
    const response = await axios.get('http://localhost:5173/map/data.json');
    data.value = response.data.data;
    console.log('数据加载成功：', data.value);
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

// 组件挂载后加载数据并渲染图表
onMounted(() => {
  loadData().then(() => {
    renderChart();
  });
});

// 渲染图表
function renderChart() {
  const positions = data.value.map(item => item.position);
  const surfaceCracks = data.value.map(item => item.surfaceCrack);
  const railheadWears = data.value.map(item => item.railheadWear);

  const myChart = $echarts.init(document.getElementById('itChart'));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: (params: any[]) => {
        const dataIndex = params[0].dataIndex;
        const position = data.value[dataIndex].position;
        const surfaceCrack = data.value[dataIndex].surfaceCrack;
        const railheadWear = data.value[dataIndex].railheadWear;
        return `位置：${position}<br>表面裂纹：${surfaceCrack}<br>轨头磨损：${railheadWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: surfaceCracks,
        type: 'line',
        name: '表面裂纹'
      }
    ]
  });
}
</script>

<style scoped>
.itemChart {
  height: 300px;
  width: 100%;
}
</style> -->




<!-- <template>
  <div class="itemChart" id="itChart"></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';
const $echarts: any = inject("echarts");
const data = ref([]);

async function loadData() {
  try {
    const response = await axios.get('http://localhost:5173/map/data.json');
    data.value = response.data.data;
    console.log('数据加载成功：', data.value);
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

onMounted(() => {
  loadData().then(() => {
    renderChart();
  });
});

function renderChart() {
  const positions = data.value.map(item => item.position);
  const surfaceCracks = data.value.map(item => item.surfaceCrack);

  const myChart = $echarts.init(document.getElementById('itChart'));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const dataIndex = params[0].dataIndex;
        const position = data.value[dataIndex].position;
        const surfaceCrack = data.value[dataIndex].surfaceCrack;
        const railheadWear = data.value[dataIndex].railheadWear;
        return `位置：${position}<br>表面裂纹：${surfaceCrack}<br>轨头磨损：${railheadWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: surfaceCracks,
      type: 'line'
    }]
  });
}
</script>

<style scoped>
.itemChart {
  height: 300px;
  width: 100%;
}
</style> -->


<!-- <template>
  <div class="itemChart" id="itChart">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';
const $echarts: any = inject("echarts");
const mapdata = ref({});

async function getState() {
  try {
    const response = await axios.get('http://localhost:5173/map/railways.json');
    mapdata.value = response.data;
    console.log('地图数据加载成功：', mapdata.value);
  } catch (error) {
    console.error('获取地图数据时出错：', error);
  }
}

onMounted(() => {
  getState().then(() => {
    $echarts.registerMap('railways', mapdata.value);
    const mychart = $echarts.init(document.getElementById('itChart'));
    mychart.setOption({
      geo: {
        map: 'railways',
        itemStyle: {
          areaColor: '#ead9ff',
          borderColor: '#223sjd',
          shadowColor: "rgba(230,130,70,0.5)",
        }
      },
    });
    console.log('ECharts 选项设置完成：', mychart.getOption());
  });
});
</script>

<style scoped>
.itemChart {
  height: 600px;
  width: 100%;
}
</style> -->

<!-- <template>
  <div class="itemChart" id="itChart"></div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';
const $echarts: any = inject("echarts");
const data = ref([]);

async function loadData() {
  try {
    const response = await axios.get('data.json');
    data.value = response.data.data;
    console.log('数据加载成功：', data.value);
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

onMounted(() => {
  loadData().then(() => {
    renderChart();
  });
});

function renderChart() {
  const positions = data.value.map(item => item.position);
  const surfaceCracks = data.value.map(item => item.surfaceCrack);

  const myChart = $echarts.init(document.getElementById('itChart'));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const dataIndex = params[0].dataIndex;
        const position = data.value[dataIndex].position;
        const surfaceCrack = data.value[dataIndex].surfaceCrack;
        const railheadWear = data.value[dataIndex].railheadWear;
        return `位置：${position}<br>表面裂纹：${surfaceCrack}<br>轨头磨损：${railheadWear}`;
      }
    },
    xAxis: {
      type: 'category',
      data: positions
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: surfaceCracks,
      type: 'line'
    }]
  });
}
</script>

<style scoped>
.itemChart {
  height: 400px;
  width: 100%;
}
</style> -->






<!-- <script setup lang="ts">
import axios from 'axios';
import { onMounted, ref, inject } from 'vue';
const $echarts: any = inject("echarts");
const mapdata = ref({});
const tooltipVisible = ref(false);

// 创建一个接口或类型来描述 tooltipData 对象的结构
interface TooltipData {
  name: string;
  info: string;
}

// 使用接口或类型来指定 tooltipData 对象的初始类型
const tooltipData = ref<TooltipData>({
  name: '',
  info: ''
});

async function getState() {
  try {
    const response = await axios.get('http://localhost:5173/map/railways.json');
    mapdata.value = response.data;
    console.log('地图数据加载成功：', mapdata.value);
  } catch (error) {
    console.error('获取地图数据时出错：', error);
  }
}

onMounted(() => {
  getState().then(() => {
    $echarts.registerMap('railways', mapdata.value);
    const mychart = $echarts.init(document.getElementById('itChart'));
    mychart.setOption({
      geo: {
        map: 'railways',
        itemStyle: {
          areaColor: '#F3F3F3',
          borderColor: '#CCCCCC',
          shadowColor: "rgba(230,130,70,0.5)",
        }
      },
    });

    mychart.on('click', (params: any) => {
      tooltipData.value = {
        name: params.name, // 根据实际数据结构获取区域名称
        info: '其他信息' // 根据实际数据结构获取其他信息
      };
      tooltipVisible.value = true;
    });

    console.log('ECharts 选项设置完成：', mychart.getOption());
  });
});
</script>


<template>
  <div class="itemChart" id="itChart">
  <slot></slot>
  <div class="tooltip" v-if="tooltipVisible">
  <p>区域名称: {{ tooltipData.name }}</p>
  <p>其他信息: {{ tooltipData.info }}</p>
  </div>
  </div>
  </template>

<style scoped>
.itemChart {
position: relative;
height: 400px;
width: 100%;
}

.tooltip {
position: absolute;
top: 20px;
left: 20px;
background-color: rgba(255, 255, 255, 0.9);
padding: 10px;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
z-index: 999;
}
</style> -->