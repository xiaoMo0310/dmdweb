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
          placeholder="选择日期"
          v-model="homeAdvertise.startTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="到期时间：" prop="endTime">
        <el-date-picker
          type="datetime"
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
        <el-select style="width: 30%" v-if="linkType === 1" v-model="type">
          <el-option
            v-for="type in productType"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
        <el-select style="width: 61%" v-if="linkType != 3" v-model="homeAdvertise.url">
          <el-option
            v-for="type in list"
            :key="type.id"
            :label="type.topicName || type.title"
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
  import {findCourseProductList, findCourseProductById} from '@/api/courseProduct'
  import {topicList, getTopicById} from '@/api/topicManagement';
  import SingleUpload from '@/components/Upload/singleUpload'
  import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
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
      };
  const defaultHomeAdvertise = {
    name: null,
    type: null,
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
    data() {
      return {
        homeAdvertise: {},
        list: null,
        total: null,
        id:null,
        type: null,
        linkType: null,
          message: null,
        flag: false,
        typeFlag: true,
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
                label: '商品',
                value: 1
            },
            {
                label: '话题',
                value: 2
            },
            {
                label: '页面',
                value: 3
            }
        ],
          productType: [
              {
                  label: '潜水商品',
                  value: 2
              },
              {
                  label: '学证商品',
                  value: 1
              }
          ]
      }
    },
    created(){
      if (this.isEdit) {
        getHomeAdvertise(this.$route.query.id).then(response => {
          this.homeAdvertise = response.data;
          if(response.data.linkType === 1){
              this.findCourseProductById(this.homeAdvertise.url);
              this.linkType = response.data.linkType;
          }else if(response.data.linkType === 2){
              this.getTopicById(this.homeAdvertise.url)
              this.sleep(1000).then(()=>{
                  this.linkType = response.data.linkType;
              })
          }else {
              this.linkType = response.data.linkType;
              this.id = this.homeAdvertise.url;
          }


        });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
        this.flag = true;
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
              this.getProductList();
          }else if(this.linkType === 2){
              this.getTopicList()
          }

      },
      handleCurrentChange(val) {
          this.listQuery.pageNum = val;
          if(this.linkType === 1){
              this.getProductList();
          }else if(this.linkType === 2){
              this.getTopicList()
          }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      },
      getProductList() {
          this.listQuery.productType = this.type
          findCourseProductList (this.listQuery).then(response => {
              this.list = response.result.list;
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
          findCourseProductById(id).then(response => {
              this.type = response.result.productType
              this.id = response.result.id
          });
      },
      getTopicById(id){
          getTopicById(id).then(response => {
              this.id = response.data.id;
          });
      }
    },
    watch: {
        type(val, oldval){
            if (this.type != null) {
                this.homeAdvertise.url = null;
                this.list = null;
                this.getProductList();
            }
            if(this.id != null){
                this.homeAdvertise.url = this.id;
                this.id = null;
            }
        },
        linkType(val, oldval){
            this.list = null
            this.type = null;
            this.homeAdvertise.url = null;
            if (val === 2) {
                this.getTopicList();
                this.homeAdvertise.url = this.id;
                this.id = null;
            }else if(val === 3){
                this.homeAdvertise.url = this.id;
                this.id = null;
            }

        }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


