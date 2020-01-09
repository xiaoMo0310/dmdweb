import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/mobile/theme.js'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'tinymce/skins/ui/oxide/skin.css'
Vue.use(preview)
Vue.use(ElementUI, { locale })
Vue.use(VCharts)

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,//
  store,
  template: '<App/>',
  components: { App }
})

