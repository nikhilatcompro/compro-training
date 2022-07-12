<template>
  <div>
    <div class="main-div">
      <p>Name: {{ user.name }}</p>
      <p>email: {{ user.email }}</p>
      <!-- eslint-disable-next-line vue/no-deprecated-filter -->
      <p>D.O.B: {{ user.dob | dashed-dob }}</p>
      <button class="back-btn" @click="onBackClick">X</button>
    </div>
    <div class="button-div">
      <button class="action-btn" @click="onEditClick(user)">Edit</button>
      <button class="action-btn  delete-btn" @click="onDeleteClick(user.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
  import EventBus from '../event-bus';
  export default {
    name: 'ShowUser',
    data () {
      return {
        user: null
      };
    },
    methods: {
      /**
       * A user
       * @typedef {Object} user
       * @property {number} id - user id
       * @property {string} name - user name
       * @property {string} email - user email
       * @property {string} dob - user date of birth
       */
      /**
       * gets triggered when Delete button
       * is clicked. Emits an event List.vue
       * component with a payload 'id'.
       * @param {number} id - user id
       */
      onDeleteClick (id) {
        this.$store.commit('deleteUser', id);
        this.$router.push('/users');
      },
      /**
       * A method that gets triggered when Edit button
       * is clicked. Emits an event to Form.vue
       * component with payload 'user'.
       * @param {user} user - user object
       */
      onEditClick (user) {
        EventBus.$emit('edit-user');
        this.$router.push(`/users/${user.id}/edit`);
      },
      /**
       * A method that gets triggered when Back button
       * is clicked. Emits an event to
       * List.vue which removes the ShowUser
       * component from DOM.
       */
      onBackClick () {
        this.$router.push('/users');
      }
    },
    created () {
      this.user = this.$store.state.users[this.$route.params.id - 1];
    }
  };
</script>

<style scoped>
  .main-div {
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: space-around;
    margin: 2rem 0 0 35rem;
    padding: 4rem;
    position: relative;
    text-align: center;
    width: 15rem;
  }
  .back-btn {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
  .button-div {
    margin: 0 0 0 35rem;
  }
</style>
