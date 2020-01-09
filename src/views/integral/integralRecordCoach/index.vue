<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="会员ID：">
            <el-input v-model="listQuery.memberId" class="input-width" placeholder="会员ID"></el-input>
          </el-form-item>
          <el-form-item label="收入支出记录：">
            <el-select v-model="listQuery.changeType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户昵称：">
            <el-input v-model="listQuery.userName" class="input-width" placeholder="会员ID"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center" width="80">
          <template slot-scope="scope">{{scope.row.memberId}}</template>
        </el-table-column>
        <el-table-column label="教练昵称" align="center" width="80">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="更新时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="改变类型" align="center">
          <template slot-scope="scope">{{scope.row.changeType | formatChangeType}}</template>
        </el-table-column>
        <el-table-column label="积分改变数量" width="110" align="center">
          <template slot-scope="scope">{{scope.row.changeCount}}</template>
        </el-table-column>
        <el-table-column label="操作人员" width="150" align="center">
          <template slot-scope="scope">{{scope.row.operateMan}}</template>
        </el-table-column>
        <el-table-column label="操作备注" align="center" width="170">
          <template slot-scope="scope">{{scope.row.operateNote}}</template>
        </el-table-column>
        <el-table-column label="积分来源" align="center" width="100">
          <template slot-scope="scope">{{scope.row.sourceType | formatSourceType}}</template>
        </el-table-column>
        <!--<el-table-column label="积分动向" align="center"  width="170">
          <template slot-scope="scope">{{scope.row.integralTrend}}</template>
        </el-table-column>-->
        <el-table-column label="用户总积分" align="center">
          <template slot-scope="scope">{{scope.row.integration}}</template>
        </el-table-column>

        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">增加积分
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleUpdateReduce(scope.$index, scope.row)">减少积分
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
        <el-form-item label="用户ID" prop="memberId" v-if="productAttrCate.memberId === null">
          <el-input v-if="productAttrCate.memberId === null" v-model="productAttrCate.memberId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="积分改变数量" prop="changeCount">
          <el-input v-model="productAttrCate.changeCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作人员" prop="operateMan">
          <el-input v-model="productAttrCate.operateMan" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作备注" prop="operateNote">
          <el-input v-model="productAttrCate.operateNote" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="积分动向" prop="integralTrend" >
          <el-input v-model="productAttrCate.integralTrend" auto-complete="off"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {integralRecordListCoach ,updateIntegrationCoach ,updateIntegrationReduceCoach} from '@/api/integralRecord';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    memberId: null,
    startTime: null,
    endTime:null,
    userName:null
  };
  const defaultTypeOptions=[
    {
      label: '收入',
      value: 0
    },
    {
      label: '支出',
      value: 1
    },
  ];
  export default {
    name: 'searchtopicList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions),
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
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null,
          changeCount:null,
          operateMan:"",
          operateNote:"",
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
      formatType(changeType){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(changeType===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatChangeType(changeType){
        if(changeType===0){
          return '收入';
        }if(changeType===1){
          return '支出';
        }
      },
      formatSourceType(sourceType){
        if(sourceType===0){
          return '购物';
        }if(sourceType===1){
          return '动态或评论';
        }if(sourceType===2){
          return '管理员修改';
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
    },
    methods: {
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.dialogTitle = "请选择增加数额";
        this.productAttrCate.changeCount = row.changeCount;
        this.productAttrCate.operateMan = row.operateMan;
        this.productAttrCate.id = row.id;
        this.productAttrCate.operateNote = row.operateNote;
        //this.productAttrCate.integralTrend = row.integralTrend;
        this.productAttrCate.memberId = row.memberId;

      },
      handleUpdateReduce(index, row) {
        this.dialogVisible = true;
        this.dialogTitle = "请选择减少数额";
        this.productAttrCate.changeCount = row.changeCount;
        this.productAttrCate.operateMan = row.operateMan;
        this.productAttrCate.id = row.id;
        this.productAttrCate.operateNote = row.operateNote;
        //this.productAttrCate.integralTrend = row.integralTrend;
        this.productAttrCate.memberId = row.memberId;

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
        this.deleteintegralRecordListCoach(row.id);
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
          this.deleteintegralRecordListCoach(ids);
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
        integralRecordListCoach (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      deleteintegralRecordListCoach(ids){
        this.$confirm('是否要删除该评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteintegralRecordListCoach(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },
      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new URLSearchParams();
            data.append("changeCount",this.productAttrCate.changeCount);
            data.append("operateMan",this.productAttrCate.operateMan);
            data.append("operateNote",this.productAttrCate.operateNote);
            data.append("integralTrend",this.productAttrCate.integralTrend);
            data.append("memberId",this.productAttrCate.memberId);
            if(this.dialogTitle==="请选择增加数额"){
              updateIntegrationCoach(this.productAttrCate.id,data).then(response=>{
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }else{
              updateIntegrationReduceCoach(this.productAttrCate.id,data).then(response=>{
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
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>





