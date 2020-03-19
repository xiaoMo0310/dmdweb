<template> 
  <el-card class="form-container" >
    <el-form :model="integralRuleSetting"
             ref="integralRuleSettingForm"
             :rules="rules"
             label-width="150px">
      <el-form-item label="一元相当于：" prop="normalOrderOvertime">
        <el-input v-model="integralRuleSetting.deductionPerAmount" class="input-width">
          <template slot="append">积分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每笔最低使用：" prop="confirmOvertime">
        <el-input v-model="integralRuleSetting.useUnit" class="input-width">
          <template slot="append">积分</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每笔订单抵扣：" prop="returnOrderOvertime">
        <el-input v-model="integralRuleSetting.maxPercentPerOrder" class="input-width">
          <template slot="append">%</template>
        </el-input>
        <span class="note-margin"></span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('integralRuleSettingForm')"
          type="primary" size="small">提交</el-button>
        <!--<el-button type="info" size="small" @click="onReturn()">返回</el-button>-->
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getIntegralRuleSetting,updateIntegralRuleSetting} from '@/api/integralRuleSetting';
  const defaultIntegralRuleSetting = {
    id: null,
    deductionPerAmount: 0,
    maxPercentPerOrder: 0,
    useUnit: 0,
    couponStatus: 1
  };
  const checkTime = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('数据不能为空'));
    }
    //let intValue = parseInt(value);
    if (!Number.isInteger(intValue)) {
      return callback(new Error('请输入数字值'));
    }
    callback();
  };
  export default {
    name: 'IntegralRuleSetting',
    data() {
      return {
        integralRuleSetting: Object.assign({}, defaultIntegralRuleSetting),
        rules: {
          deductionPerAmount:{validator: checkTime, trigger: 'blur' },
          maxPercentPerOrder:{validator: checkTime, trigger: 'blur' },
          useUnit: {validator: checkTime, trigger: 'blur' },
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
              this.integralRuleSetting.id = 1
              updateIntegralRuleSetting(this.integralRuleSetting).then(response=>{
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
        getIntegralRuleSetting(1).then(response=>{
          this.integralRuleSetting=response.result;
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


