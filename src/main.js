// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import 'common/scss/icon.scss';
import VueLazyload from 'vue-lazyload'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'



// 初始化VueLazyload要放在iView之前
// 否则会初始化失败
Vue.use(VueLazyload, {
  loading: require('common/image/default.png'),
  bannerloading: require('assets/bcg.jpg')
});


Vue.use(iView);
Vue.prototype.$axios = axios;
Vue.use(VueLazyload);
Vue.config.productionTip = false;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
