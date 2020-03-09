<template> 
  <el-card class="form-container" shadow="never"  style="width:1200px;">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="100px"
             size="medium">
      <el-form-item label="规则说明：" prop="operationName">
        <editor v-model="homeAdvertise.ruledescription" ref="editor"
                :disabled="disabled"
                @onClick="onClick"
                style="width:1000px;"
        >
        </editor>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
        <button @click="disabled = false">启用</button>
      </el-form-item>
      <el-form-item label="图片示例：">
        <single-upload v-model="homeAdvertise.picturesample"></single-upload>
      </el-form-item>
      <el-form-item label="操作人：" prop="operationName">
        <el-input v-model="homeAdvertise.operationName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button type="info" size="small" @click="onReturn('homeAdvertiseFrom')">返回</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {updateIntegralList, findIntegralInfoById } from '@/api/integrationRule'
  import editor from '@/components/common/TinymceEditor'


  const defaultHomeAdvertise = {
    ruledescription: null,
    picturesample: null,
    operationName: null,
  };
  export default {

    name: 'TopicDetail',
    components:{SingleUpload,editor},
    props: {
      isEdit: {
        type: Boolean,
        default: false,
      },
      //传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //初始化配置
        homeAdvertise: {},
        rules: {
          name: [
            {required: true, message: '请输入广告名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
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
        findIntegralInfoById(this.$route.query.id).then(response => {
          this.homeAdvertise = response.data;
        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },

    methods: {
      //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      //需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      //可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.homeAdvertise.ruledescription = ''
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
                updateIntegralList(this.$route.query.id, this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
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
      },
      onReturn(){
          this.$router.back();
      },
    },
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


