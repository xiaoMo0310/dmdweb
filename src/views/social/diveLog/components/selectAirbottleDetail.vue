<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>气瓶消耗</span>
      <el-button type="primary" size="small" style="float: right" @click="onReturn('homeAdvertiseFrom')">返回</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="第几个气瓶" align="center">
          <template slot-scope="scope">{{scope.row.airbottleNum}}</template>
        </el-table-column>
        <el-table-column label="气瓶消耗" align="center">
          <template slot-scope="scope">
            <p>开始量:{{scope.row.start}}{{scope.row.gasType | formatGastype}}</p>
            <p>结束量:{{scope.row.end}}{{scope.row.gasType | formatGastype}}</p>
            <p>剩余量:{{scope.row.residue}}{{scope.row.gasType | formatGastype}}</p>
          </template>
        </el-table-column>
        <el-table-column label="混合类型" align="center">
          <template slot-scope="scope">{{scope.row.mixtureType  | formatMixtureType}}</template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
  import {queryDiveLogAirbottleByDiveLogId} from '@/api/diveAirbottle';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    id: null,
  };

  export default {
    name: 'searchqueryDiveLogAirbottleByDiveLogId',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery), list: null,
        total: null,
        listLoading: false,
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatGastype(gastype){
        if(gastype===0){
          return "bar";
        }if(gastype===1){
          return 'psi';
        }
      },
      formatMixtureType(mixtureType){
        if(mixtureType===0){
          return "空气";
        }if(mixtureType===1){
          return '高氧';
        }if(mixtureType===2){
          return '氦氧氮混合';
        }
      },
    },
    methods: {
      getList() {
        this.listLoading = true;

          console.log(this.$route.params.id)
        queryDiveLogAirbottleByDiveLogId (this.$route.query.id).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          this.id = response.data.list.id;
        })
      },
      onReturn(){
          this.$router.back();
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>



