<template>
  <el-container>
    <el-header height="48px">
      <!-- xs<768 sm>=768 md>=992 lg>=1200 cl>=1920 -->
      <el-col :span="12" class="el-header--title">
        <i class="el-icon-s-order el-header--icon"></i>
        <span>智能综测填写管理系统</span>
      </el-col>
      <!-- 在手机环境下隐藏 -->
      <el-col :span="12" class="hidden-sm-and-down el-header--name">
        <span style="margin-right:20px">陈同学，你好</span>
        <el-button type="primary" size="small">登出</el-button>
      </el-col>
    </el-header>
    <!-- 侧边栏 -->
    <el-row class="hidden-sm-and-down">
      <el-col :span="3">
        <el-menu default-active="1"
                  @select="openMenu">
          <el-submenu index="1">
            <!-- 综测总览 -->
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>结果总览</span>
            </template>
            <el-menu-item-group index="1-1">
              <el-menu-item index="1-1-1">结果核对</el-menu-item>
              <el-menu-item index="1-1-2">奖项公示</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 思想素质 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>思想素质</span>
            </template>
            <el-menu-item-group index="2-1">
              <el-menu-item index="thThought">思想表现</el-menu-item>
              <el-menu-item index="thCivilized">文明守纪</el-menu-item>
              <el-menu-item index="2-1-3">学习态度</el-menu-item>
              <el-menu-item index="2-1-4">社会工作</el-menu-item>
              <el-menu-item index="2-1-5">社会责任</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 发展能力 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>发展能力</span>
            </template>
            <el-menu-item-group index="3-1">
              <el-menu-item index="3-1-1">自主学习</el-menu-item>
              <el-menu-item index="3-1-2">实践创新</el-menu-item>
              <el-menu-item index="3-1-3">组织交流</el-menu-item>
              <el-menu-item index="3-1-4">创新创业</el-menu-item>
              <el-menu-item index="3-1-5">文体特长</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 其他内容 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>其他内容</span>
            </template>
            <el-menu-item-group index="3-1">
              <el-menu-item index="3-1-1">必填选项</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>

      <el-col :span="21">
        <!-- <thThought></thThought> -->
        <component :is="componentName"></component>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import thCivilized from './thCivilized';

export default {
  name: 'navBar',
  // compenont
  components:{
    // 思想表现
    thCivilized
  },
  // 指定传入的参数，键值对形式指定类型
  data() {
      return {
        flag:{aside:false},
        componentName:"thCivilized"
      }
  },
  // 方法
  methods:{
    flagController(name) {
      this.flag[`${name}`] = !this.flag[`${name}`];
    },
    // 选择菜单项
    openMenu(indexName) {
      this.componentName = indexName;
    },
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header{
    display: flex;
    align-items: center;
  }

  .el-aside{
    background-color: #545c64;
    height: 100%;
  }

  .el-header--title{
    display: flex;
    align-items: center;
    }
  
  .el-header--icon{
    font-size: 24px;
    color: #409EFF;
    margin-right: 12px;
  }

  .el-header--name{
    text-align: right;
  }
</style>
