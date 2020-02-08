import Vue from  'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        selectOption:[
            {itemId:23140,name:'大学一年级被列为入党积极分子',minGrade:0,maxGrade:2,defaultGrade:20},
            {itemId:12421,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:3,defaultGrade:15},
            {itemId:21245,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:1,defaultGrade:18},
            {itemId:12314,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:1,defaultGrade:15},
            {itemId:12233,name:'大学二年级被列入党员发展计划',minGrade:0,maxGrade:4,defaultGrade:18},],
        selectItems:[]
    },
    getters:{
    },
    mutations:{
        addSelectItem(state){
            let itemData = {
                itemId:state.selectOption[0].itemId,
                imageUrl:"",
                grade:state.selectOption[0].maxGrade
            }
            state.selectItems.push(itemData)
        },
        previewDelete(state,index){
            state.selectItems[index].imageUrl = "";
        },
        uploadSuccess(state,payload){
            state.selectItems[payload.index].imageUrl = payload.imageUrl;
        },
        onSelectChange(state,payload){
            state.selectOption.forEach((item)=>{
                if(item.itemId === payload.itemId){
                    let itemData = {
                        itemId:payload.itemId,
                        imageUrl:"",
                        grade:item.maxGrade,
                    }
                    state.selectItems[payload.index] = itemData
                }
            })
        },
        removeSelectItem(state,index){
            state.selectItems.splice(index,1)
        },
        submitSelectItem(state,_this){
            _this.$message({message:'上传成功',type:'success'})
            window.console.log(state.selectItems);
            return true;
        }
    }
})
