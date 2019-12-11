<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">

      <div style="margin-top: 20px">
        <span class="font-small">用户动态详情</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">用户id</el-col>
          <el-col :span="6" class="table-cell-title">用户名</el-col>
          <el-col :span="6" class="table-cell-title">发布时间</el-col>
          <el-col :span="6" class="table-cell-title">发布地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{courseProductMessage.userId}}</el-col>
          <el-col :span="6" class="table-cell">{{courseProductMessage.dynamicAuthor}}</el-col>
          <el-col :span="6" class="table-cell">{{courseProductMessage.createTime | formatNull}}</el-col>
          <el-col :span="6" class="table-cell">{{courseProductMessage.dynamicAddress}}</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell-title">动态内容</el-col>
        </el-row>
        <el-row>
          <el-col  class="table-cell">
           {{courseProductMessage.dynamicContent}}
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
  import 'video.js/dist/video-js.css'
  export default {
    components: {
      videoPlayer
    },
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
      queryDynamicById(this.$route.query.id).then(response => {
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

  .table-cell {
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
  .video-js .vjs-big-play-button{}
</style>


