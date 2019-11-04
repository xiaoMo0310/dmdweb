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
          <el-form-item label="用户ID：">
            <el-input v-model="listQuery.userId" class="input-width" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.stratTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="申请结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
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
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="OWD证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.owd"></template>
        </el-table-column>
        <el-table-column label="AOWD证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.aowd"></template>
        </el-table-column>
        <el-table-column label="EFA证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.efa"></template>
        </el-table-column>
        <el-table-column label="RD证书" width="140"align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.rd"></template>
        </el-table-column>
        <el-table-column label="SC证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.sc"></template>
        </el-table-column>
        <el-table-column label="SC证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.sc"></template>
        </el-table-column>
        <el-table-column label="MSD证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.msd"></template>
        </el-table-column>
        <el-table-column label="DM证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.dm"></template>
        </el-table-column>
        <el-table-column label="OWSI" width="140"align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.owsi"></template>
        </el-table-column>
        <el-table-column label="MSDT证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.msdt"></template>
        </el-table-column>
        <el-table-column label="IDCSI证书"width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.idcsi"></template>
        </el-table-column>
        <el-table-column label="MI证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.mi"></template>
        </el-table-column>
        <el-table-column label="CD证书" width="140" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.cd"></template>
        </el-table-column>
        <el-table-column label="申请时间" width="220" align="center">
          <template slot-scope="scope">
            {{scope.row.createTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handUpdate(scope.$index, scope.row)"
                       v-show="scope.row.status!=1"
            >通过审核
            </el-button>
            <el-button size="mini"
                       type="danger "
                       @click="handUpdate(scope.$index, scope.row)"
                       v-show="scope.row.status!=2"
            >不通过审核
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
  import {selectDiveCertificate ,updateDiveCertificateStatusPass,updateDiveCertificateStatusNoPass} from '@/api/diveCertificate';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    userId: null,
    stratTime:null,
    endTime : null
  };
  const defaultTypeOptions=[
    {
      label: '审核中',
      value: 0
    },
    {
      label: '审核通过',
      value: 1
    },
    {
      label: '审核未通过',
      value: 2
    },
  ];
  export default {
    name: 'searchselectDiveCertificate',
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
            label: "审核通过",
            value: 1
          },
          {
            label: "审核不通过",
            value: 2
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(status){
        if(status===0){
          return '审核中';
        }if(status===1){
          return '审核通过';
        }if(status===2){
          return '审核未通过';
        }
      },
      formatTime(time){
        if(time==null){
          return 'N/A';
        }
        let date = new Date(time);
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
      handleDelete(index,row){
        this.deleteselectDiveCertificate(row.id);
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
        if(this.operateType===1){
          this.updateDiveCertificateStatusPass(ids,2);
        }if(this.operateType===2){
          this.updateDiveCertificateStatusPass(ids,1);
        }
        else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      /*handleBatchOperate() {
        if(this.operateType==null){
          this.$message({
            message: '请选择操作类型',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          if(this.operateType != 3){
            this.$message({
              message: '请选择要操作的用户',
              type: 'warning',
              duration: 1000
            });
            return;
          }
        }
        if(this.operateType == 1){
          this.$confirm(
            '是否要进行全部用户审核通过?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            this.sendAllMessage();
          });
        }else {
          this.$confirm(
            '是否要进行该批量操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            let ids=[];
            for(let i=0;i<this.multipleSelection.length;i++){
              ids.push(this.multipleSelection[i].id);
            }
            switch (this.operateType) {
              case this.operates[0].value:
                this.editUserStatus(0,ids);
                this.getList();
                break;
              case this.operates[1].value:
                this.editUserStatus(1,ids);
                this.getList();
                break;
              case this.operates[2].value:
                this.batchSendMessage(ids);
                break;
            }
          });
        }
      },*/
      handleAdd(){
        this.$router.push({path: '/topic/addTopic'})
      },
      handUpdate(index, row){
        this.updateDiveCertificateStatusPass(row.id, row.status);
      },
      getList() {
        this.listLoading = true;
        selectDiveCertificate (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      deleteselectDiveCertificate(ids){
        this.$confirm('是否要删除该话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          deleteselectDiveCertificate(params).then(response=>{
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      },

      updateDiveCertificateStatusPass(id, status){
        if(status == 2){
          this.$confirm('是否通过审核?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            params.append("ids",id);
            updateDiveCertificateStatusPass(params).then(response=>{
              this.$message({
                message: '审核通过成功！',
                type: 'success',
                duration: 1000
              });
              this.getList();
            });
          })
        }if(status == 1){
          this.$confirm('是否不通过审核', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = new URLSearchParams();
            params.append("ids",id);
            updateDiveCertificateStatusNoPass(params).then(response=>{
              this.$message({
                message: '审核不通过成功！',
                type: 'success',
                duration: 1000
              });
              this.getList();
            });
          })
        }
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


