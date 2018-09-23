import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

//初始化数据
const state = {
  isLogin: false,
  account: null,
  profile: null,
  songList: null,
};

const getters = {
  songList: function (state) {
    return state.songList;
  },

  isLogin: function (state) {
    let temp = state.isLogin;
    if (!state.isLogin) {
      temp = eval(localStorage.getItem('isLogin'));
    }
    return temp;
  },
  profile: function (state) {
    let temp = state.profile;
    if (!state.profile) {
      temp = JSON.parse(localStorage.getItem('profile'));
    }
    return temp;
  },
  account: function (state) {
    let temp = state.account;
    if (!state.account) {
      temp = JSON.parse(localStorage.getItem('account'))
    }
    return temp;
  }
};

const mutations = {
  setSongList(state, item) {
    state.songList = item;
  },
  setIsLogin(state, boolean) {
    state.isLogin = boolean;
    localStorage.setItem('isLogin', boolean);
  },
  setProfile(state, value) {
    state.profile = value;
    localStorage.setItem('profile', JSON.stringify(value))
  },
  removeProfile(state) {
    state.profile = null;
    localStorage.removeItem('profile');
  },
  setAccount(state, value) {
    state.account = value;
    localStorage.setItem('account', JSON.stringify(value))
  },
  removeAccount(state) {
    state.profile = null;
    localStorage.removeItem('account');
  }
};
const actions = {}

let vuexStore = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

// 使用 export default 封装，让外部可以访问
export default vuexStore;
