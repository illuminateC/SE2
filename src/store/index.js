import { createStore } from 'vuex'

export default createStore({
  state: {
    avatar: null,
    follows: null,
    collections: null,
  },
  getters: {
    getAvatar: state => state.avatar
  },
  mutations: {
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    setFollows(state, follows) {
      state.follows = follows
    },
    setCollections(state, collections) {
      state.collections = collections
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
