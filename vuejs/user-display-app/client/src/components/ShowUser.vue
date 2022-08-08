<template>
  <div class="main-wrapper">
    <div class="main-div">
      <div class="name-div">
        <label class="field">Name: </label>
        <label class="value">{{ user.name }}</label>
      </div>
      <div class="email-div">
        <label class="field">Email: </label>
        <label class="value">{{ user.email }}</label>
      </div>
      <div class="dob-div">
        <label class="field">Date of birth: </label>
        <label class="value">{{ user.dateOfBirth }}</label>
      </div>
      <!-- eslint-disable-next-line vue/no-deprecated-filter -->
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
  import UserService from '../UserService';
  import MatButton from './MatButton.vue';
  export default {
    name: 'ShowUser',
    data () {
      return {
        user: {}
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
      async onDeleteClick (id) {
        const answer = prompt('press Y if you are sure you want to delete the record.');
        if (answer === 'Y' || answer === 'y') {
          try {
            await UserService.deleteUser(id);
          } catch (error) {
            console.log(error);
          }
        }
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
    async created () {
      try {
        this.user = await UserService.getUser(this.$route.params.id);
      } catch (error) {
        console.log(error);
      }
    }
  };
</script>

<style scoped>
  .main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .main-div {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: .2rem .2rem .5rem lightgray;
    display: flex;
    flex-direction: column;
    height: 20rem;
    justify-content: space-around;
    padding: 4rem;
    position: relative;
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
    right: 1.5rem;
    top: 1.5rem;
  }
  .delete-btn:hover {
    background-color: rgb(235, 36, 92);
  }
  .field {
    color: rgb(116, 114, 114);
    display: inline-block;
    font-size: 0.6rem;
    font-weight: bold;
    letter-spacing: 0.063rem;
    margin: 1.563rem 0 0.938rem;
    text-transform: uppercase;
  }
  .value {
    display: block;
  }

</style>
