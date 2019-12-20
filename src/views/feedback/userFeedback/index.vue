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
          <el-form-item label="用户Id：">
            <el-input v-model="listQuery.userId" class="input-width" placeholder="用户Id"></el-input>
          </el-form-item>
          <el-form-item label="问题描述：">
            <el-input v-model="listQuery.problemDescription" class="input-width" placeholder="问题描述"></el-input>
          </el-form-item>
          <el-form-item label="发布起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startTime"
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
          <el-form-item label="意见反馈类别：">
            <el-select v-model="listQuery.problemId" value-key="id" @click.native="selectTopicType()">
              <el-option v-for="item in arr" :label="item.questionName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户昵称：">
            <el-input v-model="listQuery.nickName" class="input-width" placeholder="用户昵称"></el-input>
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
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户id" width="80" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="用户类型" width="100" align="center">
          <template slot-scope="scope">{{scope.row.userType | formtUserType}}</template>
        </el-table-column>
        <el-table-column label="问题类别" width="120" align="center">
          <template slot-scope="scope">{{scope.row.problemName}}</template>
        </el-table-column>
        <el-table-column label="问题描述" align="center">
          <template slot-scope="scope">{{scope.row.problemDescription}}</template>
        </el-table-column>
        <el-table-column label="描述图片" width="150" align="center">
          <template slot-scope="scope">
            <img style="height: 80px" :src="scope.row.picture" v-image-preview>
            <!--:preview-src-list=""-->
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
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
  import {queryUserFeedback,queryProblemFeedbackByName,deletequeryUserFeedback} from '@/api/feedback';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    userId: null,
    problemDescription: null,
    startTime:null,
    endTime:null,
    nickName : null
  };

  export default {
    name: 'searchqueryUserFeedback',
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
        operateType: null,
        problemId : null,
        arr:null,
        pictureList:null,
        selectTopicType(){
          queryProblemFeedbackByName ().then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.arr = response.data;
              this.problemId = response.data[i].id;
            }
          })
        },
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formtUserType(value){
        if(value === 1){
          return "普通用户";
        }if(value === 2){
          return "教练";
        }
      },
      formatTime(time){
        if(time==null){
          return '暂无';
        }
        let date = new Date(time);
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
        this.deletequeryUserFeedback(row.id);
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
          this.deletequeryUserFeedback(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      handleAdd(){
        this.$router.push({path: '/topic/addTopic'})
      },
      handUpdate(index,row){
        this.$router.push({path: '/topic/updateTopic', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        queryUserFeedback (this.listQuery).then(response => {
          /*var pictures = "";
          for(let i = 0;i < response.data.list.length; i++){
            pictures += (response.data.list[i].picture)+",";

          }
          var pictures2 = pictures.substring(0, pictures.length - 1);
          var pictureList = pictures2.split(",");
          this.pictureList = pictureList;
          console.log(pictureList)*/
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      deletequeryUserFeedback(ids){
        this.$confirm('是否要删除该话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deletequeryUserFeedback(params).then(response=>{
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


