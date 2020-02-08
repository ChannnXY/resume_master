import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        selectData:[
            {itemId:23140,name:'大学一年级被列为入党积极分子',minGrade:0,maxGrade:20,defaultGrade:20},
            {itemId:12421,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,defaultGrade:15},
            {itemId:21245,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,defaultGrade:18},
            {itemId:12314,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,defaultGrade:15},
            {itemId:12233,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:20,defaultGrade:18},],
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
