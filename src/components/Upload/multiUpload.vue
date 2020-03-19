<template> 
  <div>
    <el-upload
      action="#"
      :data="dataObj"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'
  import {uploadImage} from '@/api/upload'

  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
          dataObj: {
            fileName: '',
            extName: '',
            fileSize: '',
            serverPath: ''
          },
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList)  ;
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      beforeUpload(file) {
          let isJPG = file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg'
          const isLt2M = file.size / 1024 / 1024 < 2
          if(!isJPG) {
              this.$notify.warning({
                  title: '警告',
                  message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
              })
          }
          if(!isLt2M) {
              this.$notify.warning({
                  title: '警告',
                  message: '图片大小必须小于2M'
              })
          }
          //上传文件
          let formData = new FormData();
          formData.append('file', file);
          let config = {
              headers:{'Content-Type':'multipart/form-data'}
          };
          uploadImage(formData, config).then(response => {
              this.dataObj = response.result
              this.fileList.push({name: file.name,url:this.dataObj.serverPath});
              this.emitInput(this.fileList);
          }).catch(err => {
              console.log(err)
          });
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


