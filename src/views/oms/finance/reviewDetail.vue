<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <div class="operate-button-container">
          <el-button size="mini" @click="showLogisticsDialog">查询用户支付信息</el-button>
          <el-button size="mini" v-if="reviewMessage.status == 1" @click="divideToWallet">审核通过结账到钱包</el-button>
          <el-button size="mini" v-if="reviewMessage.status == 1" type="danger" @click="udpateFashionableStatus">标记为待处理账单</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">订单基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">用户名称</el-col>
          <el-col :span="4" class="table-cell-title">总金额</el-col>
          <el-col :span="4" class="table-cell-title">实际支付金额</el-col>
          <el-col :span="4" class="table-cell-title">积分抵扣金额</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>

        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.orderSn}}</el-col>
          <el-col :span="4" class="table-cell">{{order.memberUsername}}</el-col>
          <el-col :span="4" class="table-cell">{{order.totalAmount}}</el-col>
          <el-col :span="4" class="table-cell">{{order.payAmount}}</el-col>
          <el-col :span="4" class="table-cell">{{order.integrationAmount}}</el-col>
          <el-col :span="4" class="table-cell">{{order.payType | formatPayType}}</el-col>


        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
          <el-col :span="4" class="table-cell-title">订单类型</el-col>
          <el-col :span="4" class="table-cell-title">支付状态</el-col>
          <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
          <el-col :span="4" class="table-cell-title">订单可得积分</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.sourceType | formatSourceType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.orderType | formatOrderType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.status | formatStatus}}</el-col>
          <el-col :span="4" class="table-cell">{{order.autoConfirmDay}}天</el-col>
          <el-col :span="4" class="table-cell">{{order.integration}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">分账信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">分账单号</el-col>
          <el-col :span="6" class="table-cell-title">订单编号</el-col>
          <el-col :span="6" class="table-cell-title">订单金额</el-col>
          <el-col :span="6" class="table-cell-title">分账金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{reviewMessage.collectingNo}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.orderNo}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.orderMoney}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.transferAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">手续费</el-col>
          <el-col :span="6" class="table-cell-title">订单类型</el-col>
          <el-col :span="6" class="table-cell-title">需要结账日期</el-col>
          <el-col :span="6" class="table-cell-title">分账状态</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{reviewMessage.handlingFee}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.orderType | orderType}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.paymentTime}}</el-col>
          <el-col :span="6" class="table-cell">{{reviewMessage.status | statusType}}</el-col>
        </el-row>
      </div>
    </el-card>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%" >

      <el-form ref="productAttrCatForm":model="payMessage" label-width="100px">
        <el-form-item label="支付单号:" prop="name">
          <template>{{payMessage.payNo}}</template>
        </el-form-item>
        <el-form-item label="支付金额:" prop="name">
          <template>{{payMessage.payMoney}}</template>
        </el-form-item>
        <el-form-item label="支付状态:" prop="name">
          <template>{{payMessage.payStatus}}</template>
        </el-form-item>
      </el-form>

      <!--<el-table ref="userNoticeTable"
                :data="payMessage"
                style="width: 100%; overflow: auto; max-height: 400px"
                v-loading="listLoading" height="400px"  border>
        <el-table-column label="支付单号" align="center">
          <template>{{payMessage.payNo}}</template>
        </el-table-column>
        <el-table-column label="支付金额" align="center">
          <template>{{payMessage.payMoeny}}</template>
        </el-table-column>
        <el-table-column label="支付状态" align="center">
          <template>{{payMessage.payStatus}}</template>
        </el-table-column>
      </el-table>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">退 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import {findOrderAndFashionableById} from '@/api/finance';
    import {udpateFashionableStatus} from '@/api/finance';
    import {formatDate} from '@/utils/date';

    export default {
        name: 'reviewDetail',
        data() {
            return {
                orderNo: null,
                order: {},
                reviewMessage: {},
                payMessage: {'payNo':'88888888', 'payMoney':888, 'payStatus':'支付成功'},
                listLoading: false,
                dialogVisible:false,
                dialogTitle: "用户支付信息(支付查询接口待做)"
            }
        },
        created() {
            findOrderAndFashionableById(this.$route.query.id).then(response => {
                this.reviewMessage = response.result.fashionable
                this.order = response.result.order;
            });
        },
        filters: {
            formatNull(value) {
                if(value===undefined||value===null||value===''){
                    return '暂无';
                }else{
                    return value;
                }
            },
            formatLongText(value) {
                if(value===undefined||value===null||value===''){
                    return '暂无';
                }else if(value.length>8){
                    return value.substr(0, 8) + '...';
                }else{
                    return value;
                }
            },
            formatPayType(value) {
                if (value === 1) {
                    return '支付宝';
                } else if (value === 2) {
                    return '微信';
                } else if (value === 3){
                    return '积分支付'
                } else {
                    return '未支付';
                }
            },
            formatSourceType(value) {
                if (value === 1) {
                    return 'APP订单';
                } else {
                    return 'PC订单';
                }
            },
            formatOrderType(value) {
                if (value === 1) {
                    return '预约订单';
                } else {
                    return '普通订单';
                }
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
            },
            formatStatus(value) {
                if (value === 1) {
                    return '已支付';
                } else if (value === 2) {
                    return '已发货';
                } else if (value === 3) {
                    return '已完成';
                } else if (value === 4) {
                    return '已关闭';
                } else if (value === 5) {
                    return '售后';
                } else {
                    return '待付款';
                }
            }
        },
        methods: {
            formatTime(time) {
                if (time == null || time === '') {
                    return '';
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            showLogisticsDialog(oidPaybill){
                this.dialogVisible=true;
                //reviewMessage.oidPaybill
                //todo 查询支付接口待做
            },
            divideToWallet(){
                //todo 分账成功接口待做
                this.$router.back();
            },
            udpateFashionableStatus(){
                udpateFashionableStatus(this.reviewMessage.collectingNo).then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                });
                this.$router.back();
            }
        }
    }
</script>
<style scoped>
  .detail-container {
    width: 80%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


