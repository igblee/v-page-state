export default {
  state: {
    page: 'page2',
    keepState: 1,
    notKeepState: 1,
  },
  getters: {},
  mutations: {
    'UPDATE_KEEP_STATE'(state, payload) {
      state.keepState = payload
    },
    'UPDATE_NOT_KEEP_STATE'(state, payload) {
      state.notKeepState = payload
    }
  },
  actions: {}
}