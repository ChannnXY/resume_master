import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        tableData:[
            {itemId:23140,name:'大学一年级被列为入党积极分子',minGrade:10,maxGrade:15,defaultGrade:15},
            {itemId:12421,name:'大学二年级被列入党员发展计划',minGrade:10,maxGrade:15,defaultGrade:15},
            {itemId:21245,name:'大学二年级被列入党员发展计划',minGrade:10,maxGrade:15,defaultGrade:15},
            {itemId:12314,name:'大学二年级被列入党员发展计划',minGrade:10,maxGrade:15,defaultGrade:15},
            {itemId:12233,name:'大学二年级被列入党员发展计划',minGrade:10,maxGrade:15,defaultGrade:15},]
    },
    getters:{
        pushFlags:(state) =>{
            let tableData = new Array();
            state.tableData.map( (item,index)=>{
                item.url = index % 2 == 0 ? "" : "https://channnxy.oss-cn-hangzhou.aliyuncs.com/bianlun.png"
                item.ischecked = index % 2 == 0 ? true : false;
                tableData.push(item);
            })
            window.console.log(tableData);
            return tableData;
        }
    },
    mutations:{
        setImageUrl:(state,payload)=>{
            window.console.log(payload);
            let imageUrl = payload.payload;
            state.tableData[0].url = imageUrl;
            state.tableData[0].ischecked = Boolean(state.tableData[0].url);
        }
    }
})
