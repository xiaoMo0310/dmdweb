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
          <el-form-item label="分期数据查询">
            <el-select v-model="listQuery.identifier" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始日期查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        style="float:right;margin-right: 15px"
        type="primary"
        @click="handleExport()"
        size="small">
        数据导出
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="时间" width="200" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="注册人数" width="200" align="center">
          <template slot-scope="scope">{{scope.row.memberNum}}</template>
        </el-table-column>
        <el-table-column label="订单量" align="center" width="160">
          <template slot-scope="scope">{{scope.row.orderNum}}</template>
        </el-table-column>
        <el-table-column label="已付款订单量" align="center" width="160">
          <template slot-scope="scope">{{scope.row.paidNum}}</template>
        </el-table-column>
        <el-table-column label="订单付款金额(单位/RMB)" align="center" width="200">
          <template slot-scope="scope">{{scope.row.payAmount}}</template>
        </el-table-column>
        <el-table-column label="待完成订单数量" align="center" width="160">
          <template slot-scope="scope">{{scope.row.completed}}</template>
        </el-table-column>
        <el-table-column label="待完成订单金额(单位/RMB)" align="center" width="200">
          <template slot-scope="scope">{{scope.row.completedMoney}}</template>
        </el-table-column>
        <el-table-column label="已完成订单数量" align="center" width="160">
          <template slot-scope="scope">{{scope.row.over}}</template>
        </el-table-column>
        <el-table-column label="已完成订单金额(单位/RMB)" align="center" width="200">
          <template slot-scope="scope">{{scope.row.overMoney}}</template>
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
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {querySalesStatistics ,exportOrderStatistics } from '@/api/sale';
  //import {querySalesStatistics ,exportOrderStatistics,uploadOrderStatistics } from '@/api/orderStatistics';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    startTime:null,
    endTime:null
  };
  const defaultTypeOptions=[
    {
      label: '普通订单',
      value: 0
    },
    {
      label: '潜水学证订单',
      value: 1
    },
    {
      label: '积分商品订单',
      value: 2
    },
  ];

  const defaultTypeOptions2=[
    {
      label: '当日数据',
      value: 1
    },
    {
      label: '近七天数据',
      value: 2
    },
    {
      label: '近三十天数据',
      value: 3
    },
    {
      label: '本月数据',
      value: 4
    },
    {
      label: '本季度数据',
      value: 5
    },
    {
      label: '本年数据',
      value: 6
    },
  ];
  export default {
    name: 'searchtopicList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions),
        typeOptions2:Object.assign({},defaultTypeOptions2),

        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operateType: null,

      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(orderType){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(orderType===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatTime(time){
        if(time==null){
          return '暂无';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
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
      handleExport(){
        this.listQuery.pageNum = 1;
        this.getList2();
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
      getList() {
        this.listLoading = true;
        querySalesStatistics (this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      getList2(){
        exportOrderStatistics (this.listQuery).then(response => {
          if (response.code === 200){
            window.location.href = 'http://localhost:8090' + "/sales/exportOrderStatistics2?fileName=" + encodeURI(response.data) + "&delete=" + true;
          }

        }).catch(err => {
          //console.log(err) // 这里catch到错误timeout
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




