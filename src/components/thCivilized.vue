<template>
<div>
    <el-row class="title--item">
      <el-col :span="18">加分项</el-col>
      <el-col :span="4">分数</el-col>
      <el-col :span="2">凭证</el-col>
    </el-row>
    <el-row v-if="selectItems.length>0">
        <transition-group name="table">
            <el-row  v-for="(userItem,userIndex) in selectItems" :key="userIndex">
                <el-col :span="18">
                    <i class="el-icon-remove-outline" style="color:rgb(250,140,140;margin-right:10px;" @click="removeSelectItem(userIndex)"></i>
                    <el-select v-model="userItem.itemId" filterable placeholder="请选择" @change="onSelectChange($event,userIndex)">
                        <el-option
                        v-for="(optItem,optIndex) in selectOption"
                        :key="optIndex"
                        :label="optItem.name"
                        :value="optItem.itemId">
                        </el-option>
                    </el-select>
                </el-col>
                
                <el-col :span="4">
                    <el-input-number    v-model="userItem.grade" size="small"></el-input-number>
                </el-col>
                
                <el-col :span="2">
                    <el-upload  action="http://192.168.137.1:3000/users/postImage"
                                    :on-success="(res,file,fileList)=>uploadSuccess(res,file,fileList,userIndex)"
                                    :limit="1"
                                    :show-file-list="false"
                                    v-show="!userItem.imageUrl">
                        <el-button size="small" round slot="trigger">上传凭证</el-button>
                        </el-upload>
                        <!-- 图片预览按钮 -->
                        <el-popover placement="left"
                                    v-model="visible"
                                    title="点击确认删除可以删除本照片"
                                    v-show="userItem.imageUrl">
                            <!-- 预览照片 -->
                            <el-image :src="userItem.imageUrl"
                                    fit="cover"
                                    class="preview--image"></el-image>
                            <div style="text-align:right;margin-top:8px;">
                                <el-button size="mini" type="text" @click="visible = false" style="margin-right:20px">取消</el-button>
                                <el-button type="danger" size="mini" @click="visible = false;previewDelete(userIndex)">确定删除</el-button>
                            </div>
                            <el-button size="small" type="primary" slot="reference" round>预览照片</el-button>
                        </el-popover>
                </el-col>
            </el-row>
        </transition-group>
    </el-row>
    <el-row v-else>
      <el-col :span="24" class="tableData__null">点击添加记录添加第一条数据ᕦ(･ㅂ･)ᕤ</el-col>
    </el-row>
    <el-row>
      <el-col :span="20">合计:<span style="margin:10px;color:#409EFF">{{partGrade}}</span>分</el-col>
      <el-col :span="2">
          <el-button round size="small" @click="addSelectItem">
              添加记录
          </el-button>
      </el-col>
      <el-col :span="2">
          <el-button type="primary" round size="small" @click="submitSelectItem">
              保存记录
          </el-button>
      </el-col>
    </el-row>
</div>
      
</template>

<script>
import { store } from "../store/thCililized";
export default {
    name:'thCivilized',
    store:store,
    data(){
        return{
            visible:false
        }
    },
    computed:{
        selectOption(){
            return this.$store.state.selectOption;
        },
        selectItems(){
            return this.$store.state.selectItems;
        },
        partGrade(){
            let result = 15;
            this.$store.state.selectItems.forEach(item=>{
                result += item.grade ? item.grade :0 ;
            })
            return result;
        }
    },
    methods:{
        onSelectChange(itemId,index){
            let payload = {index:index,itemId:itemId}
            this.$store.commit('onSelectChange',payload)
        },
        uploadSuccess(res,file,fileList,index){
            // file.raw 图片文件原始内容
            // index 自定义传参，上传的是哪一行的数据
            this.$message({
                message:'上传成功',
                type:'success'});
            let imageUrl = res.data.imageUrl
            let payload = {index:index,imageUrl:imageUrl}
            this.$store.commit('uploadSuccess',payload)
        },
        previewDelete(index){
            this.$store.commit('previewDelete',index)
        },
        addSelectItem(){
            this.$store.commit('addSelectItem')
        },
        removeSelectItem(index){
            this.visible=false
            this.$store.commit('removeSelectItem',index)
        },
        submitSelectItem(){
            if(this.isEmpty(this.$store.state.selectItems)){
                this.$message.error('请填写完整');
            }else{
                this.$store.commit('submitSelectItem',this);
            }
        },
        isEmpty(obj){
            let flag = false;
            for(let key in obj){
                switch(typeof obj[key]){
                    case 'string':{
                        if (obj[key].length === 0) flag = true;
                        break;
                    }
                    case 'undefined':{
                        flag = true;
                        break;
                    }
                    case 'object':{
                        flag = this.isEmpty(obj[key])
                        break;
                    }
                }
            }
            return flag;
        }
    }
}
</script>

<style scoped>

.el-row{
    margin: 10px;
}
.el-select{
    width: 100%;
}
.el-col-18{
    display: flex;
    align-items: center;
}
.el-col-4,.el-col-2{
    text-align: center;
    justify-content: flex-end;
}
.tableData__null{
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    color: #909399;
    font-size: 14px;
}
.preview--image{
  height: 300px;
  width: 400px;
}
.title--item{
    text-align: left;
    white-space: nowrap;
    color: #909399;
    font-size: 12px;
    font-weight: bold;
    line-height: 40px;
}
.table-enter-active .table-leave-active{
    opacity: 0;
}
.table-enter-active .table-enter-active{
  transition: all .3s ease;
}
</style>