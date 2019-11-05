<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init">
    </editor>
    <el-dialog title="图片上传"
               :visible.sync="dialogVisible"
               width="60%"
               :lock-scroll="true"
               :close-on-click-modal="false">
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

      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="()=>{this.dialogVisible=false}">取 消</el-button>
        <el-button type="primary"
                   @click="insertImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/preview'
  import SingleUpload from '@/components/Upload/singleUpload'
  import {uploadFile} from '@/api/upload'

  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image media table wordcount link preview'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo |  formatselect fontselect fontsizeselect | bold italic forecolor backcolor  |  link imageUpload  table | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent|removeformat preview'
      }
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
    data () {
      return {
        dataObj: {
          fileName: '',
          extName: '',
          fileSize: '',
          serverPath: ''
        },
        dialogVisible: false,
        url: process.env.BASE_API + "/upload/file",
        loading: undefined,
        api: {
          SingleUpload: SingleUpload
        },
        imageList: [],
        editor: null,
        init: {
          language_url: '/static/plugin/tinymce/langs/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/plugin/tinymce/skins/ui/oxide',
          height: 300,
          fontsize_formats: "12px 14px 16px 18px 20px",
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          menubar: false,
          setup: (editor) => {//设置自定义功能的按钮
            editor.ui.registry.addButton("imageUpload", {//单个按钮，此处的uploading是该按钮的名称
              tooltip: "上传图片",//鼠标放上去后现在是内容.
              icon: 'image',
              onAction: () => {
                this.dialogVisible = true;
                this.editor = editor;
                this.imageList = [];
              }
            });
          },
        },
        myValue: this.value
      }
    },
    mounted () {
      tinymce.init({})
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
        uploadFile(formData, config).then(response => {
          this.showFileList = true;
          this.fileList.pop();
          this.fileList.push({name: file.name, url: response.result.serverPath});
          this.emitInput(this.fileList[0].url);
        });
        return false;
      },
      //删除图片
      delImage (index) {
        let imageList = this.imageList;
        imageList.splice(index, 1);
      },
      //图片开始上传
      imageBeforeUpload () {
        this.loading = this.$loading({
          lock: true,
          text: '加载中......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      },
      //图片上传成功
      SingleUpload (response, file) {
        if (this.loading != undefined) {
          this.loading.close();
        }
        let imageList = this.imageList;
        let item = response.data;
        imageList.push(item);
        this.imageList = imageList;
      },
      insertImage () {
        this.dialogVisible = false;
        let imageList = this.imageList;
        if (imageList.length == 0) {
          return;
        }
        let insertHtml = "";
        (imageList || []).map((item, index) => {
          insertHtml = insertHtml + "<p><img src=" + item.url + "><p>";
        });
        this.editor.execCommand('mceInsertContent', false, insertHtml);
      }
    },
    watch: {
      value (newValue) {
        this.myValue = newValue
      },
      myValue (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>
<style scoped>
  .image-upload-panel {
    overflow: hidden;
  }
  .image-upload-btn {
    float: left;
    width: 150px;
    height: 150px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    line-height: 150px;
    text-align: center;
  }

  .image-upload-btn div {
    width: 150px;
  }

  .image-upload-btn i {
    font-size: 30px;
    font-weight: 400;
  }
  .image-item {
    float: left;
    width: 150px;
    height: 150px;
    background: #ddd;
    margin-right: 10px;
    border-radius: 6px;
    position: relative;
  }
  .image-item img {
    max-width: 150px;
    border-radius: 6px;
  }
  .image-del {
    position: absolute;
    top: 0px;
    right: 0px;
    color: red;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }
</style>
