import Vue from 'vue';
import App from './App.vue';

// Filters
Vue.filter('dashed-dob', (value) => {
  return value.replaceAll('/', '-');
});

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App)
});
