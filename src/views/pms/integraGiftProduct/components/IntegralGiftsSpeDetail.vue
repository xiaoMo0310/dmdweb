<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="礼品ID：" prop="giftId" v-if="homeAdvertise.giftId === null">
        <el-input v-model="homeAdvertise.giftId" class="input-width" v-if="homeAdvertise.giftId === null"></el-input>
      </el-form-item>
      <el-form-item label="尺码：" prop="integral">
        <el-input v-model="homeAdvertise.size" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="颜色：" prop="integral">
        <el-input v-model="homeAdvertise.color" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="库存：" prop="integral">
        <el-input v-model="homeAdvertise.specStock" class="input-width"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {updateIntegralGiftsSpe, findIntegralGiftsSpeInfoById } from '@/api/giftsSpe'
  const defaultHomeAdvertise = {
    topicName: null,
    topicDescribes: null,
    operationName: null,
    topicPicture : null
  };
  export default {
    name: 'IntegralGiftsDetail',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        homeAdvertise: {},
        rules: {
          name: [
            {required: true, message: '请输入礼品名称', trigger: 'blur'},
            {min: 1, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          url: [
            {required: true, message: '请输入广告链接', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '请选择开始时间', trigger: 'blur'}
          ],
          endTime: [
            {required: true, message: '请选择到期时间', trigger: 'blur'}
          ],
          pic: [
            {required: true, message: '请选择广告图片', trigger: 'blur'}
          ]
        },

      }
    },
    created(){
      if (this.isEdit) {
        findIntegralGiftsSpeInfoById(this.$route.query.id).then(response => {
          this.homeAdvertise = response.data;
        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateIntegralGiftsSpe(this.$route.query.id, this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                addIntegralGifts(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


