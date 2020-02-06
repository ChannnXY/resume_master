<template>
    <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="加分项">
          </el-table-column>
          <el-table-column
            prop="defaultGrade"
            label="加分项"
            width="200">
              <template slot-scope="scope">
                <el-input-number  v-model="scope.row.defaultGrade"
                                  :min="scope.row.minGrade"
                                  :max="scope.row.maxGrade"
                                  size="small"></el-input-number>
                <!-- {{scope.row.defaultGrade}} -->
              </template>
          </el-table-column>
          <el-table-column
            label="证明"
            width="200">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleUpdate(scope.$index, scope.row)">
                上传凭证
              </el-button>
            </template>
          </el-table-column>
    </el-table>
</template>

<script>
import {store} from '../store/thThought';
export default {
  name: 'navBar',
  // Vuex 数据管理
  store:store,
  // 方法
  methods:{
    handleUpdate(index,row){
     window.console.log(index,row);
    }
  },
  // 计算属性
  computed:{
    tableData(){
      return this.$store.state.tableData;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
