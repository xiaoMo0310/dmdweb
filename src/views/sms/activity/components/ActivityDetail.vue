<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="shopActivity"
             :rules="rules"
             ref="shopActivityFrom"
             label-width="150px">
      <el-form-item label="活动标题：" prop="title">
        <el-input v-model="shopActivity.title"></el-input>
      </el-form-item>
      <el-form-item label="活动时间：" prop="activityTime">
        <el-date-picker
          class="input-width"
          v-model="shopActivity.activityTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动图片：" prop="activityImage">
        <multi-upload v-model="imageList"/>
      </el-form-item>
      <el-form-item label="活动介绍：" prop="activityDetail">
        <tinymce :width="500" :height="400" v-model="shopActivity.activityDetail"></tinymce>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="shopActivity.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="shopActivity.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('shopActivityFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('shopActivityFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {createOrUpdateShopActivity, findShopActivityById} from '@/api/shopActivity';
  import {findPlayAddressByPage} from '@/api/playAddress';
  import Tinymce from '@/components/common/Tinymce'
  import MultiUpload from '@/components/Upload/multiUpload'

  const defaultShopActivity = {
    title: '',
    activityTime: '',
    showStatus: 1,
    sort: 0,
  };
  export default {
    name: "ProductTemDetail",
    components: {Tinymce, MultiUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        shopActivity: Object.assign({}, defaultShopActivity),
        imageList: [],
        rules: {
          activityTime: [
            {required: true, message: '请输入活动时间', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '请输入活动标题', trigger: 'blur'},
          ],
          activityDetail: [
            {required: true, message: '请输入活动介绍', trigger: 'blur'},
          ],
          activityImage: [
            {required: true, message: '请输入活动图片', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      if (this.isEdit) {
        findShopActivityById(this.$route.query.id).then(response => {
          this.shopActivity = response.result;
          if(this.shopActivity.activityImage != null){
            this.imageList = this.shopActivity.activityImage.split(",")
          }
        });
      } else {
        this.shopActivity = Object.assign({}, defaultShopActivity);
      }
    },
    methods: {
      onSubmit(formName) {
        let atlas = ''
        for (let i = 0; i < this.imageList.length; i++) {
          if(i === 0){
            atlas = this.imageList[i]
          }else {
            atlas = atlas + "," + this.imageList[i]
          }
        }
        this.shopActivity.activityImage = atlas;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                this.shopActivity.id = this.$route.query.id;
                createOrUpdateShopActivity(this.shopActivity).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              } else {
                createOrUpdateShopActivity(this.shopActivity).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });

                });
              }
              this.$router.back();
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.shopActivity = Object.assign({}, defaultShopActivity);
      }
    },
    filters: {
      filterLabelFilter(index) {
        if (index === 0) {
          return '筛选分类：';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style scoped>

</style>
