import { createStore } from 'vuex'

export default createStore({
  state: {
    avatar: null
  },
  getters: {
    getAvatar: state => state.avatar
  },
  mutations: {
    setAvatar(state, avatar) {
      state.avatar = avatar;
    }
  },
  actions: {
    updateAvatar({ commit }, avatar) {
      commit('setAvatar', avatar);
    }
  },
  modules: {
  }
})
