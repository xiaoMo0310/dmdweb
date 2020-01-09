<template>
  <div class="app-container">
    <!--<div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="out-border">
            <div class="layout-title">当日注册用户数量</div>
            <div class="color-main address-content">
              <div style="text-align: center">{{registerDayUser}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="out-border">
            <div class="layout-title">昨日访问量</div>
            <div class="color-main address-content">
              <div style="text-align: center">{{yesterdayVisitUser}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="out-border">
            <div class="layout-title">累计注册</div>
            <div class="color-main address-content">
              <div style="text-align: center">{{totalUser}}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="out-border">
            <div class="layout-title">七日留存率</div>
            <div class="color-main address-content">
              <div style="text-align: center">{{RetentionRate.seven}}%</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="out-border">
            <div class="layout-title">日留存率</div>
            <div class="color-main address-content">
              <div style="text-align: center">{{RetentionRate.thirty}}%</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>-->
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">{{orderNumtoDay}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">￥{{orderMoneyToDay}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_yesterday_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">￥{{orderMoneyToYesterday}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">近7天销售总额</div>
            <div class="total-value">￥{{orderMoneyToSeven}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">({{substitutePayment}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">({{completed}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">({{receiptConfirmed}})</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">({{shipped}})</span>
            </div>
          </el-col>
          <!--<el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>-->

          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">售后申请</span>
              <span style="float: right" class="color-danger">({{afterSale}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已确认收货订单</span>
              <span style="float: right" class="color-danger">({{confirmReceipt}})</span>
            </div>
          </el-col>
        </el-row>
       <!-- <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">广告位即将到期</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>-->
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{audited}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{auditPass}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{auditFailed}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{allMerchandise}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">待审核</el-col>
                <el-col :span="6" class="overview-item-title">审核通过</el-col>
                <el-col :span="6" class="overview-item-title">审核未通过</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12" >
          <el-carousel height="183px" class="out-border" :interval="10000">
            <el-carousel-item v-for="item in 2" :key="item">
              <div v-if="item === 1">
                <div class="layout-title">用户总览</div>
                <div style="padding: 40px">
                  <el-row>
                    <el-col :span="4" class="color-danger overview-item-value">{{registerDayUser.today}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{registerDayUser.yesterday}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{yesterdayVisitUser}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{totalUser}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{RetentionRate.seven}}%</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{RetentionRate.thirty}}%</el-col>
                  </el-row>
                  <el-row class="font-medium">
                    <el-col :span="4" class="overview-item-title">今日新增</el-col>
                    <el-col :span="4" class="overview-item-title">昨日新增</el-col>
                    <el-col :span="4" class="overview-item-title">昨日访问量</el-col>
                    <el-col :span="4" class="overview-item-title">累计注册</el-col>
                    <el-col :span="4" class="overview-item-title">七日留存率</el-col>
                    <el-col :span="4" class="overview-item-title">月留存率</el-col>
                  </el-row>
                </div>
              </div>
              <div v-if="item === 2">
                <div class="layout-title">教练总览</div>
                <div style="padding: 40px">
                  <el-row>
                    <el-col :span="4" class="color-danger overview-item-value">{{registerDayCoach.today}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{registerDayCoach.yesterday}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{yesterdayVisitCoach}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{totalCoach}}</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{coachRetentionRate.seven}}%</el-col>
                    <el-col :span="4" class="color-danger overview-item-value">{{coachRetentionRate.thirty}}%</el-col>
                  </el-row>
                  <el-row class="font-medium">
                    <el-col :span="4" class="overview-item-title">今日新增</el-col>
                    <el-col :span="4" class="overview-item-title">昨日新增</el-col>
                    <el-col :span="4" class="overview-item-title">昨日访问量</el-col>
                    <el-col :span="4" class="overview-item-title">累计注册</el-col>
                    <el-col :span="4" class="overview-item-title">七日留存率</el-col>
                    <el-col :span="4" class="overview-item-title">月留存率</el-col>
                  </el-row>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>

        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderMonthNum}}</div>
              <div>
                <span class="" style="font-size: 14px">
<!--
                  {{(((orderMonthNum-orderPercentage)/orderPercentage)*100 =='Infinity' ? orderMonthNum : ((orderMonthNum-orderPercentage)/orderPercentage))*100 | numFilter}} %
-->
                {{(((orderMonthNum-orderPercentage)/orderPercentage)*100) | numFilter}} %
                </span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderWeek}}</div>
              <div>
                <span class="" style="font-size: 14px">
<!--
                  {{(((orderWeek - orderWeekPercentage)/orderWeekPercentage)*100 == 'Infinity' ? orderWeek : ((orderWeek - orderWeekPercentage)/orderWeekPercentage))*100 | numFilter }} %
-->
                  {{(((orderWeek - orderWeekPercentage)/orderWeekPercentage)*100) | numFilter }} %
                </span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{salesMonth}}</div>
              <div>
                <span class="" style="font-size: 14px">{{(((salesMonth - salesLastMonth)/salesLastMonth)*100) | numFilter}}  %</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{salesWeek}}</div>
              <div>
                <span class="" style="font-size: 14px">{{(((salesWeek - salesLastWeek)/salesLastWeek)*100) | numFilter}}  %</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import img_total_week from '@/assets/images/total-week.png';
  import {countDayRegisterUser, countYesterdayVisitUser, countTotalUser, countRetentionRate, countThirtyRetentionRate} from '@/api/user';
  import {countDayRegisterCoach, countYesterdayVisitCoach, countTotalCoach, countCoachRetentionRate, countCoachThirtyRetentionRate} from '@/api/coach';
  import {queryOrderNumtoDay , queryOrderMoneyToDay,queryOrderMoneyToYesterday,queryOrderMoneyToSeven,querySubstitutePayment,queryCompleted,queryReceiptConfirmed,queryShipped,queryAfterSale,queryConfirmReceipt,queryOrderMonthNum,queryOrderPercentage,queryOrderWeek,queryOrderWeekPercentage,querySalesMonth,querySalesLastMonth,querySalesWeek,querySalesLastWeek,setTimeout} from '@/api/order';
  import {queryAudited,queryAuditPass,queryAuditFailed,queryAllMerchandise} from '@/api/courseProduct';

  const DATA_FROM_BACKEND = {
    columns: [/*'date', 'orderCount','orderAmount'*/null],
    rows: [
      /*{date: '2019-11-01', orderCount: 10, orderAmount: 1093},
      {date: '2019-11-02', orderCount: 20, orderAmount: 2230},
      {date: '2019-11-03', orderCount: 33, orderAmount: 3623},
      {date: '2019-11-04', orderCount: 50, orderAmount: 6423},
      {date: '2019-11-05', orderCount: 80, orderAmount: 8492},
      {date: '2019-11-06', orderCount: 60, orderAmount: 6293},
      {date: '2019-11-07', orderCount: 20, orderAmount: 2293},
      {date: '2019-11-08', orderCount: 60, orderAmount: 6293},
      {date: '2019-11-09', orderCount: 50, orderAmount: 5293},
      {date: '2019-11-10', orderCount: 30, orderAmount: 3293},
      {date: '2019-11-11', orderCount: 20, orderAmount: 2293},
      {date: '2019-11-12', orderCount: 80, orderAmount: 8293},
      {date: '2019-11-13', orderCount: 100, orderAmount: 10293},
      {date: '2019-11-14', orderCount: 10, orderAmount: 1293},
      {date: '2019-11-15', orderCount: 40, orderAmount: 4293}*/
      null
    ]
  };
  export default {
    name: 'home',
    data() {
      return {

        pickerOptions: {
          shortcuts: [{
            text: '最近一周',

            onClick(picker) {
/*              const end = new Date();
              let start = new Date();
             /!* start.setFullYear(2019);
              start.setMonth(12);
              start.setDate(10);*!/
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);*/
              let start = new Date();
              /*start.setFullYear(2019);
               start.setMonth(12);
               start.setDate(10);*/
              const end = new Date();
              end.setTime(start.getTime());
              start.setTime(start.getTime() -  1000 * 60 * 60 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick(picker) {
             /* const end = new Date();
              let start = new Date();
              /!*start.setFullYear(2019);
              start.setMonth(12);
              start.setDate(10);*!/
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);*/

              let start = new Date();
              /*start.setFullYear(2019);
               start.setMonth(12);
               start.setDate(10);*/
              const end = new Date();
              end.setTime(start.getTime());
              start.setTime(start.getTime() -  1000 * 60 * 60 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          axisSite: { right: ['orderAmount']},
        labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}},
        chartData: {
          columns: [],
          rows: []
        },
        loading: false,
        dataEmpty: false,
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount,
        img_total_week,
        registerDayUser: {"today": 0, "yesterday": 0},
        yesterdayVisitUser: 0,
        totalUser: 0,
        RetentionRate:{"seven":0, "thirty": 0},
        registerDayCoach: {"today": 0, "yesterday": 0},
        yesterdayVisitCoach: 0,
        totalCoach: 0,
        coachRetentionRate:{"seven":0, "thirty": 0},
        orderNumtoDay:0,
        orderMoneyToDay:null,
        orderMoneyToYesterday:null,
        orderMoneyToSeven:null,
        substitutePayment:0,
        completed:0,
        receiptConfirmed:0,
        shipped:0,
        afterSale:0,
        confirmReceipt:0,
        audited:0,
        auditPass:0,
        auditFailed:0,
        allMerchandise:0,
        orderMonthNum:0,
        orderPercentage:'暂无',
        orderWeek:0,
        orderWeekPercentage:'暂无',
        salesMonth:0,
        salesLastMonth:null,
        salesWeek:null,
        salesLastWeek:null,
      }
    },
    filters:{
      numFilter(value){
        let realVal = ''
        if (value) {
          // 截取当前数据到小数点后两位
          realVal = parseFloat(value).toFixed(2)
        } else {
          realVal = '--'
        }
        return realVal
      },
    },
    created(){
      this.initOrderCountDate();
      this.getData();
      this.getRegisterUser();
      this.getYesterdayVisitUser();
      this.getTotalUser();
      this.getRetentionRate();
      this.getRegisterCoach();
      this.getYesterdayVisitCoach();
      this.getTotalCoach();
      this.getCoachRetentionRate();
      this.getQueryOrderNumtoDay();
      this.getOrderMoneyToDay();
      this.getQueryOrderMoneyToYesterday();
      this.getQueryOrderMoneyToSeven();
      this.getQuerySubstitutePayment();
      this.getQueryCompleted();
      this.getQueryReceiptConfirmed();
      this.getQueryShipped();
      this.getQueryAfterSale();
      this.getQueryConfirmReceipt();
      this.getQueryAudited();
      this.getQueryAuditPass();
      this.getQueryAuditFailed();
      this.getQueryAllMerchandise();
      this.getQueryOrderMonthNum();
      this.getQueryOrderPercentage();
      this.getQueryOrderWeek();
      this.getQueryOrderWeekPercentage();
      this.getQuerySalesMonth();
      this.getQuerySalesLastMonth();
      this.getQuerySalesWeek();
      this.getQuerySalesLastWeek();
    },
    methods:{
      handleDateChange(){
        this.getData();
      },
      initOrderCountDate(){
        let start = new Date();
        /*start.setFullYear(2019);
        start.setMonth(12);
        start.setDate(10);*/
        const end = new Date();
        end.setTime(start.getTime());
        start.setTime(start.getTime() -  1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){
        setTimeout().then(response =>  {
          DATA_FROM_BACKEND.columns = ['date', 'orderCount','orderAmount'];
          DATA_FROM_BACKEND.rows = response.data;
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          for(let i=0;i<DATA_FROM_BACKEND.rows.length;i++){
            let item = DATA_FROM_BACKEND.rows[i];
            let currDate=str2Date(item.date);
            let start=this.orderCountDate[0];
            let end=this.orderCountDate[1];
            if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
               this.chartData.rows.push(item);
            }
          }

          this.dataEmpty = false;
          this.loading = false
        }, 1000)
      },
      getRegisterUser(){
          countDayRegisterUser().then(response => {
              this.registerDayUser = response.result;
          });
      },
      getYesterdayVisitUser(){
          countYesterdayVisitUser().then(response => {
              this.yesterdayVisitUser = response.result;
          });
      },
      getTotalUser(){
          countTotalUser().then(response => {
              this.totalUser = response.result;
          });
      },
      getRetentionRate(){
          countRetentionRate(7).then(response => {
              this.RetentionRate.seven = response.result.seven;
          });
          countThirtyRetentionRate(30).then(response => {
              this.RetentionRate.thirty = response.result.thirty;
          });
      },
      getRegisterCoach(){
          countDayRegisterCoach().then(response => {
              this.registerDayCoach = response.result;
          });
      },
      getYesterdayVisitCoach(){
          countYesterdayVisitCoach().then(response => {
              this.yesterdayVisitCoach = response.result;
          });
      },
      getTotalCoach(){
          countTotalCoach().then(response => {
              this.totalCoach = response.result;
          });
      },
      getCoachRetentionRate(){
          countCoachRetentionRate(7).then(response => {
              this.coachRetentionRate.seven = response.result.seven;
          });
          countCoachThirtyRetentionRate(30).then(response => {
              this.coachRetentionRate.thirty = response.result.thirty;
          });
      },
      getQueryOrderNumtoDay(){
        queryOrderNumtoDay().then(response => {
          this.orderNumtoDay = response.data;
        })
      },
      getOrderMoneyToDay(){
        queryOrderMoneyToDay().then(response => {
          if(response.data===null){
            this.orderMoneyToDay = 0;
          }else{
            this.orderMoneyToDay = response.data;
          }
        })
      },
      getQueryOrderMoneyToYesterday(){
        queryOrderMoneyToYesterday().then(response => {
          if(response.data===null){
            this.orderMoneyToYesterday = 0;
          }else{
            this.orderMoneyToYesterday = response.data;
          }
        })
      },
      getQueryOrderMoneyToSeven(){
        queryOrderMoneyToSeven().then(response => {
          if(response.data===null){
            this.orderMoneyToSeven = 0;
          }else{
            this.orderMoneyToSeven = response.data;
          }
        })
      },
      getQuerySubstitutePayment(){
        querySubstitutePayment().then(response => {
          this.substitutePayment = response.data;
        })
      },
      getQueryCompleted(){
        queryCompleted().then(response => {
          this.completed = response.data;
        })
      },
      getQueryReceiptConfirmed(){
        queryReceiptConfirmed().then(response => {
          this.receiptConfirmed = response.data;
        })
      },
      getQueryShipped(){
        queryShipped().then(response => {
          this.shipped = response.data;
        })
      },
      getQueryAfterSale(){
        queryAfterSale().then(response => {
          this.afterSale = response.data;
        })
      },
      getQueryConfirmReceipt(){
        queryConfirmReceipt().then(response => {
          this.confirmReceipt = response.data;
        })
      },
      getQueryAudited(){
        queryAudited().then(response => {
          this.audited = response.data;
        })
      },
      getQueryAuditPass(){
        queryAuditPass().then(response => {
          this.auditPass = response.data;
        })
      },
      getQueryAuditFailed(){
        queryAuditFailed().then(response => {
          this.auditFailed = response.data;
        })
      },
      getQueryAllMerchandise(){
        queryAllMerchandise().then(response => {
          this.allMerchandise = response.data;
        })
      },
      getQueryOrderMonthNum(){
        queryOrderMonthNum().then(response => {
          this.orderMonthNum = response.data;
        })
      },
      getQueryOrderPercentage(){
        queryOrderPercentage().then(response => {
          this.orderPercentage = response.data;
        })
      },
      getQueryOrderWeek(){
        queryOrderWeek().then(response => {
          this.orderWeek = response.data;
        })
      },
      getQueryOrderWeekPercentage(){
        queryOrderWeekPercentage().then(response => {
          this.orderWeekPercentage = response.data;
        })
      },
      getQuerySalesMonth(){
        querySalesMonth().then(response => {
          this.salesMonth = response.data;
        })
      },
      getQuerySalesLastMonth(){
        querySalesLastMonth().then(response => {
          this.salesLastMonth = response.data;
        })
      },
      getQuerySalesWeek(){
        querySalesWeek().then(response => {
          this.salesWeek = response.data;
        })
      },
      getQuerySalesLastWeek(){
        querySalesLastWeek().then(response => {
          this.salesLastWeek = response.data;
        })
      }

    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 0px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    text-align: center;
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

</style>
