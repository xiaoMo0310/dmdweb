<template>
  <div class="detail-container">
    <el-card shadow="never">
      <span class="font-title-medium">退货商品</span>
      <el-table
        border
        class="standard-margin"
        ref="productTable"
        :data="productList">
        <el-table-column label="商品图片" width="150" align="center">
          <template slot-scope="scope">
            <img style="height:80px" :src="imageSplit(scope.row.productPic)">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <span class="font-small">{{scope.row.productTitle}}</span><br>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="100" align="center">
          <template slot-scope="scope">
            <span class="font-small">￥{{scope.row.productPrice}}</span><br>
          </template>
        </el-table-column>
        <el-table-column label="实际支付价格" width="110" align="center">
          <template slot-scope="scope">
            <span class="font-small">￥{{scope.row.productRealPrice}}</span><br>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="230" align="center">
          <template slot-scope="scope">
            <p  v-for="item in parseProductAttr(scope.row.productAttr)">{{item.key}}:{{item.value}}</p>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="100" align="center">
          <template slot-scope="scope">{{scope.row.productCount}}</template>
        </el-table-column>
        <el-table-column label="小计" width="100" align="center">
          <template slot-scope="scope">￥{{totalAmount}}</template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:15px;margin-bottom:15px">
        <span class="font-title-medium">合计：</span>
        <span class="font-title-medium color-danger">￥{{totalAmount}}</span>
      </div>
    </el-card>
    <el-card shadow="never" class="standard-margin">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.id}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">申请状态</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.status | formatStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:50px;line-height:30px">订单编号
          </el-col>
          <el-col class="form-border font-small" :span="18" style="height:50px">
            {{orderReturnApply.orderSn}}
            <el-button type="text" size="small" @click="handleViewOrder">查看</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">申请时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.createdTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">用户账号</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.memberUsername}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">联系人</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.returnName}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.returnPhone | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">退货原因</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.reason | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">问题描述</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.description | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:100px;line-height:80px">凭证图片
          </el-col>
          <el-col class="form-border font-small" :span="18" style="height:100px">
            <img preview="0" v-for="item in proofPics" style="width:80px;height:80px; margin-left: 6px;" :src="item">
          </el-col>
        </el-row>
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">订单金额</el-col>
          <el-col class="form-border font-small" :span="18">￥{{totalAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">确认退款金额
          </el-col>
          <el-col class="form-border font-small" style="height:52px" :span="18">
            ￥
            <el-input size="small" v-model="updateStatusParam.returnAmount"
                      :disabled="orderReturnApply.status!==0"
                      style="width:200px;margin-left: 10px"></el-input>
          </el-col>
        </el-row>
        <!--<div v-show="orderReturnApply.status!==3">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">选择收货点
          </el-col>
          <el-col class="form-border font-small" style="height:52px" :span="18">
            <el-select size="small"
                       style="width:200px"
                       :disabled="orderReturnApply.status!==0"
                       v-model="updateStatusParam.shippingId">
              <el-option v-for="address in companyAddressList"
                         :key="address.id"
                         :value="address.id"
                         :label="address.addressName">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">收货人姓名</el-col>
          <el-col class="form-border font-small" :span="18">{{currentAddress.name}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">所在区域</el-col>
          <el-col class="form-border font-small" :span="18">{{currentAddress | formatRegion}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">详细地址</el-col>
          <el-col class="form-border font-small" :span="18">{{currentAddress.detailAddress}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">联系电话</el-col>
          <el-col class="form-border font-small" :span="18">{{currentAddress.phone}}</el-col>
        </el-row>
        </div>-->
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status!==0">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理人员</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleMan}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">处理备注</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.handleNote | formatNull}}</el-col>
        </el-row>
      </div>
      <!--<div class="form-container-border" v-show="orderReturnApply.status===2 && ">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">收货人员</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveMan}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" >收货时间</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveTime | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6">收货备注</el-col>
          <el-col class="form-border font-small" :span="18">{{orderReturnApply.receiveNote | formatNull}}</el-col>
        </el-row>
      </div>-->
      <div class="form-container-border" v-show="orderReturnApply.status===0">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">处理备注</el-col>
          <el-col class="form-border font-small" :span="18">
            <el-input  size="small" v-model="updateStatusParam.handleNote" style="width:200px;margin-left: 10px"></el-input>
          </el-col>
        </el-row>
      </div>
      <!--<div class="form-container-border" v-show="orderReturnApply.status===1">
        <el-row>
          <el-col class="form-border form-left-bg font-small" :span="6" style="height:52px;line-height:32px">收货备注</el-col>
          <el-col class="form-border font-small" :span="18">
            <el-input  size="small" v-model="updateStatusParam.receiveNote" style="width:200px;margin-left: 10px"></el-input>
          </el-col>
        </el-row>
      </div>-->
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status===0">
        <el-button type="primary" size="small" @click="handleUpdateStatus(1)">确认退货</el-button>
        <el-button type="danger" size="small" @click="handleUpdateStatus(3)">拒绝退货</el-button>
        <el-button type="info" size="small" @click="onReturn()">返回</el-button>
      </div>
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status===1">
        <el-button type="primary" size="small" @click="handleUpdateStatus(2)">确人完成</el-button>
        <el-button type="info" size="small" @click="onReturn()">返回</el-button>
      </div>
      <div style="margin-top:15px;text-align: center" v-if="orderReturnApply.status !=0 && orderReturnApply.status !=1">
        <el-button type="info" size="small" @click="onReturn()">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {getApplyDetail,updateApplyStatus} from '@/api/returnApply';
  import {formatDate} from '@/utils/date';

  const defaultUpdateStatusParam = {
    handleMan: 'admin',
    handleNote: null,
    receiveMan: 'admin',
    receiveNote: null,
    returnAmount: 0,
    status: 0
  };
  const defaultOrderReturnApply = {
    id: null,
    orderId: null,
    productId: null,
    orderSn: null,
    createTime: null,
    memberUsername: null,
    returnAmount: null,
    returnName: null,
    returnPhone: null,
    status: null,
    handleTime: null,
    productPic: null,
    productName: null,
    productBrand: null,
    productAttr: null,
    productCount: null,
    productPrice: null,
    productRealPrice: null,
    reason: null,
    description: null,
    proofPics: null,
    handleNote: null,
    handleMan: null,
    receiveMan: null,
    receiveTime: null,
    receiveNote: null
  };
  export default {
    name: 'returnApplyDetail',
    data() {
      return {
        id: null,
        orderReturnApply: Object.assign({},defaultOrderReturnApply),
        productList: null,
        proofPics: null,
        updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
      }
    },
    created() {
      this.id = this.$route.query.id;
      this.getDetail();
    },
    computed: {
      totalAmount() {
        if (this.orderReturnApply != null) {
          return this.orderReturnApply.productRealPrice * this.orderReturnApply.productCount;
        } else {
          return 0;
        }
      }
    },
    filters: {
      formatStatus(status) {
        if (status === 0) {
          return "待处理";
        } else if (status === 1) {
          return "退货中";
        } else if (status === 2) {
          return "已完成";
        } else {
          return "已拒绝";
        }
      },
      formatNull(value) {
          if(value===undefined||value===null||value===''){
              return '暂无';
          }else{
              return value;
          }
      },
      formatTime(time){
          if(time==null){
              return '暂无';
          }
          let replace = time.replace(/-/g, "/");
          let date = new Date(replace);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatRegion(address) {
        let str = address.province;
        if (address.city != null) {
          str += "  " + address.city;
        }
        str += "  " + address.region;
        return str;
      }
    },
    methods: {
      handleViewOrder(){
        this.$router.push({path:'/oms/orderDetail',query:{id:this.orderReturnApply.orderId}});
      },
      parseProductAttr(attr){
          return JSON.parse(attr);
      },
      imageSplit(image){
          if(image != null || image != ''){
              return image.split(",")[0]
          }

      },
      getDetail() {
        getApplyDetail(this.id).then(response => {
          this.orderReturnApply = response.data;
          this.productList = [];
          this.productList.push(this.orderReturnApply);
          this.updateStatusParam.returnAmount=this.orderReturnApply.returnAmount;
          if (this.orderReturnApply.proofPics != null) {
            this.proofPics = this.orderReturnApply.proofPics.split(",")
            this.$previewRefresh();
          }
          //退货中和完成
          if(this.orderReturnApply.status===1||this.orderReturnApply.status===2){
            this.updateStatusParam.returnAmount=this.orderReturnApply.returnAmount;
          }
        });
      },
      onReturn(){
          this.$router.back();
      },
      handleUpdateStatus(status){
        this.updateStatusParam.status=status;
        this.$confirm('是否要进行此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateApplyStatus(this.id,this.updateStatusParam).then(response=>{
            this.$message({
              type: 'success',
              message: '操作成功!',
              duration:1000
            });
            this.$router.back();
          });
        });
      }
    }
  }
</script>
<style scoped>
  .detail-container {
    position: sticky;
    left: 0;
    right: 0;
    width: 1080px;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
  }

  .standard-margin {
    margin-top: 15px;
  }
  .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>


