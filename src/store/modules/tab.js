
const tab = {
  state: {
    openTab:[],//所有打开的路由
    activeIndex:'/main' //激活状态
  },
  mutations: {
    // 添加tabs
    add_tabs (state, data) {
      state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      state.activeIndex = index;
    },
  }

}

export default tab
