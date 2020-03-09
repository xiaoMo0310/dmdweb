<template>
  <div>
    <textarea ref="editor" :id= "tinymceId"></textarea>
  </div>

</template>

<script>
  import {uploadFile} from '@/api/upload'
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  import 'tinymce/plugins/image'// 插入上传图片插件
  import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/link' //超链接插件
  import 'tinymce/plugins/code' //代码块插件
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/contextmenu'  //右键菜单插件
  import 'tinymce/plugins/wordcount' // 字数统计插件
  import 'tinymce/plugins/colorpicker' //选择颜色插件
  import 'tinymce/plugins/textcolor'  //文本颜色插件
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help'
  import 'tinymce/plugins/charmap'
  import 'tinymce/plugins/paste'
  import 'tinymce/plugins/hr'
  import 'tinymce/plugins/searchreplace'
  import 'tinymce/plugins/insertdatetime'
  import 'tinymce/plugins/toc'
  import 'tinymce/plugins/codesample'

  export default {

    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      id: {
        type: String
      },
      height: {
        type: Number,
        required: false,
        default: 360
      },
      width: {
        type: Number,
        required: false,
        default: 720
      }
    },
    data () {
      return {
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date(),
        tinymceHtml:'',
        DefaultInit: {
          selector: `#${this.tinymceId}`,
          ref: "editor",
          width: this.width,
          height: this.height,
          language_url:'/static/tinymce/langs/zh_CN.js',  //导入语言文件
          language: "zh_CN",//语言设置
          skin_url: '/tinymce/skins/ui/oxide',//主题样式
          content_css: '/tinymce/skins/content/default/content.css',
          menubar: false,// 隐藏最上方menu菜单
          toolbar: true,//false禁用工具栏（隐藏工具栏）
          browser_spellcheck: true, // 拼写检查
          branding: false, // 去水印
          statusbar: false, // 隐藏编辑器底部的状态栏
          elementpath: false,  //禁用下角的当前标签路径
          paste_data_images: true, // 允许粘贴图像
          toolbar:['bold italic underline strikethrough blockquote|forecolor backcolor|formatselect |fontsizeselect  | alignleft aligncenter alignright alignjustify | outdent indent |codeformat blockformats| removeformat undo redo ',

            'bullist numlist toc pastetext|codesample charmap  hr insertdatetime |lists image media table link unlink |code searchreplace fullscreen help '],
          plugins: 'lists image media table wordcount code fullscreen help codesample toc insertdatetime  searchreplace  link charmap paste hr' ,

        }

      }

    },

    mounted () {
      this.init()
    },
    destroyed() {
      this.destroyTinymce()
    },
    activated() {
      this.initTinymce()
    },
    methods: {
      init () {
        const _this = this;
        window.tinymce.init({
          // 默认配置
          ...this.DefaultInit,
          // 图片上传
          images_upload_handler: function (blobInfo, success, failure){
            let file = blobInfo.blob();
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
              if(response.code==200){
                success(response.result.serverPath)
              }else{
                failure('上传失败！')
              }
            });
          },
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent())
            })
          },
          // 挂载的DOM对象
          selector: `#${this.tinymceId}`,
        })
      },
      destroyTinymce() {
        if (window.tinymce.get(this.tinymceId)) {
          window.tinymce.get(this.tinymceId).destroy()
        }
      },
      setContent(value) {
        window.tinymce.get(this.tinymceId).setContent(value)
      },
      getContent() {
        window.tinymce.get(this.tinymceId).getContent()
      },
    },
    watch: {
      value(val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
        }
      }
    },
  }

</script>
