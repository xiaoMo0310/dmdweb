<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="礼品名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：" prop="createTime" v-if="homeAdvertise.createTime === null">
        <el-input v-if="homeAdvertise.createTime === null" v-model="homeAdvertise.createTime" class="input-width" ></el-input>
      </el-form-item>
      <el-form-item label="上传礼品图片：">
        <single-upload v-model="homeAdvertise.picture"></single-upload>
      </el-form-item>
      <el-form-item label="上传礼品介绍图片：">
        <single-upload v-model="homeAdvertise.introduce"></single-upload>
      </el-form-item>
      <el-form-item label="所需要的兑换积分：" prop="integral">
        <el-input v-model="homeAdvertise.integral" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="库存量：" prop="integral">
        <el-input v-model="homeAdvertise.inventory" class="input-width"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import MultiUpload from '@/components/Upload/multiUpload'
  import {updateIntegralGifts, findIntegralGiftsInfoById , addIntegralGifts} from '@/api/integralGifts'
  const defaultHomeAdvertise = {
    topicName: null,
    topicDescribes: null,
    operationName: null,
    topicPicture : null
  };
  export default {
    name: 'IntegralGiftsDetail',
    components:{SingleUpload,MultiUpload},
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
        findIntegralGiftsInfoById(this.$route.query.id).then(response => {
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
                updateIntegralGifts(this.$route.query.id, this.homeAdvertise).then(response => {
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


