<template>
  <div>
    <keep-alive>
      <component
        @back-click="showList"
        @user-added="showList"
        @clicked-add="showForm"
        @user-edited="showList"
        @edit-form="showForm"
        :is="component"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
  import Form from './components/Form.vue';
  import List from './components/list.vue';
  import ShowUser from './components/ShowUser.vue';
  export default {
    name: 'app',
    components: {
      'user-list': List,
      'user-form': Form,
      ShowUser
    },
    data () {
      return {
        component: 'user-list'
      };
    },
    methods: {
      /**
       * a method that changes the
       * component data property to
       * Form.
       * @param {void}
       * @returns {void}
       */
      showForm () {
        this.component = 'user-form';
      },
      /**
       * a method that changes the
       * component data property to
       * List.
       * @param {void}
       * @returns {void}
       */
      showList () {
        this.component = 'user-list';
      }
    }
  };
</script>

<style>
  body {
    background-color: rgb(229, 217, 195);
  }
</style>
