<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">

      <div style="margin-top: 20px">
        <span class="font-small">用户动态详情</span>
        <el-button type="info" size="mini" @click="onReturn('homeAdvertiseFrom')" style="float:right;margin-right: 15px">返回</el-button>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">评论人昵称</el-col>
          <el-col :span="6" class="table-cell-title">评论人头像</el-col>
          <el-col :span="6" class="table-cell-title">评论时间</el-col>
          <el-col :span="6" class="table-cell-title">评论ip</el-col>
        </el-row>
        <el-row>
          <el-col :span="6"   class="table-cell">{{courseProductMessage.commentName}}</el-col>
          <el-col :span="6" class="table-cell">
            <img preview="2" style="height: 40px; width: 40px" :src="courseProductMessage.commentHeadPortrait">
          </el-col>
          <el-col :span="6" class="table-cell">{{courseProductMessage.createTime | formatNull}}</el-col>
          <el-col :span="6" class="table-cell">{{courseProductMessage.ipAddress}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell-title">分类</el-col>
          <el-col :span="5" class="table-cell-title">评论状态</el-col>
          <el-col :span="4" class="table-cell-title">用户类型</el-col>
          <el-col :span="5" class="table-cell-title">回复/评论的动态id</el-col>
          <el-col :span="5" class="table-cell-title">动态发布时间</el-col>

        </el-row>
        <el-row>
          <el-col :span="5" class="table-cell">{{courseProductMessage.type | formtType}}</el-col>
          <el-col :span="5" class="table-cell">{{courseProductMessage.status | formtStatus}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.userType | formtUserType}}</el-col>
          <el-col :span="5" class="table-cell">{{courseProductMessage.dynamicId}}</el-col>
          <el-col :span="5" class="table-cell">{{courseProductMessage.createTimeByDynamic | formatNull}}</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell-title">评论/回复内容</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell2">
            {{courseProductMessage.content}}
          </el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell-title">评论/回复的动态内容</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell2">
            {{courseProductMessage.dynamicContent}}
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {queryDynamicById} from '@/api/dynamicComments';
  import {formatDate} from '@/utils/date';
  import 'video.js/dist/video-js.css'
  export default {
    name: 'reviewDetail',
    data() {
      return {
        imageList: null,
        orderNo: null,
        order: {},
        /*imgSrc:null,*/
        reviewMessage: {"id":null, "approvalStatus":null, "failureReason":null},
        courseProductMessage: {},
        contentArrangement: null,
        listLoading: false,
      }
    },
    created: function () {
      queryDynamicById(this.$route.query.forDynamicId,this.$route.query.commentId,this.$route.query.userType).then(response => {
        this.courseProductMessage = response.data;
        if(response.data.contentArrangement != null){
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
      formtType(value){
        if(value === 0 ){
          return "评论";
        }if(value === 1){
          return "回复";
        }
      },
      formtStatus(value){
        if(value === 0){
          return "正常";
        }if(value === 1){
          return "待审核"
        }if(value === 2){
          return "静止";
        }
      },
      formtUserType(value){
        if(value === 1){
          return "普通用户";
        }if(value === 2){
          return "教练";
        }
      },
      formatTime(time){
        if(time===null){
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


    },
    methods: {
      onReturn(){
        this.$router.back();
      },
      formatTime(time) {
        if (time == null || time === '') {
          return '';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },

      handlerAuditNotPassed(){
        this.dialogVisible = true;
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

  .table-cell2 {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
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


