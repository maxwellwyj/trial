<template>
    <div>
      <div class="chart-container">
        <canvas ref="chart" id="chart" class="chart"></canvas>
      </div>
      <div class="other-content">
      </div>
    </div>
  </template>



<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';

interface ChartDataItem {
  iteration: number;
  solution: number;
  populationMean: number;
}

interface ChartData {
  data: ChartDataItem[];
}

const chart = ref<echarts.ECharts | null>(null);
const chartData = ref<ChartData | null>(null);


async function loadData() {
  try {
    const response = await axios.get<any>('http://localhost:5173/public/map/answer.json');
    const responseData = response?.data?.data??[];
    if (Array.isArray(responseData)) {
      chartData.value = transformData(responseData);
      console.log('数据加载成功：', chartData.value);
      createChart(); // 在数据加载成功后创建图表
    } else {
      console.error('服务器返回的数据不是一个有效的数组:', responseData);
    }
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

function transformData(objData: any): { data: ChartDataItem[] } {
  const transformedData: ChartDataItem[] = [];

  for (const item of objData) {
    const railData: ChartDataItem = {
      iteration: item.iteration,
      solution: item.solution,
      populationMean: item.populationMean,
    };

    transformedData.push(railData);
  }

  return { data: transformedData };
}

const createChart = () => {
  const chartElement = document.querySelector('#chart') as HTMLCanvasElement;
  const iterations = chartData.value?.data.map(item => item.iteration) || [];
  const solutions = chartData.value?.data.map(item => item.solution) || [];
  const populationMeans = chartData.value?.data.map(item => item.populationMean) || [];

  if (chartElement) {
    chart.value = echarts.init(chartElement, null, {
      devicePixelRatio: 2, // 增加像素比例
    });
    chart.value.setOption({
      xAxis: {
        type: 'category',
        data: iterations.map(String),
        
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'line',
          name: '解决方案',
          data: solutions,
          lineStyle: {
            color: 'rgb(75, 192, 192)',
            type: 'solid',
            width: 1.5,
          },

          emphasis: {
            focus: 'series',
          },
        },
        {
          type: 'line',
          name: '种群平均值',
          data: populationMeans,
          lineStyle: {
            color: 'rgb(192, 75, 75)',
            type: 'dashed', 
            width: 1.5,
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
    });
  }
};

onMounted(() => {
  loadData();
  createChart();
});
</script>

<style scoped>
.chart-container {
  width: 400px;
  height: 400px;
  float: left;
}
.chart{
    width: 100%;
    height: 400px;
}
/* 其他样式 */
</style>
  