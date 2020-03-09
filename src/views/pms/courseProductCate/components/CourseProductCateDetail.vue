<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="courseProductCate"
             :rules="rules"
             ref="courseProductCateFrom"
             label-width="150px">
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="courseProductCate.name"></el-input>
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="courseProductCate.parentId"
                   placeholder="请选择分类">
          <el-option
            v-for="item in selectProductCateList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="courseProductCate.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="courseProductCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分类图标：">
        <single-upload v-model="courseProductCate.icon"></single-upload>
      </el-form-item>
      <el-form-item label="分类描述：">
        <el-input type="textarea" :autosize="true" v-model="courseProductCate.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('courseProductCateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('courseProductCateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createProductCate, updateProductCate, getProductCate} from '@/api/courseProductCate';
  import SingleUpload from '@/components/Upload/singleUpload';

  const defaultProductCate = {
    description: '',
    icon: '',
    name: '',
    parentId: 0,
    productUnit: '',
    showStatus: 1,
    sort: 0,
  };
  export default {
    name: "ProductCateDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        courseProductCate: Object.assign({}, defaultProductCate),
        selectProductCateList: [],
        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getProductCate(this.$route.query.id).then(response => {
          this.courseProductCate = response.result;
        });
      } else {
        this.courseProductCate = Object.assign({}, defaultProductCate);
      }
      this.getSelectProductCateList();
    },
    methods: {
      getSelectProductCateList() {
        fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
          this.selectProductCateList = response.result.list;
          this.selectProductCateList.unshift({id: 0, name: '无上级分类'});
        });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateProductCate(this.$route.query.id, this.courseProductCate).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createProductCate(this.courseProductCate).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                });
              }
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
        this.courseProductCate = Object.assign({}, defaultProductCate);
        this.getSelectProductCateList();
        this.filterProductAttrList = [{
          value: []
        }];
      },
    }
  }
</script>

<style scoped>

</style>
