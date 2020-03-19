<template> 
  <div>
    <el-upload
      action="#"
      :data="dataObj"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      accept="image/png,image/gif,image/jpg,image/jpeg"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-preview="handlePreview">
      <el-button size="small" type="primary" >点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'
  import {uploadImage} from '@/api/upload'

  export default {
    name: 'singleUpload',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
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
        url: process.env.BASE_API + "/upload/file"
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
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
          let size = file.size / 1024 / 1024 / 2
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
              this.showFileList = true;
              this.fileList.pop();
              this.fileList.push({name: file.name, url: response.result.serverPath});
              this.emitInput(this.fileList[0].url);
          });
         return false;
      }
    }
  }
</script>
<style>

</style>


