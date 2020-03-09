<template> 
  <el-card class="form-container" shadow="never"  style="width:1200px;">
    <el-form :model="shopNotice"
             :rules="rules"
             ref="shopNoticeFrom"
             label-width="100px"
             size="medium">
      <el-form-item label="公告标题：" prop="title">
        <el-input v-model="shopNotice.title" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="公告内容：" prop="content">
        <tinymce :width="1000" :height="400" v-model="shopNotice.content"></tinymce>
        <!--<button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
        <button @click="disabled = false">启用</button>-->
      </el-form-item>
      <el-form-item label="上线/下线：" >
        <el-radio-group v-model="shopNotice.isDelete">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit('shopNoticeFrom')">提交</el-button>
        <el-button type="info" size="small" @click="onReturn('shopNoticeFrom')">返回</el-button>
        <el-button v-if="!isEdit" @click="resetForm('shopNoticeFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {saveShopNotie} from '@/api/shopNotice'
  import Tinymce from '@/components/common/Tinymce'


  const defaultshopNotice = {
    title: null,
    content: null,
    isDelete: 1,
  };
  export default {

    name: 'shopNotice',
    components:{Tinymce},
    props: {
      isEdit: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //初始化配置
        shopNotice: {'content':null},
        rules: {
          title: [
            {required: true, message: '请输入公告标题', trigger: 'blur'},
            {min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'}
          ],
        },

      }
    },
    created(){
      if (this.isEdit) {

      }else{
        this.shopNotice = Object.assign({},defaultshopNotice);
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
        this.$refs.editor.clear()
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              saveShopNotie(this.shopNotice).then(response => {
                this.$message({
                  message: '发送成功',
                  type: 'success',
                  duration:1000
                });
                this.$router.back();
              });
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
        this.shopNotice = Object.assign({},defaultshopNotice);
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


