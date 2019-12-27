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
          <el-form-item label="标题信息：">
            <el-input v-model="listQuery.title" class="input-width" placeholder="标题信息"></el-input>
          </el-form-item>
          <el-form-item label="用户类型：">
            <el-select v-model="listQuery.userType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="删除状态：">
            <el-select v-model="listQuery.isDelete" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in isDelete"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息类型：">
            <el-select v-model="listQuery.messageType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in messageType"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发送时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.sendTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
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
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.id}}</template>
        </el-table-column>
        <el-table-column label="标题" width="150" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.title}}</template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.content}}</template>
        </el-table-column>
        <el-table-column label="消息类型" width="100" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.messageType | messageType}}</template>
        </el-table-column>
        <el-table-column label="通知用户类型" width="120" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.userType | userType}}</template>
        </el-table-column>
        <el-table-column label="是否撤销" width="96" align="center">

          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateStatus(scope.$index, scope.row.umsNotice)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.umsNotice.isCancel">
            </el-switch>
          </template>
         <!-- <template slot-scope="scope">{{scope.row.umsNotice.isCancel | isCancel}}</template>-->
        </el-table-column>
        <el-table-column label="是否删除" width="96" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.isDelete | isDelete}}</template>
        </el-table-column>
        <el-table-column label="发送人名称" width="110" align="center">
          <template slot-scope="scope">{{scope.row.umsNotice.creator}}</template>
        </el-table-column>
        <el-table-column label="发送时间" width="160" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.umsNotice.createdTime | formatTime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">通知用户列表
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
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
      width="40%" >
      <el-table ref="userNoticeTable"
                :data="noticeMarkVos"
                style="width: 100%; overflow: auto; max-height: 400px"
                v-loading="listLoading" height="400px"  border>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="是否阅读" align="center">
          <template slot-scope="scope">{{scope.row.isRead | isRead}}</template>
        </el-table-column>
        <el-table-column label="阅读时间(分钟)" align="center">
          <template slot-scope="scope">{{scope.row.readTime}}</template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">退 出</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible2"
      width="30%">
      <h1 style="color: #3b7dbc; text-align: center">全部用户</h1>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">退 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,updateStatus,deleteNotice} from '@/api/message';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    userType: null,
    sendTime: null,
    title: null,
    isDelete: null,
    messageType: null
  };
  const defaultTypeOptions = [
    {
      label: '普通用户',
      value: 'member'
    },
    {
        label: '教练用户',
        value: 'coach'
    }
  ];
  const isDelete = [
    {
      label: '已删除',
      value: 0
    },
    {
      label: '未删除',
      value: 1
    }
  ];
  const messageType = [
    {
      label: '系统消息',
      value: 1,
    },
    {
      label: '点赞消息',
      value: 2,
    },
    {
      label: '评论消息',
      value: 3,
    },
  ];

  export default {
    name: 'NoticeList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions: Object.assign({}, defaultTypeOptions),
        isDelete: Object.assign({}, isDelete),
        messageType: Object.assign({}, messageType),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        dialogVisible: false,
        dialogVisible2: false,
        dialogTitle:'',
        noticeMarkVos: [],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
      isDelete(type){
          if(type===0){
              return '删除';
          }else{
              return '正常';
          }
      },
      isCancel(type){
          if(type===0){
              return '已撤销';
          }else{
              return '未撤销';
          }
      },
      isRead(type){
          if(type===0){
              return '未阅读';
          }else{
              return '已阅读';
          }
      },
      messageType(type){
          if(type === 1){
              return '系统消息';
          }else if(type === 2){
              return '点赞消息';
          }else {
              return '评论消息';
          }
      },
      userType(type){
          if(type==='member'){
              return '普通用户';
          }else if(type==='coach'){
              return '教练';
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
      handleUpdate(index, row) {
          if(row.umsNotice.type === 3 && row.noticeMarkVos.length === 0){
              this.dialogVisible2 = true;
              this.dialogTitle = "通知的用户";
          }else {
              this.dialogVisible = true;
              this.dialogTitle = "通知的用户";
              this.noticeMarkVos = row.noticeMarkVos;
          }
      },
      handleUpdateStatus(index,row){
          if(row.isCancel == 1) {
              this.$confirm("不能返回撤销操作!", '警告', {
                  confirmButtonText: '确定',
                  type : "warning"
              }),
              row.isCancel = 0
          }else {
              this.$confirm('是否要撤销发送用户的通知,撤销后将不能返回?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  updateStatus(row.id,{status:row.isCancel}).then(response=>{
                      this.getList();
                      this.$message({
                          type: 'success',
                          message: '修改成功!'
                      });
                  })
              }).catch(() => {
                  this.$message({
                      type: 'success',
                      message: '已取消操作!'
                  });
                  this.getList();
              });
          }
      },
      handleDelete(index,row){
        this.deleteNotice(row.umsNotice.id);
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
          ids.push(this.multipleSelection[i].umsNotice.id);
        }
        if(this.operateType===0){
          //删除
          this.deleteNotice(ids);
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
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.result.list;
          this.total = response.result.total;
        })
      },
      deleteNotice(ids){
        this.$confirm('是否要删除该广告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteNotice(params).then(response=>{
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
</style>


