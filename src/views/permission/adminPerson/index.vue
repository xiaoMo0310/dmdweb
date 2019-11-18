<template> 
  <div class="app-container">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>管理员列表</span>
      <el-button style="float:right;"
        size="mini"
        @click="addUser()">添加用户
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
<!--        <el-table-column type="selection" width="60" align="center"></el-table-column>-->
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.note}}</template>
        </el-table-column>

        <el-table-column label="操作" width="300" align="center" style="border-right: 0;">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleFreezeUser(scope.$index, scope.row)">删除
            </el-button>
            <el-button
              size="mini"
              @click="handleFreezeUser(scope.$index, scope.row)"
              v-show="scope.row.status===0">启用
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleFreezeUser(scope.$index, scope.row)"
              v-show="scope.row.status===1">禁用
            </el-button>
            <el-button
              size="mini"
              @click="allocationRole(scope.row.id)">分配角色
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-card class="form-container" shadow="never" v-show="allocationRoleStatus" style="position: absolute;top: 150px;background-color: white;z-index: 99999;">
      <div>
        <div style="border:1px solid #f5f6f8;padding: 15px 0;margin-top: -50px;margin-bottom: 30px;text-align: center;font-size: 20px;">请选择权限</div>
        <div v-for="item in items"  v-bind:key="item.message" style="float: left;width: 150px;margin-bottom: 15px;">
          <el-checkbox v-model="item.check" style="margin-left: 10px;width: 140px;"  border>{{item.name}}</el-checkbox>
        </div>
      </div>
      <div>
        <el-button style="margin-left: 226px;" @click="submitPermission()">确认</el-button>
        <el-button @click="closePermission()">返回</el-button>
      </div>

    </el-card>
  </div>
</template>
<script>
    import {adminList,roleList} from '@/api/admin'

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        username: null,
        nickName: null,
        phone: null,
        createTime: null,
        identityCard: null,
        adminId:0
    };
    export default {
        name: "adminList",
        components: {},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
                allocationRoleStatus:false,
                userIdForRole:null,
                items:[]
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleFreezeUser(index, row) {
                this.freezeUser(row.id, row.status);
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            addUser() {
                this.$router.push({name: 'addUser'})
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            getList() {
                this.listLoading = true;
                adminList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list=response.data.list;
                    console.log(response.data.list)
                });

            },
            permission(){
                this.$router.push({name: 'permission'})
            },
            //分配角色点击事件
            allocationRole(adminId){
                this.allocationRoleStatus=true;
                this.getListForRole(adminId);
                this.userIdForRole=adminId;
            },
            //关闭分配权限对话框allocationRoleStatus
            closePermission(){
                this.allocationRoleStatus=false;
            },
            //获取用户拥有的角色
            getListForRole(adminId){
                let query =this.listQuery;
                query.pageSize=50;
                query.adminId=adminId;
                roleList(this.listQuery).then(response => {
                    console.log(response.result.list)
                    console.log("========================")
                    this.items=response.result.list;
                });
            },
        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


