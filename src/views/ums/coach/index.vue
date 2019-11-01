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
          <el-form-item label="用户名：">
            <el-input v-model="listQuery.username" class="input-width" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称：">
            <el-input v-model="listQuery.nickName" class="input-width" placeholder="用户昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="listQuery.phone" class="input-width" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>

          <!--<el-form-item label="用户类型：">
            <el-select v-model="listQuery.orderType" class="input-width" placeholder="全部" clearable>
              <el-option v-for="item in orderTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户名"  align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="身份证号码" align="center">
          <template slot-scope="scope">{{scope.row.identityCard}}</template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <!--<el-button
              size="mini"
              @click="handleViewUserDetail(scope.$index, scope.row)"
            >详细信息
            </el-button>-->
            <el-button
              size="mini"
              @click="sendMessage(scope.$index, scope.row)">发送消息
            </el-button>
            <el-button
              size="mini"
              @click="handleFreezeUser(scope.$index, scope.row)"
              v-show="scope.row.status===0">启用用户
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleFreezeUser(scope.$index, scope.row)"
              v-show="scope.row.status===1">冻结用户
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import {selectUserList, freezeUser, batchUpdateUserStatus} from '@/api/user'
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        username:null,
        nickName:null,
        phone:null,
        createTime: null,
        identityCard:null
    };
    export default {
        name: "userList",
        components:{},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
                operates: [
                    {
                        label: "冻结",
                        value: 0
                    },
                    {
                        label: "启用",
                        value: 1
                    },
                    {
                        label: "发送通知",
                        value: 2
                    },
                    {
                        label: "全部发送通知",
                        value: 3
                    }

                ],
                operateType: null
            }
        },
        created() {
            this.getList();
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
            handleFreezeUser(index, row){
                this.freezeUser(row.id, row.status);
            },
            handleSizeChange(val){
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            sendMessage(index,row){
                this.$router.push({path: '/dmd/sendMessage', query: {id: row.id}})
            },
            batchSendMessage(ids){
                this.$router.push({name: 'batchAddMessage', params: {ids: ids}})
            },
            sendAllMessage(){
                this.$router.push({path: '/dmd/addAllMessage'})
            },
            handleCurrentChange(val){
                this.listQuery.pageNum = val;
                this.getList();
            },
            getList() {
                this.listLoading = true;
                selectUserList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                });
            },
            freezeUser(id, status){
                if(status == 1){
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
                            this.getList();
                        });
                    })
                }else {
                    this.$confirm('是否要进行该启用操作?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = new URLSearchParams();
                        params.append("status", 1)
                        params.append("id",id);
                        freezeUser(params).then(response=>{
                            this.$message({
                                message: '启用成功！',
                                type: 'success',
                                duration: 1000
                            });
                            this.getList();
                        });
                    })
                }
            },
            handleBatchOperate() {
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
                if(this.operateType == 3){
                    this.$confirm(
                        '是否要进行全部用户通知?', '提示', {
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
            },
            editUserStatus(status, ids){
                let params = new URLSearchParams();
                params.append("status", status)
                params.append("ids",ids);
                batchUpdateUserStatus(params).then(response=>{
                    this.$message({
                        message: '修改成功！',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
            },
            handleViewUserDetail(index,row){
                this.$router.push({path:'/ums/userDetail',query:{id:row.id}})
            },
        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


