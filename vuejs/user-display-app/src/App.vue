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
  import userForm from './components/Form.vue';
  import userList from './components/List.vue';
  import ShowUser from './components/ShowUser.vue';
  export default {
    name: 'app',
    components: {
      ShowUser,
      userList,
      userForm
    },
    data () {
      return {
        component: userList
      };
    },
    methods: {
      /**
       * A method that changes the
       * component data property to
       * Form.
       */
      showForm () {
        this.component = userForm;
      },
      /**
       * A method that changes the
       * component data property to
       * List.
       */
      showList () {
        this.component = userList;
      }
    }
  };
</script>

<style>
  body {
    background-color: rgb(229, 217, 195);
  }
</style>
