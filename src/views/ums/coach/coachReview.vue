<template> 
  <div class="app-container">

    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px" >
        <el-button
          style="float:right;margin-right: 15px; margin-left: 30px"
          @click="handleResetSearch()"
          type="primary"
          size="small">
          重置
        </el-button>
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px" align="right">
          <el-form-item label="状态：">
            <el-select v-model="listQuery.approvalStatus" placeholder="全部" clearable @change="getList" class="input-width">
              <el-option v-for="item in approvalStatusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>教练审核列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="教练名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.coachName}}</template>
        </el-table-column>
        <el-table-column label="教练昵称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>

        <el-table-column label="手机号"width="150" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="邀请码"width="100" align="center">
          <template slot-scope="scope">{{scope.row.invitationCode }}</template>
        </el-table-column>
        <el-table-column label="证书图片" align="center">
          <template slot-scope="scope">
            <div style="height: 100px; width:100px; border-left: 1px solid #DCDFE6; border-top: 1px solid #DCDFE6; margin-left: 6px; padding: 0px; float: left" v-for="(image, i) in getImageList(scope.row.certificatePic)" :key="i">
              <div class="block">
                <el-image style="height: 100px; width: 100px" :src="image" :preview-src-list="getImageList(scope.row.certificatePic)"></el-image>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态"width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | approvalStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="320">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleCoachDetail(scope.$index, scope.row)">详细信息
            </el-button>
            <el-button size="mini" type="danger" :disabled= 'scope.row.status === 3'
                       @click="handleReviewDetail(scope.$index, scope.row, 2)">审核通过
            </el-button>
            <el-button size="mini" type="danger" :disabled= 'scope.row.status === 3'
                       @click="handleNoReviewDetail(scope.$index, scope.row, 3)">审核不通过
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
    <el-dialog
      title="审核原因"
      :visible.sync="reviewCoach.dialogVisible" width="30%" :rules="rules">
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
    import {findByStatus, updateCoachMessageById} from '@/api/coach';
    import {formatDate} from '@/utils/date';
    import image_error from '@/assets/images/image_error.png';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        status: null
    };
    const defaultReviewCoach = {
        dialogVisible: false,
        failureReason: null,
        coachId: null
    }
    export default {
        name: 'searchintegrationRule',
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                total: null,
                listLoading: false,
                multipleSelection: [],
                reviewCoach: Object.assign({}, defaultReviewCoach),
                approvalStatusOptions: [
                    {
                        label: "待审核",
                        value: 1,
                        default: true
                    },
                    {
                        label: "审核通过",
                        value: 2
                    },
                    {
                        label: "审核未通过",
                        value: 3
                    }
                ],
                operateType: null,
                rules: {
                    failureReason: [
                        {required: true, message: '请输入未通过原因', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 500 个字符', trigger: 'blur'}
                    ]
              },
            }
        },
        created() {
            this.getList();
        },
        filters:{
            formatTime(time){
                if(time==null){
                    return 'N/A';
                }
                let replace = time.replace(/-/g, "/");
                let date = new Date(replace);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            approvalStatus(value){
                if(value === 1) {
                    return "待审核"
                }else {
                    return "审核未通过"
                }
            }

        },
        methods: {
            moveErrorImg:function (event) {
                event.currentTarget.src = image_error;
            },
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
            handleCoachDetail(index, row){
                this.$router.push({path:'/ums/coachDetail',query:{id:row.id}})
            },
            getList() {
                this.listLoading = true;
                findByStatus (this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                })
            },
            getImageList(imageList){
                if(imageList != null){
                    return  imageList.split(',');
                }
            },
            handleNoReviewDetail(index, row, status){
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
                        this.getList();
                    }
                })
            },
            handleReviewDetail(index, row){
                this.reviewCoach.coachId = row.id;
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
            }
        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


