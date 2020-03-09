<template> 
  <el-card class="form-container" shadow="never"  style="width:1200px;">
    <el-form :model="shopLevelExplain"
             :rules="rules"
             ref="shopLevelExplainFrom"
             label-width="100px"
             size="medium">
      <el-form-item label="店铺等级说明：" prop="levelExplain">
        <!--<editor v-model="shopLevelExplain.levelExplain" ref="editor"
                :disabled="disabled"
                @onClick="onClick"
                style="width:1000px;"
        >
        </editor>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
        <button @click="disabled = false">启用</button>-->
        <tinymce :width="1000" :height="400" v-model="shopLevelExplain.levelExplain"></tinymce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('shopLevelExplainFrom')">提交</el-button>
        <el-button type="info" size="small" @click="onReturn('shopLevelExplainFrom')">返回</el-button>
        <el-button v-if="!isEdit" @click="resetForm('shopLevelExplainFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  import {udpateShopLevelExplain, findShopLevelExplainById } from '@/api/shopLevelExplain'
  import editor from '@/components/common/TinymceEditor'
  import Tinymce from '@/components/common/Tinymce'


  const defaultshopLevelExplain = {
    levelExplain: null
  };
  export default {

    name: 'TopicDetail',
    components:{SingleUpload,editor, Tinymce},
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
        shopLevelExplain: {"levelExplain":null},
        rules: {
          levelExplain: [
            {required: true, message: '请填写等级说明', trigger: 'blur'}
          ]
        },
      }
    },
    created(){
      if (this.isEdit) {
        findShopLevelExplainById(this.$route.query.id).then(response => {
          this.shopLevelExplain = response.result;
        });
      }else{
        this.shopLevelExplain = Object.assign({},defaultshopLevelExplain);
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
        //this.shopLevelExplain.levelExplain = ''
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              udpateShopLevelExplain(this.shopLevelExplain).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            });
          }else {
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
        this.shopLevelExplain = Object.assign({},defaultshopLevelExplain);
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


