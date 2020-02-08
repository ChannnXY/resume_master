import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        tableData:[
            {itemId:23140,name:'大学一年级被列为入党积极分子',minGrade:0,maxGrade:20,grade:20,imageUrl:"https://channnxy.oss-cn-hangzhou.aliyuncs.com/bianlun.png"},
            {itemId:12421,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,grade:15,imageUrl:""},
            {itemId:21245,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,grade:18,imageUrl:"https://channnxy.oss-cn-hangzhou.aliyuncs.com/bianlun.png"},
            {itemId:12314,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,grade:15,imageUrl:""},
            {itemId:12233,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,grade:18,imageUrl:"https://channnxy.oss-cn-hangzhou.aliyuncs.com/bianlun.png"},],
    },
    getters:{

    },
    mutations:{
        setImageUrl(state,payload){
            let index = payload.index;
            let imageUrl = payload.imageUrl;
            state.tableData[index].imageUrl = imageUrl;
            window.console.log(state)
        },
        deleteImageUrl(state,payload){
            let index = payload;
            state.tableData[index].imageUrl = "";
            state.tableData[index].grade = 15;
        }
    }
})
