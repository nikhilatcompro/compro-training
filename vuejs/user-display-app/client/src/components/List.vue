<!-- eslint-disable no-unused-expressions -->
<template>
  <div class="wrapper-div">
    <h1 class="page-title"> Users </h1>
    <p v-if="err">{{ err }}</p>
    <MatList
      class="user-list"
      :users="users"
      personIcon="person"
      moreIcon="more_vert"
      @clicked-more="onShowMoreClick">
    </MatList>
    <div class="add-btn-div">
      <MatButton
        text="Add User"
        @click="onAddUserClick"
        class="add-btn"
        >Add User
      </MatButton>
    </div>
  </div>
</template>

<script>
  import MatButton from './MatButton.vue';
  import MatList from './MatList.vue';
  import UserService from '../UserService';
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
        err: '',
        users: [],
        userID: null
      };
    },
    components: {
      MatButton,
      MatList
    },
    methods: {
      /**
       * A method that gets triggered when show-
       * more link is clicked. It sets the
       * user data property and toggles
       * the value of showMore variable.
       * @param {user} user - the user for which we clicked the button.
       */
      onShowMoreClick (userID) {
        this.userID = userID;
      },
      /**
       * A method that gets triggered when
       * Add User button is clicked. It
       * emits an event to the Form.vue and
       * App.vue component.
       */
      onAddUserClick () {
        this.$router.push('/users/new');
      }
    },
    watch: {
      users (newValue) {
        return newValue;
      }
    },
    async created () {
      try {
        this.users = await UserService.getUsers();
      } catch (err) {
        this.err = err.message;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .add-btn {
    font-size: 0.875rem;
  }
  .add-btn-div {
    margin: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .wrapper-div {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    margin: 0 auto;
    width: 40rem;
  }
  .page-title {
    background-color: #54c77a;
    font-family: 'Roboto', sans-serif;
    padding: 2rem 2rem 2rem 3rem;
    text-align: center;
  }
  .user-list {
    padding: 2rem;
  }
</style>
