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
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.productName" class="input-width" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品ID：">
            <el-input v-model="listQuery.productId" class="input-width" placeholder="商品ID"></el-input>
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
          <el-form-item label="评论内容：">
            <el-input v-model="listQuery.content" class="input-width" placeholder="评论内容"></el-input>
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
        <el-table-column label="评论id" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="130">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="评论用户头像" width="120" align="center">
          <template slot-scope="scope">{{scope.row.memberIcon}}</template>
        </el-table-column>
        <el-table-column label="商品id" align="center">
          <template slot-scope="scope">{{scope.row.productId}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{scope.row.memberNickName}}</template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="评价星数" align="center">
          <template slot-scope="scope">{{scope.row.star}}</template>
        </el-table-column>
        <el-table-column label="IP地址" align="center">
          <template slot-scope="scope">{{scope.row.memberIp}}</template>
        </el-table-column>
        <el-table-column label="评论时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="显示状态" align="center">
          <template slot-scope="scope">{{scope.row.showStatus}}</template>
        </el-table-column>
        <el-table-column label="购买时商品属性" align="center">
          <template slot-scope="scope">{{scope.row.productAttribute}}</template>
        </el-table-column>
        <el-table-column label="展示图片" width="120" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.pics"></template>
        </el-table-column>
        <el-table-column label="评论内容" width="220" align="center">
          <template slot-scope="scope">{{scope.row.content}}</template>
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
  import {buyerComments , deleteBuyerComments} from '@/api/buyerComments';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    topicName: null,
    topicDescribes: null,
    stratTime:null
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
      formatTime(time){
        if(time==null){
          return 'N/A';
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
        this.deleteBuyerComments(row.id);
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
          this.deleteBuyerComments(ids);
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
        buyerComments (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      deleteBuyerComments(ids){
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteBuyerComments(params).then(response=>{
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




