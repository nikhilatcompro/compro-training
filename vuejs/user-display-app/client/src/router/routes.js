import List from '../components/List';
import Form from '../components/Form';
import ShowUser from '../components/ShowUser.vue';

export default [
  { path: '/', component: List },
  { path: '/users', component: List },
  { path: '/users/new', component: Form, name: 'new' },
  { path: '/users/:id', component: ShowUser },
  { path: '/users/:id/edit', component: Form, name: 'edit' }
];
