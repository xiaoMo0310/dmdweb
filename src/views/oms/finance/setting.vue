<template> 

  <el-card class="form-container" >
    <el-form :model="financeSetting"
             ref="financeSettingForm"
             :rules="rules"
             label-width="150px">

      <el-form-item label="教练佣金比例：" prop="normalOrderOvertime">
        <el-input v-model="financeSetting.coachCommissionRatio" class="input-width">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item label="平台收取比列：" prop="returnOrderOvertime">
        <el-input v-model="financeSetting.platformRate" class="input-width">
          <template slot="append">%</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('financeSettingForm')"
          type="primary" size="small">提交</el-button>
        <!--<el-button type="info" size="small" @click="onReturn()">返回</el-button>-->
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getFinanceSetting,updateFinanceSetting} from '@/api/financeSetting';
  const defaultFinanceSetting = {
    id: null,
    coachCommissionRatio: 0,
    platformRate: 0,
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('时间不能为空'));
    }
    //let intValue = parseInt(value);
    if (!Number.isInteger(value)) {
      return callback(new Error('请输入数字值'));
    }
    callback();
  };
  export default {
    name: 'financeSetting',
    data() {
      return {
        financeSetting: Object.assign({}, defaultFinanceSetting),
        rules: {
          coachCommissionRatio:{validator: checkTime, trigger: 'blur' },
          platformRate:{validator: checkTime, trigger: 'blur' },
        }
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      confirm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.financeSetting.id = 1
              updateFinanceSetting(this.financeSetting).then(response=>{
                this.$message({
                  type: 'success',
                  message: '提交成功!',
                  duration:1000
                });
              })
            });
          } else {
            this.$message({
              message: '提交参数不合法',
              type: 'warning'
            });
            return false;
          }
        });
      },
      getDetail(){
        getFinanceSetting(1).then(response=>{
          this.financeSetting=response.result;
        })
      },
      onReturn(){
        this.$router.back();
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 15px;
  }
</style>


