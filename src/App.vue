<script setup lang=ts>
import { provide } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios';

// 使用 setup() 函数提供 echarts 实例

provide('echarts', echarts);
provide('axios', axios);


//设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888';
</script>

<template>
  <div>
    <!--App.vue只需要一个路由出口-->
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
