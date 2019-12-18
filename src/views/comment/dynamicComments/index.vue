<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
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
          <el-form-item label="文章内容：">
            <el-input v-model="listQuery.content" class="input-width" placeholder="文章内容"></el-input>
          </el-form-item>
          <el-form-item label="按照动态ID查询：">
            <el-input v-model="listQuery.forDynamicId" class="input-width" placeholder="动态ID"></el-input>
          </el-form-item>
          <el-form-item label="发布起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.stratTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="按照日志ID查询：">
            <el-input v-model="listQuery.forDiveLogId" class="input-width" placeholder="日志ID"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称查询">
            <el-input v-model="listQuery.commentName" class="input-width" placeholder="用户昵称查询"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>

    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="评论id" width="70" align="center">
          <template slot-scope="scope">{{scope.row.commentId}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="70">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="动态ID" align="center" width="70">
          <template slot-scope="scope">{{scope.row.forDynamicId}}</template>
        </el-table-column>
        <el-table-column label="评论人昵称" align="center" width="100">
          <template slot-scope="scope">{{scope.row.commentName}}</template>
        </el-table-column>
        <el-table-column label="评论人角色" align="center" width="100">
          <template slot-scope="scope">{{scope.row.userType | formatUserType}}</template>
        </el-table-column>
        <el-table-column label="评论时间" width="170" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="评论内容" width="280" align="center">
          <template slot-scope="scope">{{scope.row.content | count}}</template>
        </el-table-column>
        <el-table-column label="分类" align="center" width="100">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
        <!--<el-table-column label="IP地址" align="center" width="130">
          <template slot-scope="scope">{{scope.row.ipAddress}}</template>
        </el-table-column>-->
        <el-table-column label="评论状态" align="center" width="100">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>

        <!--<el-table-column label="回复的日志ID" align="center" width="70">
          <template slot-scope="scope">{{scope.row.forDiveLogId}}</template>
        </el-table-column>-->

        <el-table-column label="回复给谁" align="center" width="200">
          <template slot-scope="scope">{{scope.row.forUserTypeName | formatUserTypeName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="185" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="mini"
                       @click="handleSelect(scope.$index, scope.row)">查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {dynamicComments , deleteDynamicComments} from '@/api/dynamicComments';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    topicName: null,
    topicDescribes: null,
    stratTime:null,
    commentName:null
  };

  export default {
    name: 'searchtopicList',
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
      count(count){
        if(count.length>18){
          return count.slice(0,18)+"..."
        }else{
          return count
        }
      },
      formatStatus(status){
        if(status===0){
          return '正常';
        }if(status===1){
          return '正常';
        }if(status===2){
          return '禁止';
        }
      },
      formatUserType(value){
          if (value===1){
              return "普通用户"
          }if(value===2){
              return "教练"
        }
      },
      formatType(type){
        if(type===1){
          return '回复';
        }else{
          return '评论';
        }
      },
      formatTime(time){
        if(time===null){
          return '暂无';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatUserTypeName(value){
         if(value!=null){
             return value;
         }if(value===null || value===""){
           return "一级评论无回复人";
        }
      }
    },
    methods: {
      handleSelect(index, row){
        this.$router.push({path:'/comment/commentDetail',query:{forDynamicId:row.forDynamicId,commentId:row.commentId,userType:row.userType}

        })
      },
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
        this.deleteDynamicComments(row.commentId);
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
          ids.push(this.multipleSelection[i].commentId);
        }
        if(this.operateType===0){
          //删除
          this.deleteDynamicComments(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      getList() {
        this.listLoading = true;
        dynamicComments (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      deleteDynamicComments(ids){
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteDynamicComments(params).then(response=>{
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



