<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>权限列表</span>
      <el-button style="float:right;"
                 size="mini"
                 @click="addPermission()">添加权限
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="orderTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="权限值" align="center">
          <template slot-scope="scope">{{scope.row.value}}</template>
        </el-table-column>
        <el-table-column label="权限类型" align="center">
          <template slot-scope="scope">{{scope.row.type==0?"目录":scope.row.type==1?"菜单":"按钮"}}</template>
        </el-table-column>
        <el-table-column label="前端资源路径" align="center">
          <template slot-scope="scope">{{scope.row.uri}}</template>
        </el-table-column>
        <el-table-column label="启用状态" align="center">
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
              @click="isForbiddenPermission(scope.row.id,0)"
              v-show="scope.row.status===1">禁用
            </el-button>
            <el-button
              size="mini"
              @click="isForbiddenPermission(scope.row.id,1)"
              v-show="scope.row.status===0" style="margin-left: 0;">启用
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
  </div>
</template>
<script>
    import {permissionAll,isForbiddenPermission} from '@/api/admin'

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10,
        username: null,
        nickName: null,
        phone: null,
        createTime: null,
        identityCard: null
    };
    export default {
        name: "permissionList",
        components: {},
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
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
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },
            getList() {
                this.listLoading = true;
                permissionAll(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list=response.result.list;
                    this.total = response.result.total;
                    console.log(response.result);
                    console.log("这是权限列表")
                });

            },
            isForbiddenPermission(id,status){
                let params = new URLSearchParams();
                params.append("id",id);
                params.append("status",status);
                isForbiddenPermission(params).then(response => {
                    console.log(response.data);
                    console.log("====================");
                    this.$message({
                        message: '操作成功！',
                        type: 'success',
                        duration: 1000
                    });
                    this.getList();
                });
            },
            permission(){
                this.$router.push({name: 'permission'})
            },
            addPermission(){
                this.$router.push({name: 'addPermission'})
            }
        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


