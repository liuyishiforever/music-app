import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'
import {playMode} from '../common/js/config'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

//初始化数据
const state = {
  isLogin: false,
  account: null,
  profile: null,
  songList: null,
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  show: true

};
const getters = {
  show: function (state) {
    return state.show;
  },

  playing: function (state) {
    return state.playing;
  },
  fullScreen: function (state) {
    return state.fullScreen;
  },
  playList: function (state) {
    return state.playList;
  },
  sequenceList: function (state) {
    return state.sequenceList;
  },
  mode: function (state) {
    return state.mode;
  },
  currentIndex: function (state) {
    return state.currentIndex;
  },
  currentSong: function (state) {
    return state.playList[state.currentIndex];
  },
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
  setShow(state, boolean) {
    state.show = boolean;
  },
  setPlaying(state, boolean) {
    state.playing = boolean;
  },
  setFullScreen(state, boolean) {
    state.fullScreen = boolean;
  },
  setPlayList(state, list) {
    state.playList = list;
  },
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  setMode(state, mdoe) {
    state.mode = mdoe;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },

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
const actions = {
  selectPlay({commit, state}, {list, index}) {
    commit('setSequenceList', list);
    if (state.mode == playMode.random) {
      let randomList = shuffle(list);
      commit('setSequenceList', randomList)
    } else {
      commit('setPlayList', list);
    }
    commit('setCurrentIndex', index);
    commit('setFullScreen', true);
    commit('setPlaying', true);
  }

}

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
