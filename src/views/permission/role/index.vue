<template xmlns:v-bind="http://www.w3.org/1999/xhtml"> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>角色列表</span>
      <el-button style="float:right;"
                 size="mini"
                 @click="addUser()">添加角色
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
          <template slot-scope="scope">{{scope.row.status}}</template>
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
              @click="sendMessage(scope.$index, scope.row)">禁用
            </el-button>
            <el-button
              size="mini"
              @click="handleFreezeUser(scope.$index, scope.row)"
              v-show="scope.row.status===0">启用
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
    import {permissionAll,roleList,addPermissionForRole} from '@/api/admin'
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
                roleList(this.listQuery).then(response => {
                    console.log("这是角色类别========================");
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                });
            },
            getListForPermission(roleId){
                let query =this.listQuery;
                query.pageSize=50;
                query.roleId=roleId;
                permissionAll(this.listQuery).then(response => {
                    this.items=response.result.list;
                });
            },
            allocation(roleId){
                this.allocationStatus=true;
                this.getListForPermission(roleId);
                this.roleIdForPermission=roleId;
            },
            submitPermission(){
                let permissionRelations=[];
                let items=this.items;
                for(var i=0;i<items.length;i++){
                    if(items[i].check){
                        let permissionRelation={roleId:this.roleIdForPermission,permissionId:items[i].id};
                        permissionRelations.push(permissionRelation);
                    }
                }
                console.log(permissionRelations);
                addPermissionForRole(JSON.stringify(permissionRelations)).then(response => {
                    console.log("这是角色类别========================");
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
                });
            },
            closePermission(){
                this.allocationStatus=false;
            }

        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


