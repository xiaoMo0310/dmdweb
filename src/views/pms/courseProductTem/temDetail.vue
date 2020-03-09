<template>
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前模板状态：{{productTem.showStatus | formatShowStatus}}</span>
        <div class="operate-button-container">
          <el-button size="mini" @click="handleUpdate">编辑</el-button>
          <el-button size="mini" type="info" @click="handleReturn">返回</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="8" class="table-cell-title">产品名称</el-col>
          <el-col :span="8" class="table-cell-title">潜水时间</el-col>
          <el-col :span="8" class="table-cell-title">潜水地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{productTem.productName}}</el-col>
          <el-col :span="8" class="table-cell">{{productTem.divingTime}}</el-col>
          <el-col :span="8" class="table-cell">{{productTem.playAddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">其它装备信息</span>
      </div>
      <el-table
        ref="relateProductTable"
        :data="relateProductList"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="类别ID" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.id}}
          </template>
        </el-table-column>
        <el-table-column label="其他装备名称" align="center">
          <template slot-scope="scope">
            {{scope.row.text}}
          </template>
        </el-table-column>
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
            <p>￥{{scope.row.price}}</p>
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：<span class="color-danger">￥{{productTem.totalPrice}}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="8" class="table-cell-title">产品基础价</el-col>
          <el-col :span="8" class="table-cell-title">其它装备总价格</el-col>
          <el-col :span="8" class="table-cell-title">产品总的价格</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">￥{{productTem.productPrice}}</el-col>
          <el-col :span="8" class="table-cell">￥{{productTem.equipmentPrice}}</el-col>
          <el-col :span="8" class="table-cell">￥{{productTem.totalPrice}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" >
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">潜点介绍</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB" v-html="productTem.divingDescription"></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {getProductTemplateById} from '@/api/courseProductTem';
  import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
  export default {
    name: 'orderDetail',
    components: { Tinymce},
    data() {
      return {
        id: null,
        productTem: {},
        relateProductList: null,
        imageList: null
      }
    },
    created() {
      this.id = this.list = this.$route.query.id;
      getProductTemplateById(this.id).then(response => {
        this.productTem = response.result;
        let relateProduct = this.productTem.relatedProduct
        if(relateProduct !== null){
          this.relateProductList = JSON.parse(relateProduct);
        }
        if(this.productTem.divingImage !== null){
          this.imageList = this.productTem.divingImage.split(",");
        }
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
      formatShowStatus(value) {
        if(value===0){
          return '不显示';
        }else if(value === 1){
          return "正常"
        }
      }
    },
    methods: {
      handleUpdate(){
        this.$router.push({path:'/pms/updateCourseProductTem',query:{id:this.id}});
      },
      handleReturn(){
        this.$router.back();
      },
      handleDeleteOrder(){
        this.$confirm('是否要进行该删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",[this.id]);
          deleteOrder(params).then(response=>{
            this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
            });
            this.$router.back();
          });
        })
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
