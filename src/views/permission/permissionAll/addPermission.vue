<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="permission"
             :rules="rules"
             ref="permissionFrom"
             label-width="150px"
             size="small">
      <el-form-item label="父权限id：">
        <el-input v-model="permission.pid" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="权限名：">
        <el-input v-model="permission.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="权限值：">
        <el-input v-model="permission.value" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="图标：">
        <el-input v-model="permission.icon" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="权限类型：">
        <el-input v-model="permission.type" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="路径：">
        <el-input v-model="permission.uri" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-input v-model="permission.status" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="permission.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="onSubmit('permissionFrom')">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('permissionFrom')">重置</el-button>
      <el-button type="info" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
    import { addPermission } from '@/api/admin';
    export default {
        name: 'addPermission',
        components:{},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                permission: {
                    pid: null,
                    name: null,
                    value: null,
                    icon: null,
                    type: null,
                    uri: null,
                    status:null,
                    createTime: null,
                    sort: null
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
                console.log(JSON.stringify(this.permission));
                console.log("这是用户信息");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            addPermission(this.permission).then(response => {
                                if (response.data!=null){
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
                this.permission = {
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


