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
          <el-form-item label="会员ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input v-model="listQuery.userName" class="input-width" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-form-item label="注册手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="注册手机号"></el-input>
          </el-form-item>
          <el-form-item label="邀请码查询：">
            <el-input v-model="listQuery.invitationCode" class="input-width" placeholder="邀请码查询"></el-input>
          </el-form-item>
          <el-form-item label="注册起始日期查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startUserCreateTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="注册结束日期查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endUserCreateTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下单起始时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startOrderCreatedTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="下单结束时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endOrderCreatedTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="付款起始时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startOrderPaymentTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="付款结束时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endOrderPaymentTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="完成起始时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startOrderEndTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="完成结束时间查询：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endOrderEndTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择结束时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="起始付款金额数：">
            <el-input v-model="listQuery.startTotalAmount" class="input-width" placeholder="起始付款金额数"></el-input>
          </el-form-item>
          <el-form-item label="结束付款金额数：">
            <el-input v-model="listQuery.endTotalAmount" class="input-width" placeholder="结束付款金额数"></el-input>
          </el-form-item>

          <el-form-item label="起始实际付款金额：">
            <el-input v-model="listQuery.startPayAmount" class="input-width" placeholder="起始实际付款金额"></el-input>
          </el-form-item>
          <el-form-item label="结束实际付款金额：">
            <el-input v-model="listQuery.endPayAmount" class="input-width" placeholder="结束实际付款金额"></el-input>
          </el-form-item>

          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.productName" class="input-width" placeholder="商品名称"></el-input>
          </el-form-item>

          <el-form-item label="订单状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分期数据查询">
            <el-select v-model="listQuery.identifier" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
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
        <el-table-column label="用户ID" width="120" align="center">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center" width="130">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="注册手机号" align="center" width="130">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="注册时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.userCreateTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="邀请码" align="center" width="130">
          <template slot-scope="scope">{{scope.row.invitationCode}}</template>
        </el-table-column>
        <el-table-column label="下单时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.orderCreatedTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="付款时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.orderPaymentTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="完成时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.orderEndTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center" width="130">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="订单金额" align="center" width="130">
          <template slot-scope="scope">{{scope.row.total_amount}}元</template>
        </el-table-column>
        <el-table-column label="实际付款金额" align="center" width="130">
          <template slot-scope="scope">{{scope.row.payAmount}}元</template>
        </el-table-column>
        <el-table-column label="积分抵扣金额" align="center" width="130">
          <template slot-scope="scope">{{scope.row.integrationAmount}}元</template>
        </el-table-column>
        <el-table-column label="用户积分奖励" align="center" width="130">
          <template slot-scope="scope">{{scope.row.integration}}分</template>
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatChangeType}}</template>
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
  import {queryOrderStatisticsPage ,exportOrderStatistics,uploadOrderStatistics } from '@/api/orderStatistics';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    memberId: null,
    userName: null,
    phone: null,
    invitationCode: null,
    startUserCreateTime: null,
    endUserCreateTime:null,
    startOrderCreatedTime: null,
    endOrderCreatedTime: null,
    startOrderPaymentTime: null,
    endOrderPaymentTime: null,
    startOrderEndTime: null,
    endOrderEndTime: null,
    startTotalAmount: null,
    endTotalAmount: null,
    startPayAmount: null,
    endPayAmount: null,
    productName: null,
  };
  const defaultTypeOptions=[
    {
      label: '代付款',
      value: 0
    },
    {
      label: '待发货',
      value: 1
    },
    {
      label: '已发货',
      value: 2
    },
    {
      label: '已完成',
      value: 3
    },
    {
      label: '已关闭',
      value: 4
    },
    {
      label: '售后',
      value: 5
    },
    {
      label: '取消',
      value: 6
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
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null
        },
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(status){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(status===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatChangeType(status){
        if(status===0){
          return '代付款';
        }if(status===1){
          return '待发货';
        }if(status===2){
          return '已发货';
        }if(status===3){
          return '已完成';
        }if(status===4){
          return '已关闭';
        }if(status===5){
          return '售后';
        }if(status===6){
          return '取消';
        }
      },
      formatSourceType(sourceType){
        if(sourceType===0){
          return '购物';
        }if(sourceType===1){
          return '动态或评论';
        }if(sourceType===2){
          return '管理员修改';
        }
      },
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
        queryOrderStatisticsPage (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      getList2(){
        exportOrderStatistics (this.listQuery).then(response => {
          if (response.code === 200){
            window.location.href = 'http://localhost:8090' + "/orderStatistics/exportOrderStatistics2?fileName=" + encodeURI(response.data) + "&delete=" + true;
          }

        }).catch(err => {
          console.log(err) // 这里catch到错误timeout
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




