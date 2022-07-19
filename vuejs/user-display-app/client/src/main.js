import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';
import VueRouter from 'vue-router';
import Routes from './router/routes';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: Routes
});

// Filters
Vue.filter('dashed-dob', (value) => {
  if (!value) return value;
  return value.replaceAll('/', '-');
});

// eslint-disable-next-line no-new
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});
