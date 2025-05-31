<template>
  <div>
    <section class="charts">
      <ItemPage :selectedData="selectedData" />
    </section>
    <section class="containter">
      <!-- <section class="itemleft"><ItemOne :modelValue="itemOneProps.modelValue"></ItemOne></section> -->
      <section class="itemleft">
        <div>
          <!-- 时间选择器 -->
          <div class="dateSelector">
            <label for="datePicker">选择日期：</label>
            <input type="date" id="datePicker" v-model="selectedDate" @input="handleDateChange" />
          </div>
          <div class="search">
            <div class="positionInput">
              <label for="positionInput">位置：</label>
              <input type="text" id="positionInput" v-model="selectedPosition" @input="handlePositionInput" />
            </div>
          </div>
          <div class="selectedData">
            <div>
              <label for="surfaceCrackData">表面裂纹数据：</label>
              <input type="text" id="surfaceCrackData" v-model="selectedSurfaceCrackData" readonly />
            </div>
            <div>
              <label for="trackWearData">轨头磨损数据：</label>
              <input type="text" id="trackWearData" v-model="selectedTrackWearData" readonly />
            </div>
          </div>
        </div>
      </section>
      <section class="itemcenter">
        <ItemTwo />
      </section>
      <section class="itemright">
        <ItemThree :selectedDate="selectedDate" />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { nextTick, onMounted, ref, watch } from 'vue';
import ItemTwo from '@/components/itemTwo.vue';
import ItemThree from '@/components/itemThree.vue';
import ItemPage from '@/components/itemPage.vue';

// 定义数据类型和接口
interface Measurement {
  position: number;
  surfaceCrack: number;
  railheadWear: number;
  surfaceWear: number;
}

interface RailData {
  date: string;
  measurements: Measurement[];
}

interface SelectedData {
  selectedDate: string;
  measurements: Measurement[];
}

// 数据引用和初始化
const data = ref<RailData[]>([]);
const selectedDate = ref<string>('');
const selectedData = ref<SelectedData>({
  selectedDate: '',
  measurements: [],
});

const selectedPosition = ref<number>(0);
const selectedSurfaceCrackData = ref<number>(0);
const selectedTrackWearData = ref<number>(0);

async function loadData() {
  try {
    const response = await axios.get<any>('http://localhost:5173/map/mapdata.json');
    const responseData = response?.data?.data ?? [];
    if (Array.isArray(responseData)) {
      data.value = transformData(responseData);
      console.log('数据加载成功：', data.value);
      // 默认选择第一个日期
      if (data.value.length > 0) {
        selectedDate.value = data.value[0].date;
        extractSelectedData();
      }
    } else {
      console.error('服务器返回的数据不是一个有效的数组:', responseData);
    }
  } catch (error) {
    console.error('加载数据时出错：', error);
  }
}

function transformData(objData: any): RailData[] {
  const transformedData: RailData[] = [];

  for (const item of objData) {
    const railData: RailData = {
      date: item.date,
      measurements: item.measurements,
    };

    transformedData.push(railData);
  }

  return transformedData;
}

function getSelectedRailData(date: string): RailData | null {
  for (const railData of data.value) {
    if (railData.date === date) {
      return railData;
    }
  }
  return null;
}

// 提取选择的日期对应的数据
function extractSelectedData() {
  const selectedRailData = getSelectedRailData(selectedDate.value);
  if (selectedRailData) {
    selectedData.value.measurements = [...selectedRailData.measurements];
    selectedData.value.selectedDate = selectedDate.value;
    
    // 获取当前选择位置的相关数据
    handlePositionInput();
  } else {
    selectedData.value.measurements = [];
    selectedData.value.selectedDate = '';
  }
}

// 组件挂载后加载数据并提取选择的日期对应的数据
onMounted(() => {
  loadData();
});

// 监听选择的日期变化，提取对应日期的数据
watch(selectedDate, () => {
  extractSelectedData();
});

// 处理位置输入框的值变化
function handlePositionInput() {
  const position = parseInt(selectedPosition.value.toString(), 10);
  const measurement = selectedData.value.measurements.find((m) => m.position === position);
  if (measurement) {
    selectedSurfaceCrackData.value = measurement.surfaceCrack;
    selectedTrackWearData.value = measurement.railheadWear;
  } else {
    selectedSurfaceCrackData.value = 0;
    selectedTrackWearData.value = 0;
  }
}

// 处理日期变化事件
function handleDateChange(event: Event) {
  const newDate = (event.target as HTMLInputElement).value;
  selectedDate.value = newDate;
  selectedData.value.selectedDate = selectedDate.value;
  console.log('选择的日期：', selectedDate.value);
  extractSelectedData();
  nextTick(() => {
    console.log(selectedData.value);
  });
}

</script>

<style>
.charts {
  width: 1200px;
  height: 600px;
}

.containter {
  display: flex;

  .itemleft {
    flex: 3;
  }

  .itemcenter {
    flex: 6;
  }

  .itemright {
    flex: 5;
  }
}
.dateSelector {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.dateSelector label {
  margin-right: 10px;
}

.search {
  margin-bottom: 10px;
}

.positionInput {
  display: flex;
  align-items: center;
}

.positionInput label {
  margin-right: 10px;
}

.selectedData {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.selectedData div {
  margin-bottom: 10px;
}
</style>
