<!-- eslint-disable no-unused-expressions -->
<template>
  <div class="wrapper-div">
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
        userID: null
      };
    },
    components: {
      MatButton,
      MatList
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
    }
  };
</script>

<style lang="scss" scoped>
  .add-btn {
    // margin: 3rem 0 0 25%;
    font-size: 0.875rem;
  }

  .add-btn:hover,
  .add-btn:focus {
    background-color: rgb(59, 0, 91);
  }
  .add-btn-div {
    margin: 3rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .user-list {
    margin: 0 auto;
    padding: 2rem;
    width: 50rem;
  }
</style>
