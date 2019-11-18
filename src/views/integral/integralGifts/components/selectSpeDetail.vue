<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <template slot-scope="scope">
      <el-button
        size="medium"
        @click="handleUpdate(scope.$index, scope.row)">添加规格
      </el-button>
      </template>
    </el-card>
    <div class="table-container">
      <el-table ref="homeAdvertiseTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="好礼编号" align="center">
          <template slot-scope="scope">{{scope.row.giftId}}</template>
        </el-table-column>
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form ref="productAttrCatForm":model="productAttrCate" :rules="rules" label-width="120px">
        <el-form-item label="尺码" prop="size">
          <el-input v-model="productAttrCate.size" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
          <el-input v-model="productAttrCate.color" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="specStock">
          <el-input v-model="productAttrCate.specStock" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm('productAttrCatForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {queryIntegralGiftsSpeById,addGiftsSpe} from '@/api/giftsSpe';
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
        dialogVisible: false,
        dialogTitle:'',
        productAttrCate:{
          name:'',
          id:null
        },
        rules: {
          name: [
            { required: true, message: '请输入类型名称', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getList();
    },

    methods: {

      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.dialogTitle = "请选择添加规格";
        this.productAttrCate.giftId = row.giftId;
        this.productAttrCate.size = row.size;
        this.productAttrCate.color = row.color;
        this.productAttrCate.specStock = row.specStock;
      },



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


      handleConfirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = new URLSearchParams();
            data.append("giftId",this.productAttrCate.giftId);
            data.append("size",this.productAttrCate.size);
            data.append("color",this.productAttrCate.color);
            data.append("specStock",this.productAttrCate.specStock);
            console.log(this.dialogTitle)
            console.log("=============================================")
            if(this.dialogTitle==="请选择添加规格"){
              addGiftsSpe(this.$route.query.id ,data).then(response=>{
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration:1000
                });
                this.dialogVisible = false;
                this.getList();
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
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

