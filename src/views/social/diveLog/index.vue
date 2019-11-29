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
          <el-form-item label="用户ID：">
            <el-input v-model="listQuery.userId" class="input-width" placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item label="潜水类型：">
            <el-select v-model="listQuery.diveType" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布起始时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.startDate"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布结束时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.endDate"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="date"
              placeholder="请选择时间">
            </el-date-picker>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="编号"  align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="潜水次数" align="center">
          <template slot-scope="scope">{{scope.row.divingNumber}}</template>
        </el-table-column>
        <el-table-column label="深度" width="100" align="center">
          <template slot-scope="scope">
            <p>最大:{{scope.row.maximumDepth}}{{scope.row.depthType  | formatDepthType}}</p>
            <p>平均:{{scope.row.average_depth}}{{scope.row.depthType  | formatDepthType}}</p>
          </template>
        </el-table-column>

        <!--<el-table-column label="深度类型" align="center">
          <template slot-scope="scope">{{scope.row.depthType | formatDepthType}}</template>
        </el-table-column>-->
        <el-table-column label="温度"  width="100" align="center">
          <template slot-scope="scope">
            <p>最低:{{scope.row.minimumTemperature}}{{scope.row.temperatureType  | formatTemperatureType}}</p>
            <p>平均:{{scope.row.average_temperature}}{{scope.row.temperatureType  | formatTemperatureType}}</p>
          </template>
        </el-table-column>
        <!--<el-table-column label="温度类型" align="center">
          <template slot-scope="scope">{{scope.row.temperatureType  | formatTemperatureType}}</template>
        </el-table-column>-->
        <el-table-column label="时间" width="220" align="center">
          <template slot-scope="scope">
            开始时间:{{scope.row.startTime | formatTime}}
            结束时间:{{scope.row.endTime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="潜水地点" align="center">
          <template slot-scope="scope">{{scope.row.diveSites}}</template>
        </el-table-column>
        <el-table-column label="潜水想法" align="center">
          <template slot-scope="scope">{{scope.row.divingIdea}}</template>
        </el-table-column>
        <el-table-column label="潜水照片" width="120" align="center">
          <template slot-scope="scope">
            <div v-for="item in getImg(scope.row.divingPictures)">
              <img style="height: 80px" :src="item" v-image-preview>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="潜水配重" align="center">
          <template slot-scope="scope">{{scope.row.additionalWeight}}</template>
        </el-table-column>
        <el-table-column label="入水方式" align="center">
          <template slot-scope="scope">{{scope.row.waterWay}}</template>
        </el-table-column>
        <el-table-column label="景物" align="center">
          <template slot-scope="scope">{{scope.row.scenery}}</template>
        </el-table-column>
        <el-table-column label="天气" align="center">
          <template slot-scope="scope">{{scope.row.weather}}</template>
        </el-table-column>
        <el-table-column label="水流" align="center">
          <template slot-scope="scope">{{scope.row.flow}}</template>
        </el-table-column>
        <el-table-column label="能见度" align="center">
          <template slot-scope="scope">{{scope.row.visibility}}</template>
        </el-table-column>
        <el-table-column label="动物照片" width="120" align="center">
          <template slot-scope="scope">
            <div v-for="item2 in getImg2(scope.row.animalPhotos)">
              <img style="height: 80px" :src="item2">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="湿衣品牌" align="center">
          <template slot-scope="scope">{{scope.row.clothingBrand}}</template>
        </el-table-column>
        <el-table-column label="BCD品牌" align="center">
          <template slot-scope="scope">{{scope.row.airbottleBrand}}</template>
        </el-table-column>
        <el-table-column label="面镜品牌" align="center">
          <template slot-scope="scope">{{scope.row.maskBrand}}</template>
        </el-table-column>
        <el-table-column label="手表品牌" align="center">
          <template slot-scope="scope">{{scope.row.watchesBrand}}</template>
        </el-table-column>
        <el-table-column label="相机品牌" align="center">
          <template slot-scope="scope">{{scope.row.cameraBrand}}</template>
        </el-table-column>
        <el-table-column label="脚蹼品牌" align="center">
          <template slot-scope="scope">{{scope.row.finsBrand}}</template>
        </el-table-column>
        <el-table-column label="脚蹼品牌" align="center">
          <template slot-scope="scope">{{scope.row.finsBrand}}</template>
        </el-table-column>
        <el-table-column label="时间" width="220" align="center">
          <template slot-scope="scope">
            发布时间:{{scope.row.createtime | formatTime}}
            编辑时间:{{scope.row.edittime | formatTime}}
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center">
          <template slot-scope="scope">{{scope.row.author}}</template>
        </el-table-column>
        <el-table-column label="用户ID" align="center">
          <template slot-scope="scope">{{scope.row.userId}}</template>
        </el-table-column>
        <el-table-column label="点赞数" align="center">
          <template slot-scope="scope">{{scope.row.praiseNum}}</template>
        </el-table-column>
        <el-table-column label="分享数" align="center">
          <template slot-scope="scope">{{scope.row.shareNum}}</template>
        </el-table-column>
        <el-table-column label="评论数" align="center">
          <template slot-scope="scope">{{scope.row.commentNum}}</template>
        </el-table-column>
        <el-table-column label="潜水类型" align="center">
          <template slot-scope="scope">{{scope.row.diveType | formatType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="170" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handUpdate(scope.$index, scope.row)"
                       v-if="scope.row.diveType == 0"
            >查看用户气瓶消耗
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
  import {selectDiveLogAll,updateCommentDelflag} from '@/api/diveLog';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    startDate:null,
    endDate:null,
    userId:null

  };
  const defaultTypeOptions=[
    {
      label: '水肺潜水',
      value: 0
    },
    {
      label: '自由潜水',
      value: 1
    },
  ];
  export default {
    name: 'searchselectDiveLogAll',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions),
        list: null,
        total: null,
        listLoading: false,
        multipleSelection: [],
        operates: [
          {
            label: "删除",
            value: 0
          }
        ],
        operateType: null
      }
    },
    created() {
      this.getList();
    },
    filters:{
      formatType(diveType){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(diveType===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatDepthType(depthType){
        if(depthType===0){
          return "M";
        }if(depthType===1){
          return 'ft';
        }
      },
      formatTemperatureType(temperatureType){
        if(temperatureType===0){
          return "℃";
        }if(temperatureType===1){
          return '℉';
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
      handleDelete(index,row){
        this.updateCommentDelflag(row.id);
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
          this.updateCommentDelflag(ids);
        }else {
          this.$message({
            message: '请选择批量操作类型',
            type: 'warning',
            duration: 1000
          });
        }
      },
      getImg(val){
        if(val!=null){
          var words = val.split(',');
          return words;
        }
      },
      getImg2(val){
        if(val!=null){
          var words = val.split(',');
          return words;
        }
      },
      handleAdd(){
        this.$router.push({path: '/topic/addTopic'})
      },
      handUpdate(index,row){
        this.$router.push({path: '/social/selectAirbottle', query: {id: row.id}})
      },
      getList() {
        this.listLoading = true;
        selectDiveLogAll (this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;

          console.log(response.data.list)

        })
      },
      updateCommentDelflag(ids){
        this.$confirm('是否要删除该话题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params=new URLSearchParams();
          params.append("ids",ids);
          updateCommentDelflag(params).then(response=>{
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


