import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';

// Filters
Vue.filter('dashed-dob', (value) => {
  return value.replaceAll('/', '-');
});

// eslint-disable-next-line no-new
new Vue({
  store,
  el: '#app',
  render: h => h(App)
});
