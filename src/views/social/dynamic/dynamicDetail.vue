<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">

      <div style="margin-top: 20px">
        <span class="font-small">用户动态详情</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">用户id</el-col>
          <el-col :span="4" class="table-cell-title">用户名</el-col>
          <el-col :span="4" class="table-cell-title">用户头像</el-col>
          <el-col :span="4" class="table-cell-title">发布时间</el-col>
          <el-col :span="4" class="table-cell-title">发布地址</el-col>
          <el-col :span="4" class="table-cell-title">用户类型</el-col>

        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{courseProductMessage.userId}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.dynamicAuthor}}</el-col>
          <el-col :span="4" class="table-cell">
            <img preview="2" style="height: 40px; width: 40px" :src="courseProductMessage.dynamicHeadPortrait">
          </el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.createTime | formatNull}}</el-col>
          <el-col :span="4" class="table-cell2">{{courseProductMessage.dynamicAddress}}</el-col>
          <el-col :span="4" class="table-cell">{{courseProductMessage.userType | formtUserType}}</el-col>

        </el-row>
        <el-row>
          <el-col  class="table-cell-title">动态内容</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell2">
           {{courseProductMessage.dynamicContent}}
          </el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell-title">动态下评论</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell2">
            <div class="table-container">
              <el-table ref="homeAdvertiseTable"
                        :data="list"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                        v-loading="listLoading" border>
                <el-table-column type="selection" width="80" align="center"></el-table-column>
                <!--<el-table-column label="评论id" width="70" align="center">
                  <template slot-scope="scope">{{scope.row.commentId}}</template>
                </el-table-column>-->
                <el-table-column label="用户ID" align="center" width="70">
                  <template slot-scope="scope">{{scope.row.userId}}</template>
                </el-table-column>
               <!-- <el-table-column label="动态ID" align="center" width="70">
                  <template slot-scope="scope">{{scope.row.forDynamicId}}</template>
                </el-table-column>-->
                <el-table-column label="评论人昵称" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.commentName}}{{scope.row.coachName}}</template>
                </el-table-column>
                <!--<el-table-column label="评论人角色" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.userType | formatUserType}}</template>
                </el-table-column>-->
                <el-table-column label="评论时间" width="170" align="center">
                  <template slot-scope="scope">
                    {{scope.row.createTime | formatTime}}
                  </template>
                </el-table-column>
                <el-table-column label="评论内容" width="230" align="center">
                  <template slot-scope="scope">{{scope.row.content | count}}</template>
                </el-table-column>
                <el-table-column label="分类" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.type | formatType}}</template>
                </el-table-column>
                <!--<el-table-column label="IP地址" align="center" width="130">
                  <template slot-scope="scope">{{scope.row.ipAddress}}</template>
                </el-table-column>-->
                <!--<el-table-column label="评论状态" align="center" width="100">
                  <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>-->

                <!--<el-table-column label="回复的日志ID" align="center" width="70">
                  <template slot-scope="scope">{{scope.row.forDiveLogId}}</template>
                </el-table-column>-->

                <el-table-column label="回复给谁" align="center" width="200">
                  <template slot-scope="scope">{{scope.row.forUserTypeName | formatUserTypeName}}{{scope.row.forUserTypeName2}}</template>
                </el-table-column>
                <el-table-column label="操作" width="185" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button size="mini"
                               @click="handleSelect(scope.$index, scope.row)">查看详情
                    </el-button>
                  </template>
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
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">动态图片</span>
      </div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="3" style="height: 150px; width:150px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px"
                  class="table-cell"
                  v-for="(image, i) in imageList" :key="i">
            <img style="height: 150px; width: 150px" :src="image" preview="1">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">动态视频</span>
      </div>
      <div style="margin-top: 20px;height: 600px;width: 300px" >
        <video-player  class="video-player vjs-custom-skin"
                       ref="videoPlayer"
                       :playsinline="true"
                       :options="playerOptions"
        ></video-player>
      </div>
      <el-button type="info" size="small" @click="onReturn('homeAdvertiseFrom')">返回</el-button>
    </el-card>
  </div>
