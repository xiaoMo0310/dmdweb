<template> 
  <el-card class="form-container" show="never">
    <el-form :model="message"
             :rules="rules"
             ref="messageFrom"
             label-width="150px"
             size="small">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="message.title" class="input-width" placeholder="请输入消息标题"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="message.content">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('messageFrom')">发送</el-button>
        <el-button type="info" size="small" @click="onReturn('homeAdvertiseFrom')">返回</el-button>
        <el-button  @click="resetForm('messageFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {sendMessage, batchSendMessage, sendAllMessage} from '@/api/message'
  const defaultMessage = {
    title: null,
    content: null
  };
  export default {
    name: 'MessageDetail',
    props: {
      sendType: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        message: {},
        rules: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'},],
          content: [
            {required: true, message: '请输入要通知的内容', trigger: 'blur'},
            {required: true, min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onReturn(){
          this.$router.back();
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否立即发送消息', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.sendType === 1) {
                sendMessage(this.$route.query.id, this.$route.query.userType, this.message).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '发送成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else if(this.sendType === 2) {
                  let params = new URLSearchParams();
                  params.append("ids",this.$route.params.ids);
                  batchSendMessage(params, this.$route.params.userType,  this.message).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '发送成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                  sendAllMessage(this.$route.query.userType, this.message).then(response => {
                      this.$refs[formName].resetFields();
                      this.$message({
                          message: '发送成功',
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
        this.message = Object.assign({},defaultMessage);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


