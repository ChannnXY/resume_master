<template>
    <el-container>
        <div class="drawer">
            <div class="drawer--wrapper"
                    :class="drawerClassName">

                <img src="http://via.placeholder.com/200x60" class="drawer--image"/>

                <el-menu default-active="1" :class="drawerClassName">
                  <el-submenu index="1-1">
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
            </div>  
        </div>
        
        <div class="container">
            <el-col class="container--wrapper"
                    :class="containerClassName">
                <div class="background"></div>

                <el-row class="header">
                    <el-col :span="2">
                        <span class="el-icon-s-unfold header--icon" 
                              @click="flags.showDrawerFlag = !flags.showDrawerFlag"></span>
                    </el-col>
                    <el-col :span="6" :offset="12">
                        <el-input v-model="searchText" class="header--input" size="small" @input="checkInput()">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </el-col>
                    <el-col :span="4" class="header--head">
                        <el-dropdown>
                            <div class="el-dropdown-link header--name">
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                                <span>陈同学</span>
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>

                <el-row class="tab">
                    <ul>
                        <li>思想素质</li>
                    </ul>
                </el-row>

                <el-row class="component">
                  <thCivilized style="height:75vh"></thCivilized>
                </el-row>
                
            </el-col>
        </div>
    </el-container>
</template>

<script>
import thCivilized from "./thCivilized";
import {debounceSync} from '../assets/utils/debounce'
export default {
    name:'index',
    components:{
        thCivilized
    },
    data(){
        return {
            flags:{showDrawerFlag:true},
            searchText:''
        }
    },
    methods:{
        // 退出登录
        logOut(){
            window.console.log(11)
            this.$confirm('您确定要退出登录吗', '页面提示', {
                confirmButtonText: '确定退出',
                cancelButtonText: '我点错了',
                type: 'info'
            }).then(() => {
                this.$emit('changeCom','login')
            }).catch(() => {});
        },
        checkInput(){
            debounceSync(window.console.log(this.searchText),2000);
        }
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

<style lang="scss">
    $theme:#5670C5;
    $background:#EAEFF3;

    .el-container{
        display: flex;
    }

    .drawer{
        .drawer--wrapper{
            height: 100vh;
            width: 15vw;
            background-color: white;
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

    .background{
        position: fixed;
        top: 0%;
        width: 100vw;
        height: 30vh;
        background: $theme;
    }
    
    .container{
        .container--wrapper{
            position: relative;
            left: 15vw;
        }

        .container--wrapper__full{
            left: 0;
            width: 100vw;
            transition: all 1s;
        }

        .container--wrapper__part{
            width: 85vw;
            transition: all 1s;
        }
    }

    .header{
        height: 8vh;
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
        .header--input{
            .el-input__inner{
                padding:0 10px;
                border: none;
                margin: 10px 0;
                border-radius:30px;
            }
        }
        .header--head{
            padding-right: 30px;
            display: flex;
            justify-content: flex-end;

            .header--name{
                display: flex;
                color: white;
                align-items: center;
            }

            .header--name>span{
                margin-right: 10px
            }
        }
    }

    .tab{
        margin:0 2vh 1vh 2vh;
        .el-tabs__header{
            margin: 0;
        }
        .el-tabs__header{
            margin: 0px;
        }
        .el-tabs__item.is-active{
            background: white;
            color: $theme;
        }
        .el-tabs__item{
            color: white;
        }
        .el-tabs--card>.el-tabs__header .el-tabs__nav{
            border-radius: 8px 8px 0 0;
            border: 2px solid white;
        }
    }

    .component{
        margin: 2vh;
    }
</style>