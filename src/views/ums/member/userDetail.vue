<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <div class="operate-button-container">
          <el-button size="mini" v-if="userMessage.status == 1" @click="handleFreezeUser(userMessage)">启用用户</el-button>
          <el-button size="mini" v-if="userMessage.status == 2" type="danger" @click="handleFreezeUser(userMessage)">冻结用户</el-button>
          <el-button type="info" size="mini" @click="onReturn()">返回</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">用户基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">用户昵称</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">注册时间</el-col>
          <el-col :span="6" class="table-cell-title">用户头像</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{userMessage.nickname}}</el-col>
          <el-col :span="6" class="table-cell">{{userMessage.phone}}</el-col>
          <el-col :span="6" class="table-cell">{{userMessage.createTime}}</el-col>
          <el-col :span="6" class="table-cell">
            <img preview="2" style="height: 40px; width: 40px" :src="userMessage.icon">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">个人图集</span>
      </div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="3" style="height: 150px; width:150px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px"
                  class="table-cell"
                  v-for="(pic, i) in picList" :key="i">
            <img preview="1" style="height: 150px; width: 150px" :src="pic">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">个人简介</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB">{{userMessage.personalizedSignature | formatNull}}</el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
    import {findUserMemberById, freezeUser} from '@/api/user';
    import {formatDate} from '@/utils/date';

    export default {
        name: 'userDetail',
        inject: ['reload'],
        data() {
            return {
                dialogVisible: false,
                picList: [],
                listLoading: false,
                userMessage: {},
            }
        },
        created: function () {
            findUserMemberById(this.$route.query.id).then(response => {
                this.userMessage = response.result
                if(this.userMessage.pics != null){
                    this.picList = this.userMessage.pics.split(',');
                }else {
                    this.picList[0] = ''
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
            }

        },
        methods: {
            handleFreezeUser(row){
                this.freezeUser(row.id, row.status);
            },
            freezeUser(id, status){
                if(status == 2){
                    this.$confirm('是否要进行该冻结操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append("status", 1)
                        params.append("id",id);
                        freezeUser(params).then(response=>{
                            this.$message({
                                message: '冻结成功！',
                                type: 'success',
                                duration: 1000
                            });
                            this.reload();
                        });
                    })
                }else {
                    this.$confirm('是否要进行该启用操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append("status", 2)
                        params.append("id",id);
                        freezeUser(params).then(response=>{
                            this.$message({
                                message: '启用成功！',
                                type: 'success',
                                duration: 1000
                            });
                            this.reload();
                        });
                    })
                }
            },
            handlerAuditNotPassed(){
                this.dialogVisible = true;
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


