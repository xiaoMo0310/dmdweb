const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  openTab: state => state.tab.openTab,
  activeIndex: state => state.tab.activeIndex,
  permission: state => state.user.permissionList,
}
export default getters
