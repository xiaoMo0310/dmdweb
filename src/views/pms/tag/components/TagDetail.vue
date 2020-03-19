<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="tag" :rules="rules" ref="tagFrom" label-width="150px">
      <el-form-item label="标签名称：" prop="tagName">
        <el-input v-model="tag.tagName"></el-input>
      </el-form-item>
      <el-form-item label="标签类型：" prop="tagType">
        <el-select v-model="tag.tagType" placeholder="全部" clearable class="input-width">
          <el-option v-for="item in tagTypeOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="tag.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model.number="tag.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('tagFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('tagFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getTagById, saveOrUpdateTag} from '@/api/tag'
  const defaultTag={
    tagName: '',
    showStatus: 1,
    sort: 0
  };
  export default {
    name: 'TagDetail',
    components:{},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        tag:Object.assign({}, defaultTag),
        tagTypeOptions: [
          {
            label: "产品",
            value: 1,
            default: true
          }
        ],
        rules: {
          tagName: [
            {required: true, message: '请输入标签名称', trigger: 'blur'}
          ],
          tagType: [
            {required: true, message: '请选择标签类型', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ]
        }
      }
    },
    created() {
      if (this.isEdit) {
        getTagById(this.$route.query.id).then(response => {
          this.tag = response.result;
        });
      }else{
        this.tag = Object.assign({},defaultTag);
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
                this.tag.id = this.$route.query.id
                saveOrUpdateTag(this.tag).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                saveOrUpdateTag(this.tag).then(response => {
                  this.$refs[formName].resetFields();
                  this.tag = Object.assign({},defaultTag);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
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
        this.tag = Object.assign({},defaultTag);
      }
    }
  }
</script>
<style>
</style>


