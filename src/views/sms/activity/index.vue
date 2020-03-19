<template>
  <div class="app-container">
    <el-card>
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
          <el-form-item label="产品名称：">
            <el-input v-model="listQuery.productName" class="input-width" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="潜水地址：">
            <el-input v-model="listQuery.playAddress" class="input-width" placeholder="潜水地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        type="primary"
        @click="handleAddProductCate()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="shopActivityTable"
                style="width: 100%"
                :data="list"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="活动标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="活动时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.activityTime}}</template>
        </el-table-column>
        <el-table-column label="活动图片" width="250" align="center">
          <template slot-scope="scope">
            <div style="height: 100px; width:100px; border-left: 0px solid #DCDFE6; border-top: 0px solid #DCDFE6; margin: 6px; padding: 0px; float: left" v-for="(image, i) in getImageList(scope.row.activityImage)" :key="i">
              <el-image style="height: 100px; width: 100px" :src="image" :preview-src-list="getImageList(scope.row.activityImage)"></el-image>
              <div class="block">
                <el-image>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="活动详情" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="shopActivityDetail(scope.$index, scope.row.activityDetail)">点击查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteProductTem(scope.$index, scope.row)">删除
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
        <div  v-html="activityDetail" style="border: 1px"/>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">退 出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchList,deleteShopActivity,updateShowStatus} from '@/api/shopActivity'

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    title: null,
    activityTime: null
  };
  export default {
    name: "shopActivityList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        dialogVisible: false,
        dialogTitle: null,
        multipleSelection: [],
        activityDetail: null,
        listQuery: Object.assign({}, defaultListQuery),
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null,
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getImageList(val){
        return val.split(",");
      },
      shopActivityDetail(index, val) {
        this.dialogVisible = true;
        this.dialogTitle = "活动内容";
        this.activityDetail = val
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.result.list;
          this.total = response.result.total;
        });
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',row.showStatus);
        updateShowStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/sms/updateShopActivity',query:{id:row.id}});
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
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
          this.handleDelete(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      deleteProductTem(index, row){
        this.handleDelete(row.id);
      },
      handleDelete(ids) {
        this.$confirm('是否要删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteShopActivity(params).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
    filters: {

    }
  }
</script>

<style scoped>

</style>
