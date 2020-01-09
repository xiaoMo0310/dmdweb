<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="getList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="开始时间：">
            <el-date-picker
              v-model="listQuery.startTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker
              v-model="listQuery.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="操作用户" width="100" align="center">
          <template slot-scope="scope">{{scope.row.loginUser}}</template>
        </el-table-column>
        <el-table-column label="终端ip" width="180" align="center">
          <template slot-scope="scope">{{scope.row.ip}}</template>
        </el-table-column>
        <el-table-column label="接口" align="center">
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
        <el-table-column label="所做操作" width="180" align="center">
          <template slot-scope="scope">{{scope.row.operation}}</template>
        </el-table-column>
        <el-table-column label="所做操作" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import {getOperationLog} from '@/api/admin'
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        loginUser:null,
        ip:null,
        url:null,
        createTime: null,
        operation:null,
        startTime:null,
        endTime:null
    };
    export default {
        name: "operationLog",
        components:{},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
            }
        },
        created() {
            this.getList();
        },
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            //此方法是监听页面pageSize变化事件
            handleSizeChange(val){
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },

            //     this.$router.push({path: '/dmd/sendMessage', query: {id: row.id}})
            //     this.$router.push({name: 'batchAddMessage', params: {ids: ids}})
            //监听页面页数变化事件
            handleCurrentChange(val){
                this.listQuery.pageNum = val;
                this.getList();
            },
            //获取数据
            getList() {
                this.listLoading = true;
                getOperationLog(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                    this.listLoading = false;
                });
            },
            // freezeUser(id, status){
                // if(status == 1){
                //     this.$confirm('是否要进行该冻结操作?', '提示', {
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         let params = new URLSearchParams();
                //         params.append("status", 0)
                //         params.append("id",id);
                //         freezeUser(params).then(response=>{
                //             this.$message({
                //                 message: '冻结成功！',
                //                 type: 'success',
                //                 duration: 1000
                //             });
                //             this.getList();
                //         });
                //     })


        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


