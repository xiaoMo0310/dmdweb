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
          <el-form-item label="礼品名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="礼品名称"></el-input>
          </el-form-item>
          <el-form-item label="发布起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.stratTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上下架查询：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
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
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加好礼</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="礼品名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="礼品图片"  align="center">
          <template slot-scope="scope" >
            <div v-for="item in getImg(scope.row.picture)">
              <img style="height: 80px" :src="item">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所需积分"  align="center">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>
        <el-table-column label="介绍图片"  align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.introduce"></template>
        </el-table-column>
        <el-table-column label="时间" width="220" align="center">
          <template slot-scope="scope">
            发布时间:{{scope.row.createTime | formatTime}}
            修改时间:{{scope.row.updateTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="状态"  align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatusType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="400" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button size="mini"
                       @click="handUpdateStatus(scope.$index, scope.row)"
                       v-show="scope.row.status===1"
            >上架
            </el-button>
            <el-button size="mini"
                       type="danger "
                       @click="handUpdateStatus2(scope.$index, scope.row)"
                       v-show="scope.row.status===0"
            >下架
            </el-button>
            <el-button size="mini"
                       @click="handSelect(scope.$index, scope.row)"
            >查看添加礼品库存规格
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
  </div>
</template>
<script>
  import {queryIntegralGifts , deleteIntegralGiftsById , updateIntegralGiftsNoPass ,updateIntegralGiftsPass } from '@/api/integralGifts';
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
        operates: [
          {
            label: "删除",
            value: 0
          },
          {
            label: "上架",
            value: 1
          },
          {
            label: "下架",
            value: 2
          }
        ],
        operateType: null,

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
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatStatusType(status){
        if(status===0){
          return "已上架";
        }if(status===1){
          return '已下架';
        }
      },
    },
    methods: {
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
      handleAdd(){
        this.$router.push({path: '/integral/addIntegralGifts'})
      },
      handUpdate(index,row){
        this.$router.push({path: '/integral/updateIntegralGifts', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        queryIntegralGifts (this.listQuery).then(response => {
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
</style>


