<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="admin"
             :rules="rules"
             ref="adminFrom"
             label-width="150px"
             size="small">
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="admin.username" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="admin.password" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="admin.email" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="admin.nickName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="admin.note" class="input-width"></el-input>
      </el-form-item>
        <el-button type="primary" @click="onSubmit('adminFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('adminFrom')">重置</el-button>
        <el-button type="primary" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
    import { addAdmin } from '@/api/admin';

    export default {
        name: 'addAdmin',
        components:{},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                admin: {
                    username: null,
                    password: null,
                    icon: null,
                    email: null,
                    nickName: null,
                    note: null
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输密码', trigger: 'blur'},
                        {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur'}
                    ]
                },
            }
        },
        created(){

        },
        methods: {
            onSubmit(formName) {
                console.log(JSON.stringify(this.admin));
                console.log("这是用户信息");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            addAdmin(this.admin).then(response => {
                                if (response.data!=null){
                                  console.log(response.data);
                                  console.log("=============================");
                                  this.$message({
                                      message: '提交成功',
                                      type: 'success',
                                      duration:1000
                                  });
                                  this.$router.back();
                                }else{
                                    this.$message({
                                        message: '用户名重复',
                                        type: 'fail',
                                        duration:1000
                                    });
                                }
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
                this.admin = {
                    username: null,
                    password: null,
                    email: null,
                    nickName: null,
                    note: null
                };
            },
            goBack(){
                this.$router.back();
            }
        }
    }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


