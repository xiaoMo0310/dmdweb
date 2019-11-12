<template> 
  <div class="app-container">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>分账管理</span>
      <div style="margin-top: 0px" align="right">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable @change="getList" class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
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
        <el-table-column label="分账单号" align="center" width="200">
          <template slot-scope="scope">{{scope.row.collectingNo}}</template>
        </el-table-column>
        <el-table-column label="订单编号" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orderNo}}</template>
        </el-table-column>
        <el-table-column label="订单金额"width="150" align="center">
          <template slot-scope="scope">{{scope.row.orderMoney}}</template>
        </el-table-column>
        <el-table-column label="分账金额"width="150" align="center">
          <template slot-scope="scope">{{scope.row.transferAmount}}</template>
        </el-table-column>
        <el-table-column label="手续费"width="150" align="center">
          <template slot-scope="scope">{{scope.row.handlingFee}}</template>
        </el-table-column>
        <el-table-column label="订单类型"width="200" align="center">
          <template slot-scope="scope">{{scope.row.orderType | orderType}}</template>
        </el-table-column>
        <el-table-column label="分账状态"width="200" align="center">
          <template slot-scope="scope">{{scope.row.status | statusType}}</template>
        </el-table-column>
        <el-table-column label="需要结账日期" align="center">
          <template slot-scope="scope">{{scope.row.paymentTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleReviewDetail(scope.$index, scope.row)">详细信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
    import {findFashionableList} from '@/api/finance';
    import {formatDate} from '@/utils/date';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        status: 1
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
                statusOptions: [
                    {
                        label: "未分账",
                        value: 1,
                        default: true
                    },
                    {
                        label: "已分账",
                        value: 2
                    },
                    {
                        label: "待复核",
                        value: 3
                    },
                    {
                        label: "已取消",
                        value: 4
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
            orderType(type){
                if(type === 1){
                    return '潜水学习'
                }else {
                    return '未知'
                }
            },
            statusType(type){
                if(type === 1){
                    return '待分账'
                }else if(type === 2){
                    return '已分账'
                }else if(type === 3){
                    return '待复核'
                }else{
                    return '已取消'
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
            handleReviewDetail(index, row){
                this.$router.push({path:'/oms/reviewDetail',query:{id:row.id}})
            },
            getList() {
                this.listLoading = true;
                findFashionableList (this.listQuery).then(response => {
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


