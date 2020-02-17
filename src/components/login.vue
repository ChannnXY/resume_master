<template>
    <div class="login">
        <div class="login--wrapper">
            <div class="login--decoration"></div>
            <div class="login--text">欢迎登录</div>
            <el-input placeholder="请输入学号"
                        prefix-icon="el-icon-user"
                        v-model="formData.username"
                        class="login--input"></el-input>
            <el-input placeholder="请输入密码"
                        prefix-icon="el-icon-goods"
                        class="login--input"
                        v-model="formData.password"
                        show-password></el-input>
            <el-button type="primary"
                        @click="login"
                        round
                        size="small">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return {
            token:"",
            formData:{
                username:"",
                password:""
            }
        }
    },
    methods:{
        login(){
            this.$message({
                message:'登录成功',
                type:'success'
            })
            this.$emit('changeCom','index')
        }
    }
}
</script>

<style lang="scss" scoped>
    $theme:#5670C5;
    $primary:#5e5e5e;
    $background-url:url('../assets/loginBackground.png');

    .login{
        height: 100%;
        widows: 100%;
        background-image:$background-url;
        .login--wrapper{
            position: absolute;
            width: 400px;
            top: 50%;
            left: 25%;
            transform: translate(-50%,-50%);
        }

        .login--text{
            margin-bottom: 20px;
            font-size:36px;
            color: $primary;
        }

        .login--decoration{
            height: 6px;
            width: 140px;
            border-radius:4px;
            background: $theme;
            margin-bottom: 10px;
        }

        /deep/ .el-input__inner{
            color: $primary;
            background: #F7F4FB;
            border: none;
            margin: 10px 0;
            border-radius:30px;
        }

        .el-button{
            width: 160px;
            background-color: $theme;
            border: none;
            margin-top: 20px;
            &:hover{
                background: rgb(114, 135, 206)
            }
        }
    }

    
    
</style>