<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>意见反馈类型列表</span>
          <el-button
            size="medium"
            class="btn-add"
            @click="handleAdd(scope.$index, scope.row)" >添加意见反馈类型
          </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="问题类型名称" align="center" >
          <template slot-scope="scope">{{scope.row.questionName}}</template>
        </el-table-column>

        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatusType}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="修改时间" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.updateTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="启动/禁用" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateStatus(scope.$index, scope.row)"
              :active-value="0"
              :inactive-value="1"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
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
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="productAttrCatForm":model="productAttrCate" :rules="rules" label-width="120px">
        <el-form-item label="问题类型名称:" prop="questionName">
          <el-input v-model="productAttrCate.questionName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status" v-if="productAttrCate.status === null">
          <el-input v-if="productAttrCate.createTime === null" v-model="productAttrCate.status" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户上传时间" prop="createTime" v-if="productAttrCate.createTime === null">
          <el-input v-if="productAttrCate.createTime === null" v-model="productAttrCate.createTime" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {queryProblemFeedback , saveOrUpdate , updateStatus ,addFeedback} from '@/api/feedback';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    name: null,
    stratTime:null,
    endTime:null
  };
  const defaultTypeOptions=[
    {
      label: '上架',
      value: 0
    },
    {
      label: '下架',
      value: 1
    },
  ];
  export default {
    name: 'searchqueryIntegralGifts',

    data() {
      return {
        typeOptions:Object.assign({},defaultTypeOptions),

        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        /*msg :[
         {
         picture:null
         },
         ],*/
        operateType: null,
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null,
          questionName:"",
        },
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        }

      }

    },
    created() {
      this.getList();

    },

    filters:{
      formatTime(time){
        if(time==null){
          return '暂无';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatusType(status){
        if(status===0){
          return "启动";
        }if(status===1){
          return '禁用';
        }
      },
    },
    methods: {
      handleUpdate(index, row) {
          this.dialogVisible = true;
          this.dialogTitle = "请修改问题类型名称";
          this.productAttrCate.questionName = row.questionName;
          this.productAttrCate.status = row.status;
          this.productAttrCate.id = row.id;
          this.productAttrCate.createTime = row.createTime;
      },
      handleAdd(index, row) {
        this.dialogVisible = true;
        this.dialogTitle = "请添加问题类型名称";
        this.productAttrCate.questionName = row.questionName;
      },
      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new URLSearchParams();
            data.append("questionName",this.productAttrCate.questionName);
            data.append("status",this.productAttrCate.status);
            data.append("id",this.productAttrCate.id);
            data.append("createTime",this.productAttrCate.createTime);
            console.log(this.dialogTitle)
            console.log("=============================================")
            if(this.dialogTitle==="请修改问题类型名称"){
              updateStatus(this.productAttrCate.id,data).then(response=>{
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }else if(this.dialogTitle==="请添加问题类型名称"){
              addFeedback(data).then(response=>{
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleUpdateStatus(index,row){
        this.listQuery.id= row .id;
        this.listQuery.status = row.status;
        this.$confirm('是否要修改启用/禁用状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          saveOrUpdate(this.listQuery).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消操作!'
          });
          this.getList();
        });
      },
      handUpdateStatus(index, row){
        this.updateDiveCertificateStatusPass(row.id);
      },
      updateDiveCertificateStatusPass(id){
        this.$confirm('是否上架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",id);
          updateIntegralGiftsPass(params).then(response=>{
            this.$message({
              message: '上架成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      },
      handUpdateStatus2(index, row){
        this.updateDiveCertificateStatusPass2(row.id);
      },
      updateDiveCertificateStatusPass2(id){
        this.$confirm('是否下架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("ids",id);
          updateIntegralGiftsNoPass(params).then(response=>{
            this.$message({
              message: '下架成功！',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        })
      },
      handSelect(index,row){
        this.$router.push({path: '/integral/selectSpe', query: {id: row.id}})
      },
      handAddSpe(index,row){
        this.$router.push({path: '/integral/addSpe', query: {id: row.id}})
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
        this.deleteIntegralGiftsById(row.id);
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
          ids.push(this.multipleSelection[i].id);
        }
        if(this.operateType===0){
          //删除
          this.deleteIntegralGiftsById(ids);
        }
        if(this.operateType===2){
          //删除
          this.updateDiveCertificateStatusPass2(ids);
        }
        if(this.operateType===1){
          //删除
          this.updateDiveCertificateStatusPass(ids);
        }
        else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      /*handleAdd(){
        this.$router.push({path: '/feedback/addFeedbackList'})
      },*/
      /*handUpdate(index,row){
        this.$router.push({path: '/feedback/addFeedbackList', query: {id: row.id}})
      },*/
      getList() {
        this.listLoading = true;
        queryProblemFeedback(this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      getImg(val){
        if(val!=null){
          var words = val.split(',');
          return words;
        }
      },
      deleteIntegralGiftsById(ids){
        this.$confirm('是否要删除该礼品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteIntegralGiftsById(params).then(response=>{
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
  .input-width {
    width: 203px;
  }
  .app-container {
    width: 100%;
    margin-bottom: 50px;
  }
</style>


