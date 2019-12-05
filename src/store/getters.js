const getters = {
  userName: (state) => state.user.userName,
  permission: (state) => state.user.permission,
  menu: (state) => state.user.menu,
  tagsList: (state) => state.app.tagsList,
  isCollapse: (state) => state.app.isCollapse,
  lang: (state) => state.app.lang,
  breadList: (state) => state.app.breadList
}
export default getters
