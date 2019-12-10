<template> 
  <div class="app-container">

    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px" >
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px" align="right">
          <el-form-item label="商品类型：">
            <el-select v-model="listQuery.productType" placeholder="全部" clearable @change="getList" class="input-width">
              <el-option v-for="item in productTypeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select v-model="listQuery.approvalStatus" placeholder="全部" clearable @change="getList" class="input-width">
              <el-option v-for="item in approvalStatusOptions"
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
      <span>潜水学证商品管理</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="60" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="卖家id" align="center" width="80">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="商品名称" width="200" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="商品标题" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="商品价格"width="100" align="center">
          <template slot-scope="scope">{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column label="商品类型"width="100" align="center">
          <template slot-scope="scope">{{scope.row.productType | productType}}</template>
        </el-table-column>
        <el-table-column label="地点"width="150" align="center">
          <template slot-scope="scope">{{scope.row.location}}</template>
        </el-table-column>
        <el-table-column label="审核状态"width="120" align="center">
          <template slot-scope="scope">{{scope.row.approvalStatus | approvalStatus}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleCourseProductDetail(scope.$index, scope.row)">详细信息
            </el-button>
            <!--<el-button size="mini" type="danger" v-if="scope.row.approvalStatus === 1"
                       @click="handleReviewDetail(scope.$index, scope.row)">审核通过
            </el-button>
            <el-button size="mini" type="danger" v-if="scope.row.approvalStatus === 1"
                       @click="handleReviewDetail(scope.$index, scope.row)">审核不通过
            </el-button>-->
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
    import {findCourseProductList} from '@/api/courseProduct';
    import {formatDate} from '@/utils/date';
    const defaultListQuery = {
        pageNum: 1,
        pageSize: 5,
        productType: null,
        approvalStatus: null
    };

    export default {
        name: 'searchintegrationRule',
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                list: null,
                total: null,
                listLoading: false,
                multipleSelection: [],
                approvalStatusOptions: [
                    {
                        label: "待审核",
                        value: 1,
                        default: true
                    },
                    {
                        label: "审核通过",
                        value: 2
                    },
                    {
                        label: "审核未通过",
                        value: 3
                    }
                ],
                productTypeOptions: [
                    {
                        label: "学证",
                        value: 1,
                        default: true
                    },
                    {
                        label: "潜水",
                        value: 2
                    },
                ],
                operateType: null
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
                let replace = time.replace(/-/g, "/");
                let date = new Date(replace);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            },
            approvalStatus(value){
                if(value === 1) {
                    return "待审核"
                }else if (value === 2){
                    return "审核通过"
                }else {
                    return "审核未通过"
                }
            },
            productType(type){
                if(type === 1){
                  return "学证"
                }else {
                    return "潜水"
                }
            }

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
            handleCourseProductDetail(index, row){
                this.$router.push({path:'/pms/courseProductDetail',query:{id:row.id}})
            },
            getList() {
                this.listLoading = true;
                findCourseProductList (this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.result.list;
                    this.total = response.result.total;
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


