<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <el-form-item label="广告名称：" prop="name">
        <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告位置：">
        <el-select v-model="homeAdvertise.type">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-date-picker
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
          v-model="homeAdvertise.startTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
          type="datetime"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期"
          v-model="homeAdvertise.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="上线/下线：">
        <el-radio-group v-model="homeAdvertise.status">
          <el-radio :label="0">下线</el-radio>
          <el-radio :label="1">上线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片：" prop="pic">
        <single-upload v-model="homeAdvertise.pic"></single-upload>
      </el-form-item>
      <el-form-item label="链接类型：" style="width: 100%">
        <el-select v-model="linkType" style="width: 30%">
          <el-option
            v-for="type in linkTypes"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        <el-select style="width: 61%" v-if="linkType != 3 && linkType != 4" v-model="homeAdvertise.url">
          <el-option
            v-for="type in list"
            :key="type.id"
            :label="type.topicName || type.title  || type.englishShorthand"
            :value="type.id">
          </el-option>
          <div style="bottom: 0;width: 100%;background: #fff">
            <div class="pagination-container">
              <el-pagination
                small
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.pageSize"
                :page-sizes="[2,5,10]"
                :current-page.sync="listQuery.pageNum"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </el-select>
        <el-select style="width: 61%" v-if="linkType != 3 && linkType == 4" v-model="homeAdvertise.url">
          <el-option
            v-for="type in list"
            :key="type.id"
            :label="type.title + '('+ resolveStatusType(type.status) +')'"
            :value="type.id">
          </el-option>
          <div style="bottom: 0;width: 100%;background: #fff">
            <div class="pagination-container">
              <el-pagination
                small
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.pageSize"
                :page-sizes="[2,5,10]"
                :current-page.sync="listQuery.pageNum"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </el-select>
      </el-form-item>

      <el-form-item label="广告链接：" prop="url" v-if="linkType === 3">
        <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="ID：" v-if="linkType != 3">
        <el-input v-model="homeAdvertise.url" class="input-width" disabled="disabled" ></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="广告备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="homeAdvertise.note">
        </el-input>
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
    import {findCourseProductList,findProductAndPageNumById} from '@/api/courseProduct'
    import {fetchList, findCertificateAndPageById} from '@/api/certificate'
    import {topicList, getTopicAndPageById} from '@/api/topicManagement';
    import SingleUpload from '@/components/Upload/singleUpload'
    import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
    let countNum = 0;
    const defaultTypeOptions = [
            {
                label: '首页轮播',
                value: 1
            },
            {
                label: '商场轮播',
                value: 2
            },
            {
                label: '启动页',
                value: 3
            },
            {
                label: '引导页',
                value: 4
            }
        ],
        defaultListQuery = {
            pageNum: 1,
            pageSize: 5,
            productType: null,
            orderBy: null,
            productId: null,
            status: null
        };
    const defaultHomeAdvertise = {
        name: null,
        pic: null,
        startTime: null,
        endTime: null,
        status: 0,
        url: null,
        note: null,
        linkType: null,
        sort: 0
    };
    export default {
        name: 'HomeAdvertiseDetail',
        components:{SingleUpload},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        filters:{
            formatTime(time){
                if(time==null){
                    return 'N/A';
                }
                let replace = time.replace(/-/g, "/");
                let date = new Date(replace);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
            }
        },

        data() {
            return {
                homeAdvertise: {},
                list: null,
                total: null,
                linkType: null,
                id:null,
                message: null,
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
                listQuery: Object.assign({}, defaultListQuery),
                typeOptions: Object.assign({}, defaultTypeOptions),
                linkTypes: [
                    {
                        label: '学证商品',
                        value: 1,
                    },
                    {
                        label: '潜水商品',
                        value: 4,
                    },
                    {
                        label: '话题',
                        value: 2
                    },
                    {
                        label: '页面',
                        value: 3
                    }
                ]
            }
        },
        created(){
            if (this.isEdit) {
                getHomeAdvertise(this.$route.query.id).then(response => {
                    this.homeAdvertise = response.data;
                    if(response.data.linkType === 4){
                        this.findCourseProductById(this.homeAdvertise.url);
                    }else if(response.data.linkType === 2){
                        this.getTopicById(this.homeAdvertise.url)
                    }else if(response.data.linkType === 1){
                        this.findCertificateById(this.homeAdvertise.url);
                    }
                    this.createLinkType(response.data.linkType)
                });
            }else{
                this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
            }
        },
        methods: {
            createLinkType(linkType){
                if(countNum >= 10){
                    this.linkType = linkType
                    return;
                }
                if(this.id != null){
                    this.linkType = linkType
                }else {
                    this.sleep(1000).then(()=>{
                        if(this.id != null){
                            this.linkType = linkType
                        }else {
                            countNum = countNum + 1;
                            this.createLinkType(linkType)
                        }
                    })
                }
            },
            resolveStatusType(type){
                if(type === 1){
                    return "在售"
                }else if(type === 2){
                    return "下架"
                }else if(type === 3){
                    return "删除"
                }else if(type === 4){
                    return "停止销售"
                }else if(type === 5){
                    return "已售完"
                }
            },
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否提交数据', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.homeAdvertise.linkType = this.linkType;
                            if (this.isEdit) {
                                updateHomeAdvertise(this.$route.query.id, this.homeAdvertise).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        duration:1000
                                    });
                                    this.$router.back();
                                });
                            } else {
                                createHomeAdvertise(this.homeAdvertise).then(response => {
                                    this.$refs[formName].resetFields();
                                    this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                                    this.$message({
                                        message: '提交成功',
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
            onReturn(){
                this.$router.back();
            },
            sleep(ms) {
                return new Promise(resolve =>
                    setTimeout(resolve, ms)
                )
            },
            handleSizeChange(val) {
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                if(this.linkType === 1){
                    this.getCertificateList()
                }else if(this.linkType === 4){
                    this.getDivingProductList();
                }else if(this.linkType === 2){
                    this.getTopicList()
                }

            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                if(this.linkType === 1){
                    this.getCertificateList()
                }else if(this.linkType === 4){
                    this.getDivingProductList();
                }else if(this.linkType === 2){
                    this.getTopicList()
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
            },
            getDivingProductList() {
                this.listQuery.productType = 2
                this.listQuery.orderBy = "status asc, id asc"
                findCourseProductList (this.listQuery).then(response => {
                    this.list = response.result.list;
                    this.total = response.result.total;
                })
            },
            getCertificateList(){
                this.listQuery.orderBy = "CONVERT(certificate_level,SIGNED) asc"
                this.listQuery.status = 1
                fetchList(this.listQuery).then(response => {
                    this.list = response.result.list;
                    for (let i = 0; i < this.list.length; i++) {
                        this.list[i].englishShorthand = this.list[i].englishShorthand + "证书"
                    };
                    this.total = response.result.total;
                })
            },
            getTopicList() {
                topicList (this.listQuery).then(response => {
                    this.list = response.data.list;
                    this.total = response.data.total;
                })
            },
            findCourseProductById(id){
                this.listQuery.productId = id;
                findProductAndPageNumById(this.listQuery).then(response => {
                    this.id = response.result.id
                    this.listQuery.pageNum = response.result.pageNum;
                });
            },
            getTopicById(id){
                getTopicAndPageById(id, this.listQuery.pageSize).then(response => {
                    this.id = response.data.id;
                    this.listQuery.pageNum = response.data.pageNum
                });
            },
            findCertificateById(id){
                findCertificateAndPageById(id, this.listQuery.pageSize).then(response => {
                    this.id = response.result.id
                    this.listQuery.pageNum = response.result.pageNum;
                });
            }

        },
        watch: {
            /*type(val, oldval){
                if (this.type != null) {
                    if(val === 1){
                        this.getCertificateList();
                        this.linkType = 1
                    }else {
                        this.getDivingProductList();
                        this.linkType = 4
                    }
                    this.homeAdvertise.url = null;
                    this.list = null;

                }
                if(this.id != null){
                    this.homeAdvertise.url = this.id;
                    this.id = null;
                }
            },*/
            linkType(val, oldval){
                this.homeAdvertise.url = null;
                this.list = null;
                if(this.id === null){
                    this.listQuery.pageNum = 1;
                }
                if (val === 2) {
                    this.getTopicList();
                }else if(val === 1){
                    this.getCertificateList();
                }else if(val === 4){
                    this.getDivingProductList()
                }
                this.homeAdvertise.url = this.id;
                this.id = null;
            }
        }
    }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


