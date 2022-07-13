<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
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