</template>
<script>
  import {queryDynamicById} from '@/api/dynamic';
  import {formatDate} from '@/utils/date';
  import { videoPlayer } from 'vue-video-player'
  import {dynamicCommentsByComment , deleteDynamicComments} from '@/api/dynamicComments';
  import 'video.js/dist/video-js.css'

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: 'reviewDetail',
    components: {
      videoPlayer
    },
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
        operateType: null,
        imageList: null,
        orderNo: null,
        order: {},
        /*imgSrc:null,*/
        reviewMessage: {"id":null, "approvalStatus":null, "failureReason":null},
        courseProductMessage: {},
        contentArrangement: null,
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '4:7', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4',  // 类型
            src: null,//cdn.rfstock.com/092012209_main_xl.mp4',  // 路径
          },],
          poster: "../../static/images/test.jpg", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '暂无视频！', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        },

      }
    },
    created: function () {
      queryDynamicById(this.$route.query.id,this.$route.query.userType).then(response => {
        this.courseProductMessage = response.data;
        if(((this.courseProductMessage.dynamicPicture.split("").reverse().join("")).substring(0,3)).split("").reverse().join("")!="mp4") {
          this.imageList = this.courseProductMessage.dynamicPicture.split(',');
        }else if(((this.courseProductMessage.dynamicPicture.split("").reverse().join("")).substring(0,3)).split("").reverse().join("")==="mp4"){
          this.playerOptions.sources[0].src = this.courseProductMessage.dynamicPicture;
          this.imageList = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3826315951,2112473128&fm=26&gp=0.jpg".split(' ');
        }else if(this.courseProductMessage.dynamicPicture===undefined||this.courseProductMessage.dynamicPicture===""){
          this.imageList = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3826315951,2112473128&fm=26&gp=0.jpg".split(' ');
        }
        if(response.data.contentArrangement != null){
          this.contentArrangement = JSON.parse(this.courseProductMessage.contentArrangement)
        }
      });
      this.getList();
    },

    filters: {
      formtUserType(value){
        if(value === 1){
          return "普通用户";
        }if(value === 2){
          return "教练";
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
      count(count){
        if(count.length>18){
          return count.slice(0,18)+"..."
        }else{
          return count
        }
      },
      formatStatus(status){
        if(status===0){
          return '正常';
        }if(status===1){
          return '正常';
        }if(status===2){
          return '禁止';
        }
      },
      formatUserType(value){
        if (value===1){
          return "普通用户"
        }if(value===2){
          return "教练"
        }
      },
      formatType(type){
        if(type===1){
          return '回复';
        }else{
          return '评论';
        }
      },
      formatTime(time){
        if(time===null){
          return '暂无';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatUserTypeName(value){
        if(value!=null){
          return value;
        }if(value===null || value===""){
          return "一级评论无回复人";
        }
      }

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
      handleSelect(index, row){
        this.$router.push({path:'/comment/commentDetail',query:{forDynamicId:row.forDynamicId,commentId:row.commentId,userType:row.userType}

        })
      },
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
      handleDelete(index,row){
        this.deleteDynamicComments(row.commentId);
      },
      handleBatchOperate(){
        if (this.multipleSelection < 1) {
          this.$message({
            message: '请选择一条记录',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].commentId);
        }
        if(this.operateType===0){
          //删除
          this.deleteDynamicComments(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      getList() {
        this.listLoading = true;
        dynamicCommentsByComment (this.listQuery.pageNum,this.listQuery.pageSize,this.$route.query.id).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        })
      },
      deleteDynamicComments(ids){
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteDynamicComments(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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
  .video-js .vjs-big-play-button{}
</style>


