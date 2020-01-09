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
          :label="item.title"
          :name="item.path"
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
    data() {
        return {
            index: null,
        }
    },
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
            let path = {name:to.name, title:to.meta.title, path:to.path, query:to.query, params:to.params}
            for(let item of this.openTab){
                if(item.name === to.name){
                    this.$store.commit('update_tabs', path);
                    this.$store.commit('set_active_index',path.path)
                    flag = true;
                    break;
                }
            }

            if(!flag){
                if(path.path !== '/' && path.path !== '/home'){
                    this.$store.commit('add_tabs', path);
                }
                this.$store.commit('set_active_index', path.path);
            }
        }
    },
    mounted () {
        // 刷新时以当前路由做为tab加入tabs
        // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
        // 当当前路由是首页时，添加首页到store，并设置激活状态
        let router = {name:this.$route.name, title:this.$route.meta.title, path:this.$route.path, query:this.$route.query, params:this.$route.params}
        if (this.$route.path !== '/' && this.$route.path !== '/home') {
            this.$store.commit('add_tabs', {path: '/home' , title: '首页'});
            this.$store.commit('add_tabs', router);
            this.$store.commit('set_active_index', router.path);
        } else {
            this.$store.commit('add_tabs', {path: '/home', title: '首页'});
            this.$store.commit('set_active_index', '/home');
            this.$router.push('/home');
        }
    },
    methods: {
        tabClick(tab){
            let router = this.getRouter(this.activeIndex);
            this.$router.push({name:router.name, title:router.title, path:router.path, query:router.query, params:router.params});
        },
        getRouter(val){
            for (let i = 0; i < this.openTab.length; i++) {
                if(this.openTab[i].path === val){
                    return this.openTab[i]
                }
            }
        },
        //移除tab标签
        tabRemove(targetName){
            console.log(targetName)
            //首页不删
            if(targetName == '/home'){
                return
            }
            this.$store.commit('delete_tabs', targetName);
            if (this.activeIndex === targetName) {
                // 设置当前激活的路由
                console.log(this.openTab)
                console.log(this.openTab.length)
                if (this.openTab && this.openTab.length >= 1) {
                    console.log("qunima ")
                    let path = this.openTab[this.openTab.length-1];
                    console.log(path)
                    this.$store.commit('set_active_index', path.path);
                    this.$router.push({name:path.name, title:path.title, path:path.path, query:path.query, params:path.params});
                } else {
                    this.$router.push({path: '/'});
                }
            }
        }
    }
}
</script>
