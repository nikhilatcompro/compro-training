<template>
  <div>
    <div class="main-div">
      <p>Name: {{ user.name }}</p>
      <p>email: {{ user.email }}</p>
      <!-- eslint-disable-next-line vue/no-deprecated-filter -->
      <p>D.O.B: {{ user.dob | dashed-dob }}</p>
      <MatButton text="X" class="back-btn" @click="onBackClick">X</matButton>
    </div>
    <div class="button-div">
      <MatButton text="Edit" class="action-btn" @click="onEditClick(user)">Edit</MatButton>
      <MatButton text="Delete" class="action-btn  delete-btn" @click="onDeleteClick(user.id)">
        Delete
      </MatButton>
    </div>
  </div>
</template>

<script>
  import MatButton from './MatButton.vue';
  export default {
    name: 'ShowUser',
    data () {
      return {
        user: null
      };
    },
    components: {
      MatButton
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
    box-shadow: .2rem .2rem .5rem lightgray;
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
  .action-btn {
    border: none;
    margin: 1rem .5rem;
  }
  .action-btn:hover {
    background-color: rgb(39, 171, 127);
  }
  .back-btn {
    position: absolute;
    right: 2rem;
    top: 2rem;
  }
  .delete-btn:hover {
    background-color: rgb(235, 36, 92);
  }
  .button-div {
    margin: 0 0 0 35rem;
  }
</style>
