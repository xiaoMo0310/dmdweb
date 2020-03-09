<template> 
  <div class="app-container">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
<!--
      <el-button size="small" type="primary" plain class="btn-add" @click="addShopLevelExplain()">添加说明</el-button>
-->
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="店铺等级说明" align="center">
          <div slot-scope="scope" v-html="scope.row.levelExplain">{{scope.row.ruledescription}}</div>
        </el-table-column>
        <el-table-column label="更新时间" width="200" align="center">
          <template slot-scope="scope">
            {{scope.row.updateTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="handUpdate(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
  import {findShopLevelExplain } from '@/api/shopLevelExplain';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
  };

  export default {
    name: 'searchintegrationRule',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
        formatTime(time){
            if(time==null){
                return 'N/A';
            }
            let replace = time.replace(/-/g, "/");
            let date = new Date(replace);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        },
    },
    methods: {
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDelete(index,row){
        this.deleteintegrationRule(row.id);
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        if(this.operateType===0){
          //删除
          this.deleteintegrationRule(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handUpdate(index,row){
        this.$router.push({path: '/ums/updateShopLevelExplain', query: {id: row.id}})
      },
      addShopLevelExplain(index,row){
        this.$router.push({path: '/ums/addShopLevelExplain'})
      },
      getList() {
        this.listLoading = true;
        findShopLevelExplain (this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.result.list;
          this.total = response.result.total;


        })
      },
      deleteintegrationRule(ids){
        this.$confirm('是否要删除该话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteintegrationRule(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


