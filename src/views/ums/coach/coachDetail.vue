<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <div class="operate-button-container">
          <el-button size="mini" v-if="coachMessage.status == 0" @click="handleFreezeUser(coachMessage)">启用用户</el-button>
          <el-button size="mini" v-if="coachMessage.status == 2" type="danger" @click="handleFreezeUser(coachMessage)">冻结用户</el-button>
          <el-button size="mini" v-if="coachMessage.status == 1" type="danger" @click="handleReviewDetail">审核通过</el-button>
          <el-button size="mini" v-if="coachMessage.status == 1" type="danger" @click="handleNoReviewDetail(coachMessage, 3)">审核不通过</el-button>
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
          <el-col :span="6" class="table-cell">{{coachMessage.nickName}}</el-col>
          <el-col :span="6" class="table-cell">{{coachMessage.phone}}</el-col>
          <el-col :span="6" class="table-cell">{{coachMessage.createdTime}}</el-col>
          <el-col :span="6" class="table-cell">
            <img preview="2" style="height: 40px; width: 40px" :src="coachMessage.icon">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">个人证书图片</span>
      </div>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="3" style="height: 150px; width:150px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px"
                  class="table-cell"
                  v-for="(pic, i) in certificatePicList" :key="i">
            <img preview="1" style="height: 150px; width: 150px" :src="pic">
          </el-col>
        </el-row>
      </div>

      <div style="margin-top: 20px" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">个人图集</span>
      </div>
      <div style="margin-top: 20px" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <el-row>
          <el-col :span="3" style="height: 150px; width:150px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px"
                  class="table-cell"
                  v-for="(pic, i) in personalAlbumList" :key="i">
            <img preview="1" style="height: 150px; width: 150px" :src="pic">
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">个人简介</span>
      </div>
      <div class="table-layout" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB">{{coachMessage.personalizedSignature | formatNull}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">邀请用户列表</span>
      </div>
      <div class="table-container" v-if="coachMessage.status === 0 || coachMessage.status === 2">
        <el-table ref="homeAdvertiseTable"
                  :data="list"
                  style="width: 100%;"
                  @selection-change="handleSelectionChange"
                  v-loading="listLoading" border>
          <el-table-column label="用户名" align="center">
            <template slot-scope="scope">{{scope.row.username}}</template>
          </el-table-column>
          <el-table-column label="用户昵称" align="center">
            <template slot-scope="scope">{{scope.row.nickname}}</template>
          </el-table-column>
          <el-table-column label="手机号码" align="center">
            <template slot-scope="scope">{{scope.row.phone}}</template>
          </el-table-column>
          <el-table-column label="个人简介" width="350" align="center" style="overflow: hidden; white-space: nowrap;text-overflow:ellipsis;">
            <template slot-scope="scope">{{scope.row.personalizedSignature | ellipsis | formatNull}}</template>
          </el-table-column>
          <el-table-column label="注册时间" align="center">
            <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handlerUserDetail(scope.$index, scope.row)">详细信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container" v-if="coachMessage.status === 0 || coachMessage.status === 2">
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
      <div style="margin-top: 20px" v-if="coachMessage.status === 3">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">审核未通过原因</span>
      </div>
      <div class="table-layout" v-if="coachMessage.status === 3">
        <el-row>
          <el-col :span="24" style="height: 80px" class="table-cellB">{{coachMessage.failureReason | formatNull}}</el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      title="审核原因"
      :visible.sync="reviewCoach.dialogVisible" width="30%">
      <el-form :model="reviewCoach"
               ref="reviewCoachForm"
               :rules="rules"
               label-width="150px">
        <el-form-item label="未通过原因：" prop="failureReason">
          <el-input
            style="width: 80%"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="reviewCoach.failureReason">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="updateNoReviewDetail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
    import {findCoachById, freezeUser, updateCoachMessageById} from '@/api/coach';
    import {findByInvitationCode} from '@/api/user';
    import {formatDate} from '@/utils/date';
    const defaultReviewCoach = {
        dialogVisible: false,
        failureReason: null,
        coachId: null
    }
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        invitationCode: null,
    };

    export default {
        name: 'userDetail',
        inject: ['reload'],
        data() {
            return {
                dialogVisible: false,
                personalAlbumList: [],
                certificatePicList: [],
                listLoading: false,
                coachMessage: {},
                reviewCoach: Object.assign({}, defaultReviewCoach),
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                total: null,
                rules: {
                    failureReason: [
                        {required: true, message: '请输入未通过原因', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 500 个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        created: function () {
            findCoachById(this.$route.query.id).then(response => {
                this.coachMessage = response.result
                if(response.code === 200 && this.coachMessage.status != 1 && this.coachMessage.status != 3){
                    //根据教练邀请码查询用户列表信息
                    this.getList();
                }
                if(this.coachMessage.personalAlbum != null){
                    this.personalAlbumList = this.coachMessage.personalAlbum.split(',');
                }else {
                    this.personalAlbumList[0] = ''
                }
                if(this.coachMessage.certificatePic != null){
                    this.certificatePicList = this.coachMessage.certificatePic.split(',');
                }else {
                    this.certificatePicList[0] = ''
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
            ellipsis (value) {
                if(value===undefined||value===null||value===''){
                    return '暂无';
                }else if(value.length>20){
                    return value.substr(0, 20) + '...';
                }else{
                    return value;
                }
            }

        },
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
                this.getList();
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
            handleCourseProductDetail(index, row){
                this.$router.push({path:'/pms/courseProductDetail',query:{id:row.id}})
            },
            handlerUserDetail(index,row){
                this.$router.push({path: '/ums/userDetail', query: {id: row.id}})
            },
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
                        params.append("status", 0)
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
            handleNoReviewDetail(row, status){
                this.reviewCoach.dialogVisible = true;
                this.reviewCoach.coachId = row.id;
                this.reviewCoach.status = status;
            },
            cancel(){
                this.reviewCoach = Object.assign({}, defaultReviewCoach)
            },
            updateCoachMessageById(){
                updateCoachMessageById (this.reviewCoach).then(response => {
                    if(response.code === 200){
                        this.$message({
                            message: '审核成功',
                            type: 'success',
                            duration: 1000
                        });
                        this.cancel();
                        this.reload();
                    }
                })
            },
            handleReviewDetail(){
                    this.reviewCoach.coachId = this.coachMessage.id;
                    this.reviewCoach.status = 2;
                    this.$confirm('确定要审核通过吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.updateCoachMessageById();
                    })

            },
            updateNoReviewDetail(){
                this.$confirm('确定审核不通过吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.updateCoachMessageById();
                })
            },
            getList(){
                let params = new URLSearchParams();
                params.append("invitationCode", this.coachMessage.invitationCode)
                findByInvitationCode(this.listQuery, params).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
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
    overflow: auto;
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


