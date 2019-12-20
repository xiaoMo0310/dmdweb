<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <div class="operate-button-container">
          <el-button size="mini" v-if="courseProductMessage.approvalStatus == 1" @click="handlerExaminationPassed">审核通过</el-button>
          <el-button size="mini" v-if="courseProductMessage.approvalStatus == 1" type="danger" @click="handlerAuditNotPassed">审核不通过</el-button>
          <el-button type="info" size="small" @click="onReturn()">返回</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">商品名称</el-col>
          <el-col :span="4" class="table-cell-title">商品价格</el-col>
          <el-col :span="4" class="table-cell-title">商品状态</el-col>
          <el-col :span="4" class="table-cell-title">商品类型</el-col>
          <el-col :span="4" class="table-cell-title">地点</el-col>
          <el-col :span="4" class="table-cell-title">游玩时长</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{courseProductMessage.productName}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.price}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.status | statusType}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.productType | productType}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.location}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.lengthPlay}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-cell-title">商品标题</el-col>
          <el-col :span="4" class="table-cell-title">人数限制</el-col>
          <el-col :span="4" class="table-cell-title">开始时间</el-col>
          <el-col :span="4" class="table-cell-title">结束时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-cell">{{courseProductMessage.title}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.numberLimit}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.startTime | formatTime}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.endTime | formatTime}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品图片</span>
      </div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="3" style="height: 150px; width:150px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px"
                  class="table-cell"
                  v-for="(image, i) in imageList" :key="i">
            <img preview="1" style="height: 150px; width: 150px" :src="image">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品内容</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="12" class="table-cell-title">费用包含</el-col>
          <el-col :span="12" class="table-cell-title">费用不含</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-cellB">{{courseProductMessage.costIncludes | formatNull}}</el-col>
          <el-col :span="12" class="table-cellB">{{courseProductMessage.costNotIncludes | formatNull}}</el-col>
        </el-row>

        <el-row>
          <el-col :span="12" class="table-cell-title">购买须知</el-col>
          <el-col :span="12" class="table-cell-title">内容安排</el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="table-cellB">{{courseProductMessage.purchaseNotes | formatNull}}</el-col>
          <el-col :span="12" class="table-cellB">
            <div v-if="contentArrangement != null" v-for="(item, i) in contentArrangement" :key="i">
              <span style="text-align: left" v-if="contentArrangement != null" > {{item.date}}: {{item.message}}</span>
            </div>
            <div v-if="contentArrangement === null" >
              <span style="text-align: left" v-if="contentArrangement === null">{{contentArrangement | formatNull}}</span>
            </div><br>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="text-align: left" class="table-cell-title">产品介绍</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB">{{courseProductMessage.productDescription | formatNull}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" v-if="courseProductMessage.approvalStatus === 3">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">审核未通过原因</span>
      </div>
      <div class="table-layout" v-if="courseProductMessage.approvalStatus === 3">
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB">{{courseProductMessage.failureReason | formatNull}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      title="不通过原因说明"
      :visible.sync="dialogVisible" width="30%">
      <span style="vertical-align: top">原因：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="reviewMessage.failureReason">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateApprovalStatus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import {findCourseProductById, updateApprovalStatus} from '@/api/courseProduct';
    import {formatDate} from '@/utils/date';

    export default {
        name: 'reviewDetail',
        data() {
            return {
                dialogVisible: false,
                imageList: null,
                orderNo: null,
                order: {},
                reviewMessage: {"id":null, "approvalStatus":null, "failureReason":null},
                courseProductMessage: {},
                contentArrangement: null,
                listLoading: false,
                dialogVisible:false,
            }
        },
        created: function () {
            findCourseProductById(this.$route.query.id).then(response => {
                this.courseProductMessage = response.result
                if(this.courseProductMessage.image != null){
                  this.imageList = this.courseProductMessage.image.split(',');
                }
                if(response.result.contentArrangement != null || response.result.contentArrangement != ''){
                    this.contentArrangement = JSON.parse(this.courseProductMessage.contentArrangement)
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
            formatTime(time){
                if(time==null){
                    return 'N/A';
                }
                let replace = time.replace(/-/g, "/");
                let date = new Date(replace);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
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
            productType(type){
                if(type === 1){
                    return "学证"
                }else {
                    return "潜水"
                }
            },
            statusType(type){
                if(type === 1){
                    return "在售"
                }else if(type === 2){
                    return "下架"
                }else {
                    return "删除"
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
            handlerExaminationPassed() {
                this.$confirm('确定审核通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.reviewMessage.id = this.courseProductMessage.id;
                    this.reviewMessage.approvalStatus = 2;
                    updateApprovalStatus(this.reviewMessage).then(response=>{
                        this.$message({
                            message: '审核成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.$router.back();
                    });
                })
            },
            handlerAuditNotPassed(){
                this.dialogVisible = true;
            },
            handleUpdateApprovalStatus(){
                this.$confirm('确定审核不通过?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                }).then(() => {
                    this.reviewMessage.id = this.courseProductMessage.id;
                    this.reviewMessage.approvalStatus = 3;
                    updateApprovalStatus(this.reviewMessage).then(response=>{
                        this.$message({
                            message: '审核成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.$router.back();
                    });
                })
            },
            onReturn(){
                this.$router.back();
            },
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

  .table-cellB {
    height: 180px;
    line-height: 25px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: left;
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


