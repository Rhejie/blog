import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import API from "./api/index.js";
import EventDispatcher from "./service/EventDispatcher.js";

Vue.prototype.$API = API;
Vue.prototype.$EventDispatcher = new EventDispatcher();

import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale, size: "small" });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
