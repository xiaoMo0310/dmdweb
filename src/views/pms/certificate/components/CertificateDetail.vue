<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="certificate"
             :rules="rules"
             ref="certificateForm"
             label-width="150px"
             size="small">
      <el-form-item label="证书名称(中文)：" prop="chineseName">
        <el-input v-model="certificate.chineseName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="证书名称(英文)：" prop="englishName">
        <el-input v-model="certificate.englishName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="证书简称：" prop="englishShorthand">
        <el-input v-model="certificate.englishShorthand" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="证书等级：" prop="certificateLevel">
        <el-select v-model="certificate.certificateLevel">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证书图片：">
        <single-upload v-model="certificate.pic"></single-upload>
      </el-form-item>
      <el-form-item label="启动/禁用：">
        <el-radio-group v-model="certificate.status">
          <el-radio :label="1">启动</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="certificate.introduction">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('certificateForm')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('certificateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {saveOrUpdate} from '@/api/certificate'
  const defaultTypeOptions = [
      {
          label: '一级证书',
          value: 1
      },
      {
          label: '二级证书',
          value: 2
      },
      {
          label: '三级证书',
          value: 3
      },
      {
          label: '四级证书',
          value: 4
      },
      {
          label: '五级证书',
          value: 5
      },
      {
          label: '六级证书',
          value: 6
      },
      {
          label: '七级证书',
          value: 7
      },
      {
          label: '八级证书',
          value: 8
      },
      {
          label: '九级证书',
          value: 9
      },
      {
          label: '十级证书',
          value: 10
      },
      {
          label: '十一级证书',
          value: 11
      },
      {
          label: '十二级证书',
          value: 12
      }
  ];
  const defaultCertificate = {
    name: null,
    certificateLevel: 1,
    englishShorthand: null,
    chineseName: null,
    englishName: null,
    status: 1,
    introduction: null,
  };
  export default {
    name: 'CertificateDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        certificate: {},
        rules: {
          chineseName: [
            {required: true, message: '请输入中文名称', trigger: 'blur'}
          ],
          englishName: [
            {required: true, message: '请输入英文名称', trigger: 'blur'}
          ],
          certificateLevel: [
            {required: true, message: '请选择证书等级', trigger: 'blur'}
          ],
          englishShorthand: [
            {required: true, message: '请选择简称', trigger: 'blur'}
          ]
        },
        typeOptions: Object.assign({}, defaultTypeOptions),
      }
    },
    created(){
      if (this.isEdit) {
          this.certificate = this.$route.query.row;
      }else{
        this.certificate = Object.assign({},defaultCertificate);
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
                saveOrUpdate(this.certificate).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                this.$router.back();
                });
              } else {
                saveOrUpdate(this.certificate).then(response => {
                  this.$refs[formName].resetFields();
                  this.certificate = Object.assign({},defaultCertificate);
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
        this.certificate = Object.assign({},defaultCertificate);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


