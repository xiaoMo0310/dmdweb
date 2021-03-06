<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>证书列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加证书</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="certificateTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="证书中文名称" width="200"  align="center">
          <template slot-scope="scope">{{scope.row.chineseName}}</template>
        </el-table-column>
        <el-table-column label="证书英文名称" width="320 " align="center">
          <template slot-scope="scope">{{scope.row.englishName}}</template>
        </el-table-column>
        <el-table-column label="证书等级" align="center">
          <template slot-scope="scope">{{scope.row.certificateLevel}}</template>
        </el-table-column>
        <el-table-column label="简写名称" align="center">
          <template slot-scope="scope">{{scope.row.englishShorthand}}</template>
        </el-table-column>
        <el-table-column label="简介" align="center" width="370">
          <template slot-scope="scope">{{scope.row.introduction}}</template>
        </el-table-column>
        <el-table-column label="证书图片" width="150" align="center">
          <template slot-scope="scope"><img preview="1" style="height: 80px" :src="scope.row.pic"/></template>
        </el-table-column>
        <!--<el-table-column label="启动/禁用" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateStatus(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="2"
              v-model="scope.row.status" disabled>
            </el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[4,8,12]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,saveOrUpdate,deletePmsCertificate} from '@/api/certificate';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 4,
    id: null,
    status: null,
  };

  export default {
    name: 'homeAdvertiseList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(type){
        if(type===1){
          return 'APP首页轮播';
        }else{
          return 'PC首页轮播';
        }
      },
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
      handleUpdateStatus(index,row){
        this.listQuery.id= row .id;
        this.listQuery.status = row.status;
        this.$confirm('是否要修改启用/禁用状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          saveOrUpdate(this.listQuery).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消操作!'
          });
          this.getList();
        });
      },
      handleAdd(){
        this.$router.push({path: '/pms/addCertificate', query: {total: this.total}})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/pms/updateCertificate', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.result.list;
          this.total = response.result.total;
        })
      },
      handleDelete(index,row){
          this.deletePmsCertificate(row.id);
      },
      deletePmsCertificate(ids){
          this.$confirm('是否要删除该证书信息?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              let params=new URLSearchParams();
              params.append("ids",ids);
              deletePmsCertificate(params).then(response=>{
                  this.getList();
                  if(response.code === 500){
                      this.$message({
                          type: 'error',
                          message: response.message
                      });
                  }else {
                      this.$message({
                          type: 'success',
                          message: '删除成功!'
                      });
                  }

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
  .app-container {
    width: 100%;
    margin-bottom: 50px;
  }
</style>


