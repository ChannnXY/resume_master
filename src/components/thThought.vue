<template>
  <div>
    <el-row>
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <!-- 加分项 -->
          <el-table-column
            prop="name"
            label="加分项">
          </el-table-column>
          <!-- 分数 -->
          <el-table-column
            label="分数"
            width="200">
              <template slot-scope="scope">
                <el-input-number  v-model="scope.row.grade"
                                  :min="scope.row.minGrade"
                                  :max="scope.row.maxGrade"
                                  size="small"></el-input-number>
              </template>
          </el-table-column>
          <!-- 上传凭证 -->
          <el-table-column
            label="证明"
            width="200">
            <template slot-scope="scope">
              <!-- 图片上传按钮 -->
              <el-upload  action="http://192.168.137.1:3000/users/postImage"
                          :on-success="(res,file,fileList)=>uploadSuccess(res,file,fileList,scope.$index)"
                          :limit="1"
                          :show-file-list="false"
                          v-if="!scope.row.imageUrl">
                <el-button size="small" round slot="trigger">上传凭证</el-button>
              </el-upload>
              <!-- 图片预览按钮 -->
              <el-popover placement="left"
                          title="您确定要删除这张照片吗"
                          v-else>
                  <!-- 预览照片 -->
                  <el-image :src="scope.row.imageUrl"
                            fit="cover"
                            class="preview--image"></el-image>
                  <div style="text-align:right;margin-top:8px;">
                    <el-button size="mini" type="text" @click="visible = false" style="margin-right:20px">取消</el-button>
                    <el-button type="danger" size="mini" @click="previewDelete(scope.$index)">确定删除</el-button>
                  </div>
                  <el-button size="small" type="primary" slot="reference" round>预览照片</el-button>
                </el-popover>
            </template>
          </el-table-column>
      </el-table>
    </el-row>
    
    <el-row>
      <el-col :span="20">合计：{{multiGrade}}分</el-col>
      <el-col :span="4">
        <el-button type="primary">保存</el-button>
      </el-col>
    </el-row>
  </div>
    
</template>

<script>
import {store} from '../store/thThought';
export default {
  name: 'navBar',
  // Vuex 数据管理
  store:store,
  // 组件控制用到的数据
  data(){
    return {
      // 用户填写的数据
      name:"123124"
    }
  },
  // 方法
  methods:{
    //预览上传照片时确定删除照片
    previewDelete(index){
      this.$store.commit('deleteImageUrl',index)
    },
    //图片上传回调
    uploadSuccess(res,file,fileList,index){
      // file.raw 图片文件原始内容
      // index 自定义传参，上传的是哪一行的数据
      let payload = {
        imageUrl:res.data.imageUrl,
        index : index
      }
      this.$store.commit('setImageUrl',payload)
    }
  },
  // 计算属性
  computed:{
    tableData(){
      // return this.$store.getters.pushFlags;
      return this.$store.state.tableData;
    },
    multiGrade(){
      let data = this.$store.state.tableData;
      let result = 0;
      data.forEach( item =>{
        result += item.grade
      })
      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview--image{
  height: 300px;
  width: 400px;
}

.upload--button{
  border-radius: 20px;
  padding: 12px 24px;
  border: 1px solid #67c23a;
  color: #67c23a;
  font-size: 14px;
}

.upload--button:hover{
  background-color: #e6eee2
}

.upload--hidden{
  display: block;
  position: absolute;
  top: 12px;
  left: 9px;
  width: 110px;
  height: 40px;
  opacity: 0;
}
</style>
