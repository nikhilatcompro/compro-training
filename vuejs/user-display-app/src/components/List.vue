<!-- eslint-disable no-unused-expressions -->
<template>
  <div>
    <table class="user-table">
      <thead class="table-head">
        <td class="table-data">User id</td>
        <td class="table-data">Name</td>
        <td class="table-data">More</td>
      </thead>
      <tr v-for="user in users" :key="user.id">
        <td class="table-data">{{ user.id }}</td>
        <td class="table-data">{{ user.name }}</td>
        <td class="table-data"><a @click="onShowMoreClick(user)">Show More..</a></td>
      </tr>
    </table>
    <div>
      <button class="add-btn" @click="onAddUserClick">Add User</button>
    </div>
  </div>
</template>

<script>
  import EventBus from '../event-bus';
  export default {
    /**
     * A user
     * @typedef {Object} user
     * @property {number} id - user id
     * @property {string} name - user name
     * @property {string} email - user email
     * @property {string} dob - user date of birth
     */
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'userList',
    data () {
      return {
        user: null
      };
    },
    computed: {
      users () {
        return this.$store.state.users;
      }
    },
    methods: {
      /**
       * A method that gets triggered when show-
       * more link is clicked. It sets the
       * user data property and toggles
       * the value of showMore variable.
       * @param {user} user - the user for which we clicked the button.
       */
      onShowMoreClick (user) {
        // this.user = user;
        this.$router.push(`/users/${user.id}`);
      },
      /**
       * A method that gets triggered when
       * Add User button is clicked. It
       * emits an event to the Form.vue and
       * App.vue component.
       */
      onAddUserClick () {
        this.$router.push('/users/new');
        EventBus.$emit('add-user');
      }
    }
  };
</script>

<style>
  .action-btn {
    border: none;
    margin: .25rem .25rem;
  }

  .action-btn:hover {
    background-color: rgb(39, 171, 127);
  }
  .add-btn {
    background-color: pink;
    border-radius: 0.5rem;
    border-style: none;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    height: 2.5rem;
    line-height: 1.25rem;
    outline: none;
    margin: 2rem 0 0 25%;
    padding: 0.625rem 1rem;
    position: relative;
    text-align: center;
  }

  .add-btn:hover,
  .add-btn:focus {
    background-color: #f082ac;
  }

  .delete-btn:hover {
    background-color: rgb(235, 36, 92);
  }

  .table-data {
    text-align: center;
  }

  .table-head {
    font-weight: bolder;
    background-color: white;
  }

  .user-table{
    border: solid skyblue;
    margin: 0 auto;
    width: 50%;
  }

  .user-table > tr:nth-child(odd){
    background-color: skyblue;
  }
  .user-table > tr:nth-child(even){
    background-color: white;
  }
</style>
