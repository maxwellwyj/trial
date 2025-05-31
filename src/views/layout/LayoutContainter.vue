<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Menu,
  Grid,
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
        ><!-- 样式设计 -->

        <el-sub-menu index="/interface">
          <template #title>
            <el-icon><Grid /></el-icon>
            <span>界面</span>
          </template>
          <el-menu-item index="/interface/One">
            <el-icon><Menu /></el-icon>
            <span>界面一</span>
          </el-menu-item>
          <el-menu-item index="/interface/Two">
            <el-icon><Menu /></el-icon>
            <span>界面二</span>
          </el-menu-item>
          <el-menu-item index="/interface/Three">
            <el-icon><Menu /></el-icon>
            <span>界面三</span>
          </el-menu-item>
          <el-menu-item index="/interface/Four">
            <el-icon><Menu /></el-icon>
            <span>界面四</span>
          </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>数据分类 </span> </el-menu-item
        ><!-- 1数据分类-->

        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>系统管理</span> </el-menu-item
        ><!--2系统管理-->

        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>个人中心</span> </template
          ><!-- 3个人中心 -->

          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>基本资料</span> </el-menu-item
          ><!--3.1基本资料 -->

          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>更换头像</span> </el-menu-item
          ><!--3.2更换头像-->

          <el-menu-item index="/user/SimulationScheme">
            <el-icon><EditPen /></el-icon>
            <span>模拟方案</span> </el-menu-item
          ><!--3.3模拟方案-->
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header
        ><!-- 页面头部内容 ，头像处实现-->
        <div>操作者：<strong>XXX</strong></div>
        <el-dropdown placement="bottom-end">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>数据由XXX提供</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  .el-aside {
    background-color: #232323;
    &__logo {
      height: 120px;
      background: url('@/assets/logo1.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown__box {
      display: flex;
      align-items: center;
      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }
  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
