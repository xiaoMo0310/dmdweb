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
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
<!--        <el-table-column label="注册时间" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.createTime}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">{{scope.row.status==1?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.note}}</template>
        </el-table-column>

        <el-table-column label="操作" width="400" align="center" style="border-right: 0;">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="openUpdateInfo(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              @click="deleteUserById(scope.row.id)">删除
            </el-button>
            <el-button
              size="mini"
              @click="updateInfo(scope.row,1)"
              v-show="scope.row.status===0">启用
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="updateInfo(scope.row,0)"
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
    <el-card class="form-container" shadow="never" v-show="allocationRoleStatus" style="position: fixed;top: 150px;background-color: white;z-index: 99999; height: 400px; overflow: auto">
      <div>
        <div style="border:1px solid #f5f6f8;padding: 15px 0;margin-top: -50px;margin-bottom: 30px;text-align: center;font-size: 20px;">请选择角色</div>
        <div v-for="item in items"  v-bind:key="item.message" style="float: left;width: 150px;margin-bottom: 15px;">
          <el-checkbox v-model="item.beCheck" style="margin-left: 10px;width: 140px;"  border>{{item.name}}</el-checkbox>
        </div>
      </div>
      <div>
        <el-button size="mini" style="margin-left: 226px;" @click="submitAdminForRole">确认</el-button>
        <el-button type="info" size="mini"  @click="closePermission()">返回</el-button>
      </div>
    </el-card>

    <!--修改页面-->
    <el-card class="form-container" shadow="never" v-show="updateAdminStatus" style="position: fixed;top: 150px;background-color: white;z-index: 99999;">
      <el-form :model="userInfo"
               label-width="150px"
               size="small">
        <el-form-item label="用户名：">
          <el-input v-model="userInfo.username" class="input-width" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="userInfo.password" class="input-width" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="userInfo.email" class="input-width" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="userInfo.nickName" class="input-width" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="userInfo.note" class="input-width" style="width: 100%;"></el-input>
        </el-form-item>
        <el-button size="mini" style="margin-left: 30%;" type="primary" @click="updateInfo(null,null)">提交</el-button>
        <el-button size="mini" @click="resetForm()">重置</el-button>
        <el-button size="mini" type="info" @click="closeUpdate()">返回</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
    import {adminList,roleList,addRolesForAdmin,deleteUser,updateAdminInfo} from '@/api/admin'

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
                updateAdminStatus:false,
                userIdForRole:null,
                items:[],
                userInfo:{username:null,password:null,email:null,nickName:null,note:null}
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
            updateInfo(row,status) {
                this.listLoading = true;
                if(row==null){
                    row=this.userInfo;
                }
                if(status!=null){
                  row.status=status;
                }
                updateAdminInfo(JSON.stringify(row)).then(response =>{
                    if (response.code===200){
                        console.log(response.result.message);
                        this.getList();
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.closeUpdate();
                    }else {
                        this.$message({
                            type: 'fail',
                            message: '操作失败!'
                        });
                    }
                    this.listLoading = false;
                })
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
            //关闭分配角色对话框allocationRoleStatus
            closePermission(){
                this.allocationRoleStatus=false;
            },
            //获取所有角色信息和用户拥有的角色
            getListForRole(adminId){
                let query =this.listQuery;
                query.pageSize=50;
                query.adminId=adminId;
                roleList(this.listQuery,1).then(response => {
                    this.items=response.result.list;
                });
            },
            //给用户添加角色
            submitAdminForRole(){
                let adminRoleRelation=[];
                let items=this.items;
                for(var i=0;i<items.length;i++){
                    if(items[i].beCheck){
                        let permissionRelation={adminId:this.userIdForRole,roleId:items[i].id};
                        adminRoleRelation.push(permissionRelation);
                    }
                }
                if(adminRoleRelation.length===0){
                    adminRoleRelation.push({adminId:this.userIdForRole,roleId:null})
                }
                addRolesForAdmin(JSON.stringify(adminRoleRelation)).then(response => {
                    this.listLoading = false;
                    this.total = response.result.total;
                    this.closePermission();
                    this.getList();
                });
            },
            //打开修改信息的卡片
            openUpdateInfo(row){
                this.userInfo=row;
                console.log(this.userInfo);
                console.log("==============================");
                this.updateAdminStatus=true;
            },
            closeUpdate(){
                this.updateAdminStatus=false;
            },
            resetForm(){
                this.userInfo={username:null,password:null,email:null,nickName:null,note:null}
            },
            deleteUserById(id){
                let params = new URLSearchParams();
                params.append("id",id);
                this.$confirm('使用要进行添加操作?', '提示', {
                    confirmButtonText: '确定删除吗？',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    deleteUser(params).then(response=>{
                        if (response.code===200){
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                            this.getList()
                        }else{
                            this.$message({
                                type: 'fail',
                                message: '操作失败!'
                            });
                        }
                    });
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


