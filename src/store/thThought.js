import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        tableData:[
            {name:'大学一年级被列为入党积极分子',imageUrl:'',minGrade:10,maxGrade:15,defaultGrade:15},
            {name:'大学二年级被列入党员发展计划',imageUrl:'',minGrade:10,maxGrade:15,defaultGrade:15},
            {name:'大学二年级被列入党员发展计划',imageUrl:'',minGrade:10,maxGrade:15,defaultGrade:15},
            {name:'大学二年级被列入党员发展计划',imageUrl:'',minGrade:10,maxGrade:15,defaultGrade:15},
            {name:'大学二年级被列入党员发展计划',imageUrl:'',minGrade:10,maxGrade:15,defaultGrade:15},]
    }
})
