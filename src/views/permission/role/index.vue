<template xmlns:v-bind="http://www.w3.org/1999/xhtml"> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>角色列表</span>
      <el-button style="float:right;"
                 size="mini"
                 @click="addRole()">添加角色
      </el-button>
      <el-button
        style="float:right;margin-right: 20px;"
        size="mini"
        @click="deleteRoles(-1,1)">批量删除
      </el-button>
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
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="角色描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="是否启用" align="center">
          <template slot-scope="scope">{{scope.row.status==0?"禁用":"启用"}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!--<el-button
              size="mini"
              @click="handleViewUserDetail(scope.$index, scope.row)"
            >详细信息
            </el-button>-->
            <el-button
              size="mini"
              @click="isEnable(scope.row.id,0,scope.$index)"
              v-show="scope.row.status===1">禁用
            </el-button>
            <el-button
              size="mini"
              @click="isEnable(scope.row.id,1,scope.$index)"
              v-show="scope.row.status===0" style="margin-left: 0;">启用
            </el-button>
            <el-button
              size="mini"
              @click="deleteRoles(scope.row.id,0)">删除
            </el-button>
            <el-button
              size="mini"
              @click="modifyRole(scope.row)">修改
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="allocation(scope.row.id)">分配权限
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
    <el-card class="form-container" shadow="never" v-show="allocationStatus" style="position: absolute;top: 150px;background-color: white;z-index: 99999;">
      <div>
        <div style="border:1px solid #f5f6f8;padding: 15px 0;margin-top: -50px;margin-bottom: 30px;text-align: center;font-size: 20px;">请选择权限</div>
        <div v-for="item in items"  v-bind:key="item.message" style="float: left;width: 150px;margin-bottom: 15px;">
          <el-checkbox v-model="item.beCheck" style="margin-left: 10px;width: 140px;"  border>{{item.name}}</el-checkbox>
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
    import {permissionAll,roleList,addPermissionForRole,deleteRoles} from '@/api/admin'
    import {isEnableRole} from "../../../api/admin";
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        roleId:0
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
                roleIdForPermission:null,
                items: [
                ],
                roleItems:[],
                allocationStatus:false,
                operateType: null,
                multipleSelection:[]
            }
        },
        created() {
            this.getList();
        },
        methods: {
            // handleResetSearch() {
            //     this.listQuery = Object.assign({}, defaultListQuery);
            // },
            // handleSearchList() {
            //     this.listQuery.pageNum = 1;
            //     this.getList();
            // },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            handleSizeChange(val){
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val){
                this.listQuery.pageNum = val;
                this.getList();
            },
            //角色列表
            getList() {
                this.listLoading = true;
                roleList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                });
            },
            //获取角色拥有的权限
            getListForPermission(roleId){
                let query =this.listQuery;
                query.pageSize=50;
                query.roleId=roleId;
                permissionAll(this.listQuery).then(response => {
                    this.items=response.result.list;
                });
            },
            //分配权限点击事件
            allocation(roleId){
                this.allocationStatus=true;
                this.getListForPermission(roleId);
                this.roleIdForPermission=roleId;
            },
            //分配权限提交
            submitPermission(){
                let permissionRelations=[];
                let items=this.items;
                for(var i=0;i<items.length;i++){
                    if(items[i].beCheck){
                        let permissionRelation={roleId:this.roleIdForPermission,permissionId:items[i].id};
                        permissionRelations.push(permissionRelation);
                    }
                }
                if(permissionRelations.length===0){
                    permissionRelations.push({roleId:this.userIdForRole,permissionId:null})
                }
                addPermissionForRole(JSON.stringify(permissionRelations)).then(response => {
                    this.listLoading = false;
                    this.total = response.result.total;
                    this.closePermission();
                    this.getList();
                });
            },
            //关闭分配权限对话框
            closePermission(){
                this.allocationStatus=false;
            },
            //启用禁用方法
            isEnable(id,status,index){
                let param = new URLSearchParams();
                param.append('id', id);
                param.append('status', status);
                isEnableRole(param).then(response => {
                    console.log(id,status,index);
                    console.log(response.result);
                    console.log("=============返回结果");
                    if (response.result!==-1){
                        this.list[index].status=response.result;
                    }
                });

            },
            //添加角色
            addRole(){
                //this.$router.push({path: '/dmd/sendMessage', query: {id: row.id}})
                this.$router.push({name: 'addRole'});
            },
            //修改角色信息
            modifyRole(umsRole){
                console.log(umsRole);
                this.$router.push({name: 'addRole',query:{umsRole:umsRole,type:"modify"}});
            },
            //删除角色
            deleteRoles(id,type){
                let ids=[];
                if (type===0){
                    ids.push(id)
                }else{
                    let multipleSelection=this.multipleSelection;
                    for(let i=0;i<multipleSelection.length;i++){
                        ids.push(multipleSelection[i].id);
                    }
                }
                this.$confirm('是否提交数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteRoles(ids).then(response => {
                        if (response.result>0){
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                duration:1000
                            });
                            this.getList()
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'fail',
                                duration:1000
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


