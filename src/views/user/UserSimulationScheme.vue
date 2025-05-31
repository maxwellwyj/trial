<template>
  <!-- 为防止数据被误删，现在只是单向数据绑定 -->

  <div class="common-layout">
    <!-- 表格框架1-->
    <el-container class="frame1">
      <el-header style="color: #e18071">保存的方案</el-header
      ><!-- 布局-头部 -->

      <el-main
        ><!-- 布局-主体 -->
        <div class="flex1 justify-between mb-4">
          <el-input
            style="width: 240px"
            placeholder="关键字模糊搜索"
            :prefix-icon="Search"
            v-model="search"
          />
          <el-button type="primary" plain @click="addNewScheme">新增方案</el-button>
        </div>

        <el-table
        :data="filterTableData"
          highlight-current-row
          ref="multipleTableRef"
      
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="250px"
          max-height="250px"
          ><!-- 高亮选中行，边框，固定表头，流体高度 -->
          <el-table-column type="selection" width="40" />
          <!--1.方案名称  -->
          <el-table-column
            property="SchemeName"
            label="方案名称"
            sortable
            width="200px"
            header-align="center"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.SchemeName" style="width: 160px" />
              </template>
              <template v-else>
                {{ scope.row.SchemeName }}
              </template>
            </template>
          </el-table-column>
          <!-- 2.最长抢修时间 -->
          <el-table-column
            property="MaxRepairTime"
            label="最长抢修时间"
            sortable
            width="127px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.MaxRepairTime" style="width: 100px" />
              </template>
              <template v-else>
                {{ scope.row.MaxRepairTime }}
              </template>
            </template>
          </el-table-column>
          <!-- 3.工艺维修周期 -->
          <el-table-column
            property="ProcessMaintenanceIntervals"
            label="工艺维修周期"
            sortable
            width="127px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.ProcessMaintenanceIntervals" style="width: 100px" />
              </template>
              <template v-else>
                {{ scope.row.ProcessMaintenanceIntervals }}
              </template>
            </template>
          </el-table-column>
          <!-- 4.工艺天窗利用率 -->
          <el-table-column
            property="ProcessSkylightUtilization"
            label="工艺天窗利用率"
            sortable
            width="140px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.ProcessSkylightUtilization" style="width: 100px" />
              </template>
              <template v-else>
                {{ scope.row.ProcessSkylightUtilization }}
              </template>
            </template>
          </el-table-column>
          <!-- 5、设施建设成本 -->
          <el-table-column
            property="FacilityCosts"
            label="设施建设成本"
            sortable
            width="127px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.FacilityCosts" style="width: 100px" />
              </template>
              <template v-else>
                {{ scope.row.FacilityCosts }}
              </template>
            </template>
          </el-table-column>
          <!-- 6.设备使用成本 -->
          <el-table-column
            property="EquipmentCosts"
            label="设备使用成本"
            sortable
            width="127px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.EquipmentCosts" style="width: 100px" />
              </template>
              <template v-else>
                {{ scope.row.EquipmentCosts }}
              </template>
            </template>
          </el-table-column>
          <!-- 7.人工成本 -->
          <el-table-column
            property="LaborCosts"
            label="人工成本"
            sortable
            width="101px"
            header-align="left"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <template v-if="scope.row.editMode">
                <el-input v-model="scope.row.LaborCosts" style="width: 80px" />
              </template>
              <template v-else>
                {{ scope.row.LaborCosts }}
              </template>
            </template>
          </el-table-column>
          <!-- 8.操作 -->
          <el-table-column
            label="操作"
            width="161px"
            header-align="center"
            label-class-name="label-class-name"
          >
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.index, scope.row)"
                type="primary"
                round
              >
                {{ scope.row.editMode ? '保存' : '编辑' }}
              </el-button>
              <el-button size="small" @click="handleDelete(scope.index)" type="danger" round
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { ElTable } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface ProjectData {
  SchemeName: string
  MaxRepairTime: number
  ProcessMaintenanceIntervals: number
  ProcessSkylightUtilization: number
  FacilityCosts: number
  EquipmentCosts: number
  LaborCosts: number
  editMode: boolean /* 编辑模式 ，使得列表元素值为输入框或数据*/
}
// 搜索框数据绑定
const search = ref('')
// 多选表格相关数据和方法
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<ProjectData[]>([])
const toggleSelection = (rows?: ProjectData[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      multipleTableRef.value!.toggleRowSelection(row, true)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}

const handleSelectionChange = (val: ProjectData[]) => {
  multipleSelection.value = val
}
// 删除函数
const handleDelete = (index: number) => {
  tableData.splice(index, 1)
}
// 编辑函数
const handleEdit = (index: number, row: ProjectData) => {
  row.editMode = !row.editMode
}
// 新增方案函数
const addNewScheme=()=> {
    // 在index=0的位置插入一个空的projectData对象
     tableData.splice(0, 0, {
      SchemeName: '',
      MaxRepairTime:0,
      ProcessMaintenanceIntervals: 0,
      ProcessSkylightUtilization: 0,
      FacilityCosts: 0,
      EquipmentCosts: 0,
      LaborCosts: 0,
      editMode: true
    });
    // 将其他数据往后移动一位
    for (let i = 1; i < tableData.length; i++) {
      tableData[i].editMode = false;
    }
  }
// 搜索函数
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.SchemeName.toLowerCase().includes(search.value.toLowerCase())
  )
)
const tableData: ProjectData[] = reactive([
  {
    SchemeName: '成都局意见',
    MaxRepairTime: 2457,
    ProcessMaintenanceIntervals: 89,
    ProcessSkylightUtilization: 0.12,
    FacilityCosts: 27000,
    EquipmentCosts: 16830,
    LaborCosts: 1100,
    editMode: false
  },
  {
    SchemeName: '工可方案',
    MaxRepairTime: 3159,
    ProcessMaintenanceIntervals: 90,
    ProcessSkylightUtilization: 0.1,
    FacilityCosts: 47250,
    EquipmentCosts: 19890,
    LaborCosts: 1300,
    editMode: false
  },
  {
    SchemeName: '工可方案',
    MaxRepairTime: 2457,
    ProcessMaintenanceIntervals: 91,
    ProcessSkylightUtilization: 0.38,
    FacilityCosts: 47250,
    EquipmentCosts: 19890,
    LaborCosts: 1300,
    editMode: false
  }
])
</script>
<style>
.label-class-name {
  color: #5c656c;
  font-size: small;
}
.frame1 {
  border-style: solid;
  border-width: 1px;
}
.justify-between {
  justify-content: space-between;
}
.flex1 {
  display: flex;
}
</style>
