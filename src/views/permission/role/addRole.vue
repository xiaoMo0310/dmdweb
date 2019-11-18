<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="role"
             ref="roleFrom"
             label-width="150px"
             size="small">
      <el-form-item label="角色名称：">
        <el-input v-model="role.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="role.description" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-input v-model="role.status" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="role.sort" class="input-width"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit('roleFrom',role.id)" style="margin-left: 150px;">提交</el-button>
      <el-button v-if="!isEdit" @click="resetForm('roleFrom')">重置</el-button>
      <el-button type="primary" @click="goBack()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
    import { addRole,modifyRole } from '@/api/admin';

    export default {
        name: 'addRole',
        components:{},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                role: {
                    id: null,
                    name: null,
                    description: null,
                    status: null,
                    sort: null
                },
                // rules: {
                //     username: [
                //         {required: true, message: '请输入用户名', trigger: 'blur'},
                //         {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                //     ],
                //     password: [
                //         {required: true, message: '请输密码', trigger: 'blur'},
                //         {min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur'}
                //     ]
                // },
            }
        },
        created(){
            let modify=this.$route.query.type;
            if (modify==="modify"){
                this.role=this.$route.query.umsRole;
            }
        },
        methods: {
            onSubmit(formName,id) {
                console.log(JSON.stringify(this.role));
                console.log("这是用户信息");
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            if (id==null){
                                addRole(this.role).then(response => {
                                    if (response.code===200){
                                        this.$message({
                                            message: '提交成功',
                                            type: 'success',
                                            duration:1000
                                        });
                                        this.$router.back();
                                    }else {
                                        this.$message({
                                            message: '提交失败',
                                            type: 'fail',
                                            duration:1000
                                        });
                                    }

                                });
                            }else{
                                modifyRole(this.role).then(response => {
                                    if (response.code===200){
                                        this.$message({
                                            message: '提交成功',
                                            type: 'success',
                                            duration:1000
                                        });
                                        this.$router.back();
                                    }else {
                                        this.$message({
                                            message: '提交失败',
                                            type: 'fail',
                                            duration:1000
                                        });
                                    }

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
                this.role = {
                    id:null,
                    name: null,
                    description: null,
                    status: null,
                    sort: null
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


