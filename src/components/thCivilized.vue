<template>
<div class="wrapper">
    <el-row class="title--item">
      <el-col :span="18" style="padding-left:16px">加分项</el-col>
      <el-col :span="4">分数</el-col>
      <el-col :span="2">凭证</el-col>
    </el-row>
    <el-row v-if="selectItems.length>0">
        <transition-group name="table" tag="div">
            <el-row  v-for="(userItem,userIndex) in selectItems" :key="userIndex" class="table-item">
                <el-col :span="18">
                    <i class="el-icon-remove-outline" style="color:rgb(250,140,140);margin-right:10px;" @click="removeSelectItem(userIndex)"></i>
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
                    <!-- <el-upload  action=""
                                :http-request="uploadFile(userIndex)"
                                :on-success="(res,file,fileList)=>uploadSuccess(res,file,fileList,userIndex)"
                                :limit="1"
                                :show-file-list="false"
                                v-show="!userItem.imageUrl">
                        <el-button size="small" round slot="trigger">上传凭证</el-button>
                    </el-upload> -->
                    <div v-show="!userItem.imageUrl">
                        <input type="file"
                            @change="uploadFile(userIndex)"
                            ref="inputFile"
                            class="input__hide"/>
                        <el-button size="small" round slot="trigger">上传凭证</el-button>
                    </div>
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
    <el-row v-else @click="addSelectItem">
      <el-col :span="24" class="tableData__null">点击添加记录添加第一条数据ᕦ(･ㅂ･)ᕤ</el-col>
    </el-row>
    <el-row class="result--bar">
      <el-col :span="20" class="result--number">合计:<span style="margin:10px;color:#409EFF">{{partGrade}}</span>分</el-col>
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
import { $post,$get } from "../assets/utils/ajax";
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
                result += item.grade ? item.grade : 0 ;
            })
            return result > 20 ? 20 : result;
        },
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
            let imageUrl = res.data.src
            let payload = {index:index,imageUrl:imageUrl}
            this.$store.commit('uploadSuccess',payload)
        },
        uploadFile(index){
            // 文件上传
            let limitType = ['image/jpeg','image/png','image/gif','video/mp4'];
            let limitSize = 1024*1024*1024; // 最大上传1G
            let sliceSize = 5*1024*1024; // 5MB 以上切片上传
            let file = this.$refs.inputFile[0].files[0];
            // 控制文件格式
            if(!limitType.includes(file.type)){
                this.$message({
                            message:'只能上传png，jpeg，gif和mp4',
                            type:'warning'});
                this.$refs.inputFile[0].value = "";
                return;
            }
            // 控制文件大小，决定上传方式
            if(file.size > limitSize){
                this.$message({
                            message:'文件最大上传1GB',
                            type:'warning'});
                this.$refs.inputFile[0].value = "";
                return;
            }else if(file.size < limitSize && file.size > sliceSize){
                this.uploadFileSlice(file,index)
            }else{
                this.uploadFileDirectly(file,index)
            }
        },
        // 切片上传
        async uploadFileSlice(file,index){
            window.console.log('切片上传',file,index)
            let fileChunkList = this.createChunkFile(file,5);
            
            fileChunkList = fileChunkList.map( item => {
                const data = new FormData();
                data.append('chunk',item.chunk);
                data.append('filename',item.name);
                return $post({
                        url:"http://192.168.137.1:3000/users/postImageChunk",
                        data:data
                    }).then( res =>{
                        window.console.log(res)
                        if(res.code === 200) {
                            return Promise.resolve(res)
                        }else{
                            return Promise.reject(res)
                        }
                    })
            });
            // 合并切片,5个返回的promise对象状态都是resolve的时候
            await Promise.all(fileChunkList).then(() =>{
                $get({
                    url:"http://192.168.137.1:3000/users/merge?filename="+file.name,
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    }
                }).then( res =>{
                    window.console.log(res)
                })
            })
        },
        // 生成文件切片
        createChunkFile(file,chunkNum){
            const fileChunkList = [];
            let cur = 0, i = 0, chunkSize = file.size/chunkNum;
            while(i < chunkNum){
                fileChunkList.push({
                    chunk:file.slice(cur,cur+chunkSize),
                    name:this.modifyFileName(file.name,i++)});
                cur += chunkSize;
            }
            return fileChunkList;
        },
        // 生成hash文件名
        modifyFileName(filename,index){
            let dotIndex = filename.lastIndexOf('.'),
                name = filename.substring(0,dotIndex),
                suffix = filename.substring(dotIndex);
            return name+'-'+index+suffix;
        },
        // 直接上传
        uploadFileDirectly(file,index){
            window.console.log('直接上传',file.size)
            let data = new FormData();
            data.append('chunk',file);
            data.append('filename',file.name)
            $post({
                url:'http://192.168.137.1:3000/users/postImageDirectory',
                data:data
            }).then( res =>{
                this.uploadSuccess(res,null,null,index)
            })
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

<style lang="scss" scoped>
$theme:#5670C5;

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
    line-height: 30px;
}

.table-item {
    margin: 10px;
    transition: all 500ms;
    .input__hide{
        position: absolute;
        top: 0;
        right: 10px;
        opacity: 0;
        height: 30px;
        width: 80px;
    }
}

.table-enter, .table-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.result--bar{
    position: absolute;
    bottom: 8px;
    width: 100%;
    .result--number{
        padding-left: 16px;
        color: #5e5e5e;
    }
}

.wrapper{
    background-color: white;
    border-radius:8px;
    padding-bottom: 50px;
}

</style>