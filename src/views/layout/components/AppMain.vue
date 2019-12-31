<template>

  <section class="app-main">
    <div>
      <el-tabs
        v-model="activeIndex"
        type="card"
        closable
        v-if="openTab.length"
        @tab-click='tabClick'
        @tab-remove='tabRemove'
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in openTab"
          :label="item.name"
          :name="item.route"
        />
        <router-view></router-view>
      </el-tabs>

    </div>
      <!--<transition name="fade" mode="out-in">
        &lt;!&ndash; <router-view :key="key"></router-view> &ndash;&gt;

      </transition>-->
  </section>

</template>

<script>
export default {
  name: 'AppMain',
  /*computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }*/
    computed: {
        openTab () {
            return this.$store.getters.openTab;
        },
        activeIndex:{
            get () {
                return this.$store.getters.activeIndex;
            },
            set (val) {
                this.$store.commit('set_active_index', val);
            }
        }
    },

    watch:{
        '$route'(to,from){
            //判断路由是否已经打开
            //已经打开的 ，将其置为active
            //未打开的，将其放入队列里
            let flag = false;
            for(let item of this.openTab){
                if(item.name === to.meta.title){
                    this.$store.commit('set_active_index',to.path)
                    flag = true;
                    break;
                }
            }

            if(!flag){
                this.$store.commit('add_tabs', {route: to.path, name: to.meta.title});
                this.$store.commit('set_active_index', to.path);
            }
        }
    },
    mounted () {
        // 刷新时以当前路由做为tab加入tabs
        // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
        // 当当前路由是首页时，添加首页到store，并设置激活状态
        if (this.$route.path !== '/' && this.$route.path !== '/home') {
            this.$store.commit('add_tabs', {route: '/home' , name: '首页'});
            this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.meta.title });
            this.$store.commit('set_active_index', this.$route.path);
        } else {
            this.$store.commit('add_tabs', {route: '/home', name: '首页'});
            this.$store.commit('set_active_index', '/home');
            this.$router.push('/home');
        }
    },
    methods: {
        tabClick(tab){
            this.$router.push({path: this.activeIndex});
        },
        //移除tab标签
        tabRemove(targetName){
            //首页不删
            if(targetName == '/home'){
                return
            }
            this.$store.commit('delete_tabs', targetName);
            if (this.activeIndex === targetName) {
                // 设置当前激活的路由
                if (this.openTab && this.openTab.length >= 1) {
                    this.$store.commit('set_active_index', this.openTab[this.openTab.length-1].route);
                    this.$router.push({path: this.activeIndex});
                } else {
                    this.$router.push({path: '/'});
                }
            }
        }
    }
}
</script>
