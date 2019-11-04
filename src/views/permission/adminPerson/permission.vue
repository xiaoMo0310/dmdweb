<template> 
  <div class="app-container">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>拥有角色</span>
      <el-button style="float:right;"
                 size="mini"
                 @click="addUser()">添加
      </el-button>
    </el-card>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
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

            <el-table-column label="操作" align="center" style="border-right: 0;">
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
                  @click="permission()">权限
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-collapse-item>
    </el-collapse>

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
    import {adminList} from '@/api/admin'

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
        name: "adminList",
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
            }
        }
    }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


