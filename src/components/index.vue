<template>
    <el-container>
        <div class="drawer">
            <el-col class="drawer--wrapper"
                    :class="drawerClassName">

                <img src="http://via.placeholder.com/200x60" class="drawer--image"/>

                <el-menu default-active="1" :class="drawerClassName">
                  <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>个人信息</span>
                    </template>
                    <el-menu-item index="1-1">成绩总览</el-menu-item>
                    <el-menu-item index="1-2">核对成绩</el-menu-item>
                    <el-menu-item index="1-3">账号信息</el-menu-item>
                  </el-submenu>

                  <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-edit"></i>
                        <span>综测填写</span>
                    </template>
                    <el-menu-item index="2-1">思想表现</el-menu-item>
                    <el-menu-item index="2-2">发展能力</el-menu-item>
                    <el-menu-item index="2-3">其他必填</el-menu-item>
                  </el-submenu>

                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>审核管理</span>
                    </template>
                    <el-menu-item index="3-1">审核综测成绩</el-menu-item>
                    <el-menu-item index="3-2">发布班级通知</el-menu-item>
                    <el-menu-item index="3-3">修改加分项</el-menu-item>
                    <el-menu-item index="3-4">管理班级成员</el-menu-item>
                </el-submenu>
                </el-menu>
            </el-col>  
        </div>
        
        <div class="container">
            <el-col class="container--wrapper"
                    :class="containerClassName">
                <el-row class="header">
                    <el-col :span="9">
                        <span class="el-icon-s-unfold header--icon" 
                              @click="flags.showDrawerFlag = !flags.showDrawerFlag"></span>
                    </el-col>
                    <el-col :span="6">
                        <el-input></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-dropdown>
                            <el-container class="el-dropdown-link">
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                <span>陈同学</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-container>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-col>
        </div>
        
    </el-container>
</template>

<script>
export default {
    name:'index',
    data(){
        return {
            flags:{showDrawerFlag:true}
        }
    },
    methods:{
    },
    computed:{
        containerClassName(){
            let result = this.flags.showDrawerFlag ? 
                        'container--wrapper__part' :
                        'container--wrapper__full'
            return result
        },
        drawerClassName(){
            let result = this.flags.showDrawerFlag ? 
                        'drawer--wrapper__full' :
                        'drawer--wrapper__part'
            return result
        }
    }
}
</script>

<style lang="scss" scoped>
    $theme:#5670C5;

    /deep/ .el-container{
        display: flex;
    }

    .drawer{
        .drawer--wrapper{
            height: 100vh;
            width: 15vw;
            position: fixed;
            top:0%;
        }
        
        .drawer--wrapper__full{
            width: 15vw;
            transition: all 1s;
        }

        .drawer--wrapper__part{
            width: 0vw;
            opacity: 0;
            transition: all 1s;
        }

        .drawer--image{
            width: 100%;
            height: 80px;
        }
    }
    
    .container{
        .container--wrapper{
            position: relative;
            left: 15vw;
            height: 130vh;
            background-color: red
        }

        .container--wrapper__full{
            width: 100vw;
            transition: all 1s;
        }

        .container--wrapper__part{
            width: 85vw;
            transition: all 1s;
        }
    }

    .header{
        height: 64px;
        display: flex;
        align-items: center;
        .header--icon{
            font-size: 24px;
            color: white;
            margin-left: 24px;

            &:hover{
                opacity: 0.8;
            }
        }
        
    }
</style>