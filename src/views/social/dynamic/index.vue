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
          <el-form-item label="动态内容：">
            <el-input v-model="listQuery.dynamicContent" class="input-width" placeholder="动态内容"></el-input>
          </el-form-item>
          <el-form-item label="发布地址：">
            <el-input v-model="listQuery.dynamicAddress" class="input-width" placeholder="发布地址"></el-input>
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
          <el-form-item label="话题类型：">
            <el-select v-model="listQuery.topicId" value-key="id" @click.native="selectTopicType()">
              <el-option v-for="item in arr" :label="item.topicName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
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
        <el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="作者" align="center">
          <template slot-scope="scope">{{scope.row.dynamicAuthor}}</template>
        </el-table-column>
        <el-table-column label="动态内容" width="220" align="center">
          <template slot-scope="scope">{{scope.row.dynamicContent}}</template>
        </el-table-column>
        <el-table-column label="发布时间" width="170" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
            </template>
        </el-table-column>
        <el-table-column label="发布地址" align="center">
          <template slot-scope="scope">{{scope.row.dynamicAddress}}</template>
        </el-table-column>
        <el-table-column label="动态图片" width="170" align="center">
          <template slot-scope="scope">
            <div v-for="item in getImg(scope.row.dynamicPicture)">
              <img style="height: 80px" :src="item" v-image-preview>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="点赞数" align="center">
          <template slot-scope="scope">{{scope.row.dynamicPraise}}</template>
        </el-table-column>
        <el-table-column label="分享数" align="center">
          <template slot-scope="scope">{{scope.row.dynamicSharenum}}</template>
        </el-table-column>
        <el-table-column label="评论数" align="center">
          <template slot-scope="scope">{{scope.row.dynamicCommentnum}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="所在话题" width="120" align="center">
          <template slot-scope="scope">{{scope.row.topicName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
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
  import {selectDynamicPage ,updateDynamicDelflagById , selectTopic} from '@/api/dynamic';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    dynamicContent: null,
    dynamicAddress: null,
    stratTime:null,
    endTime:null,
    topicId : null

  };


  export default {
    name: 'searchselectDynamicPage',
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
        topicId : null,
        arr:null,
        selectTopicType(){
          selectTopic ().then(response => {
            for (let i = 0; i < response.data.length; i++) {
              this.arr = response.data;
              this.topicId = response.data[i].id;
            }
          })
        },
          /*[{topicId:1,topicName:'张三'},{topicId:2,topicName:'李四'},{topicId:3,topicName:'王五'}]*/
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
     /* selectTopicType(){
        selectTopic ().then(response => {
          for (let i = 0; i < response.data.length; i++) {
            console.log(response.data[i].topicName)

          }
        })
      },*/
      getImg(val){
        if(val!=null){
          var words = val.split(',');
          return words;
        }
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
        this.updateDynamicDelflagById(row.id);
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
          this.updateDynamicDelflagById(ids);
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
        selectDynamicPage (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      updateDynamicDelflagById(ids){
        this.$confirm('是否要删除该话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          updateDynamicDelflagById(params).then(response=>{
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


