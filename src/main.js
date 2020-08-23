import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import ApplicationModel from './classes/ApplicationModel'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$am=new ApplicationModel();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
