<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="playAddress"
             :rules="rules"
             ref="playAddressForm"
             label-width="150px"
             size="small">
      <el-form-item label="地址名称：" prop="address">
        <el-input v-model="playAddress.address" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="地址图集：">
        <multi-upload v-model="imageList"></multi-upload>
      </el-form-item>
      <el-form-item label="简介：" prop="addressIntroduction">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="playAddress.addressIntroduction">
        </el-input>
      </el-form-item>
      <el-form-item label="默认/非默认：">
        <el-radio-group v-model="playAddress.isDefault">
          <el-radio :label="0" >非默认</el-radio>
          <el-radio :label="1" >默认</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="启动/禁用：">
        <el-radio-group v-model="playAddress.status">
          <el-radio :label="1">启动</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('playAddressForm')">提交</el-button>
        <el-button type="info" size="small" @click="onReturn('homeAdvertiseFrom')">返回</el-button>
        <el-button v-if="!isEdit" @click="resetForm('playAddressForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {saveOrUpdate, findPlayAddressById} from '@/api/playAddress'
  import MultiUpload from "@/components/Upload/multiUpload";

  const defaultPlayAddress = {
    address: null,
    addressIntroduction: null,
    atlas: null,
    isDefault: 0,
    status: 1
  };
  export default {
    name: 'playAddressDetail',
    components:{MultiUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        playAddress: {},
        imageList: [],
        rules: {
          address: [
            {required: true, message: '请输入地址名称', trigger: 'blur'}
          ],
          addressIntroduction: [
              {min: 2, max: 500, message: '长度在 2 到 500 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      if (this.isEdit) {
          this.findPlayAddressById(this.$route.query.id)
      }else{
        this.playAddress = Object.assign({},defaultPlayAddress);
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
                let atlas = ''
                for (let i = 0; i < this.imageList.length; i++) {
                    if(i === 0){
                        atlas = this.imageList[i]
                    }else {
                        atlas = atlas + "," + this.imageList[i]
                    }
                }
                this.playAddress.atlas = atlas;
              if (this.isEdit) {
                saveOrUpdate(this.playAddress).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                this.$router.back();
                });
              } else {
                saveOrUpdate(this.playAddress).then(response => {
                  this.$refs[formName].resetFields();
                  this.playAddress = Object.assign({},defaultPlayAddress);
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
      onReturn(){
          this.$router.back();
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.playAddress = Object.assign({},defaultplayAddress);
      },
      findPlayAddressById(id){
          findPlayAddressById(id).then(response => {
              this.playAddress = response.result;
              if(response.result.atlas != null){
                  this.imageList = response.result.atlas.split(",")
              }
          });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


