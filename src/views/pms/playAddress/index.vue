<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>游玩地址</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加地址</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="地址" width="150"  align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="地址简介" width="320 " align="center">
          <template slot-scope="scope">{{scope.row.addressIntroduction}}</template>
        </el-table-column>
        <el-table-column label="图集"  align="center">
          <template slot-scope="scope">
            <div style="height: 100px; width:100px; border-left: 0px solid #DCDFE6; border-top: 0px solid #DCDFE6; margin: 6px; padding: 0px; float: left" v-for="(image, i) in getImageList(scope.row.atlas)" :key="i">
              <!--<img preview="1" style="height: 100px; width: 100px" :src="image" v-on:error.once="moveErrorImg($event)">-->
                <el-image style="height: 100px; width: 100px" :src="image" :preview-src-list="getImageList(scope.row.atlas)"></el-image>
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
        <el-table-column label="是否默认" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateIsDefault(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.isDefault">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="启动/禁用" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleUpdateStatus(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="2"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleUpdate(scope.$index, scope.row)">编辑
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
  </div>
</template>
<script>
  import {fetchList,saveOrUpdate, updateIsDefaultById, deletePlayAddress} from '@/api/playAddress';
  import {formatDate} from '@/utils/date';
  import image_error from '@/assets/images/image_error.png';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    id: null,
    status: null,
    isDefault: null,
  };

  export default {
    name: 'homeAdvertiseList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operateType: null,
        operates: [
            {
                label: "删除",
                value: 0
            }
        ],
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(type){
        if(type===1){
          return 'APP首页轮播';
        }else{
          return 'PC首页轮播';
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
      moveErrorImg:function (event) {
          event.currentTarget.src = image_error;
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
      getImageList(imageList){
          if(imageList != null){
              return  imageList.split(',');
          }
      },

      handleUpdateStatus(index,row){
        this.listQuery.id= row .id;
        this.listQuery.status = row.status;
        this.$confirm('是否要修改启用/禁用状态,如果禁用有可能影响到正常产品的售卖?', '提示', {
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
      handleUpdateIsDefault(index,row){
        this.$confirm('是否要修改默认地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateIsDefaultById(row .id).then(response=>{
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.getList();
          });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消操作!'
          });
          this.getList();
        });
      },
      handleAdd(){
        this.$router.push({path: '/pms/addPlayAddress'})
      },
      handleUpdate(index,row){
        this.$router.push({path: '/pms/updatePlayAddress', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.result.list;
          this.total = response.result.total;
        })
      },
      handleDelete(index,row){
          this.deletePlayAddress(row.id);
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
              this.deletePlayAddress(ids);
          }else {
              this.$message({
                  message: '请选择批量操作类型',
                  type: 'warning',
                  duration: 1000
              });
          }
        },
        deletePlayAddress(ids){
            this.$confirm('是否要删除该地址信息,如果删除有可能影响到正常产品的售卖?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params=new URLSearchParams();
                params.append("ids",ids);
                deletePlayAddress(params).then(response=>{
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


