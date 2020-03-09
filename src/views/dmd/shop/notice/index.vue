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
          <el-form-item label="删除状态：">
            <el-select v-model="listQuery.isDelete" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in isDelete"
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
      <span>数据列表</span>
      <el-button size="small" type="primary" plain class="btn-add" @click="sendNotice()">发布公告</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="noticeTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="标题" width="500" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="内容" align="center" width="400">
          <template slot-scope="scope">
            <el-button size="mini" @click="shopNoticeDetail(scope.$index, scope.row)">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.isDelete | isDelete}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
      <el-card shadow="never" style="width: 100%; overflow: auto; max-height: 400px">
        <div  v-html="shopNotice.content" style="border: 1px"/>
      </el-card>
      <!--<el-table ref="shopNoticeDialog"
                :data="shopNotice"

                v-loading="listLoading" height="400px"  border>
        <el-table-column label="标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <div v-html="scope.row.content"/>
        </el-table-column>
      </el-table>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">退 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {fetchList,deleteShopNotice} from '@/api/shopNotice';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    title: null,
    isDelete: null
  };
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

  export default {
    name: 'shopNoticeList',
    data() {
      return {
        shopNotice: {'title':null, 'content':null},
        listQuery: Object.assign({}, defaultListQuery),
        isDelete: Object.assign({}, isDelete),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        dialogVisible: false,
        dialogTitle:'',
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
      sendNotice(){
        this.$router.push({path: '/dmd/sendNotice'})
      },
      handleDelete(index,row){
        this.deleteNoticedeleteNotice(row.id);
      },
      shopNoticeDetail(index, row) {
          this.dialogVisible = true;
          this.dialogTitle = "公告内容";
          this.shopNotice = row;
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
          this.deleteNoticedeleteNotice(ids);
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
      deleteNoticedeleteNotice(ids){
        this.$confirm('是否要删除该公告?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteShopNotice(params).then(response=>{
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


