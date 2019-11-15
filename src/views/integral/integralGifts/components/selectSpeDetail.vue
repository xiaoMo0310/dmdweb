<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>礼品规格</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="尺码" align="center">
          <template slot-scope="scope">{{scope.row.size}}</template>
        </el-table-column>
        <el-table-column label="颜色" align="center">
          <template slot-scope="scope">{{scope.row.color}}</template>
        </el-table-column>
        <el-table-column label="库存" align="center">
          <template slot-scope="scope">
            {{scope.row.specStock}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {queryIntegralGiftsSpeById} from '@/api/giftsSpe';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    id: null,
  };

  export default {
    name: 'searchqueryIntegralGiftsSpeById',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery), list: null,
        total: null,
        listLoading: false,
      }
    },
    created() {
      this.getList();
    },

    methods: {
      getList() {
        this.listLoading = true;

        console.log(this.$route.params.id)
        queryIntegralGiftsSpeById (this.$route.query.id).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
          this.id = response.data.list.id;
        })
      },
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>

