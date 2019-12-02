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
          <el-form-item label="订单号：">
            <el-input v-model="listQuery.orderSn" class="input-width" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收支人姓名：">
            <el-input v-model="listQuery.userName" class="input-width" placeholder="收支人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收支类型：">
            <el-select v-model="listQuery.type" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付(结算)时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.completionTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>收支明细</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="100" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="订单编号" align="center" width="200">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="收支人姓名" width="200" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="手机号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="交易金额"width="100" align="center">
          <template slot-scope="scope">{{scope.row.payAmount}}</template>
        </el-table-column>
        <el-table-column label="收支类型"width="100" align="center">
          <template slot-scope="scope">{{scope.row.type | type}}</template>
        </el-table-column>
        <el-table-column label="付款账户类型" align="center">
          <template slot-scope="scope">{{scope.row.paymentType | paymentType}}</template>
        </el-table-column>
        <el-table-column label="收款账户类型" align="center">
          <template slot-scope="scope">{{scope.row.incomeType | incomeType}}</template>
        </el-table-column>
        <el-table-column label="支付(结算)时间"width="350" align="center">
          <template slot-scope="scope">{{scope.row.completionTime | formatTime}}</template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
    import {fetchList} from '@/api/finance';
    import {formatDate} from '@/utils/date';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        completionTime: null,
        type: null,
        orderSn: null,
        userName: null
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
                typeOptions: [
                    {
                        label: "支出",
                        value: 1
                    },
                    {
                        label: "收入",
                        value: 2
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
            paymentType(type){
                if(type === 1){
                    return '微信'
                } else if(type === 2){
                    return '支付宝'
                }else {
                    return '平台账户'
                }
            },
            incomeType(type){
                if(type === 1){
                    return "平台账户"
                }else {
                    return "银行卡"
                }
            },
            type(type){
                if(type == 1){
                    return "支出"
                }else {
                    return "收入"
                }
            }
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
            getList() {
                this.listLoading = true;
                fetchList (this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
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


