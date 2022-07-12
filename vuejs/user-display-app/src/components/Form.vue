<template>
  <div>
    <form id="user-form">
      <label>Name</label>
      <input type="text" v-model="currentUser.name" required/>
      <label>Email</label>
      <input type="email" v-model="currentUser.email" required/>
      <label>D.O.B</label>
      <input type="text" placeholder="DD/MM/YYYY"
        v-model="currentUser.dob" @keypress="validateDob" required/>
      <p v-if="dobError">Invalid date</p>
      <button v-if="editingUser" type="submit" @click="onUpdateClick()"
        :disabled="disableUpdate()">Update</button>
      <button v-else type="submit" @click="onSubmitClick()"
        :disabled="disableAdd()">Submit</button>
      <button @click="onBackClick">Cancel</button>
    </form>
  </div>
</template>

<script>
  import EventBus from '../event-bus';
  export default {
    name: 'userForm',
    data () {
      return {
        dob: '',
        dobError: false,
        editingUser: false,
        email: '',
        id: 0,
        name: '',
        currentUser: {
          id: null,
          name: '',
          email: '',
          dob: ''
          }
      };
    },
    methods: {
      /**
       * Utility method that validates the date of birth and
       * sets the dobError data property as true or false
       */
      validateDob () {
        const [day, month, year] = this.currentUser.dob.split('/').map(item => parseInt(item));
        console.log(day, month, year);
        if (this.currentUser.dob.length < 10 ||
        day < 0 || day > 31 || month < 0 || month > 12 || year < 1900 || year > 2022) {
          this.dobError = true;
        } else {
          this.dobError = false;
        }
      },
      disableAdd () {
        return (
        this.currentUser.name === '' ||
        this.currentUser.email === '' ||
        this.currentUser.dob === '' ||
        this.currentUser.name.length > 120 ||
        !this.currentUser.email.includes('@') ||
        this.dobError);
      },
      disableUpdate () {
        return (
          (this.disableAdd()) ||
          (this.currentUser.name === this.user.name &&
          this.currentUser.email === this.user.email &&
          this.currentUser.dob === this.user.dob)
        );
      },
      /**
       * A method that gets triggered when the
       * Cancel button is clicked on app.
       * Emits an event to parent on click.
       */
      onBackClick () {
        this.$router.push('/users');
      },
      /**
       * A method that gets triggered when
       * the user-form is submitted. It creates
       * a new entry and sends it to the list
       * component with the help of event bus.
       */
      onSubmitClick () {
        console.log('inside submit click');
        const newEntry = {
          id: 0,
          name: this.currentUser.name,
          email: this.currentUser.email,
          dob: this.currentUser.dob
        };
        this.$store.commit('addUser', newEntry);
        this.$router.push('/');
      },
      /**
       * A method that gets triggered when the update button
       * on user-form in clicked. Sends the edited
       * values to the List.vue component and
       * changes the update button to submit button.
       */
      onUpdateClick () {
        console.log('inside update click');
        this.editingUser = false;
        const editedValues = {
          id: this.currentUser.id,
          name: this.currentUser.name,
          email: this.currentUser.email,
          dob: this.currentUser.dob
        };
        this.$store.commit('updateUser', editedValues);
        this.$router.push('/users');
      }
    },
    created () {
      if (this.$route.name === 'edit') {
      this.user = this.$store.state.users[this.$route.params.id - 1];
      this.editingUser = true;
      this.currentUser.id = this.user.id;
      this.currentUser.name = this.user.name;
      this.currentUser.email = this.user.email;
      this.currentUser.dob = this.user.dob;
      } else {
        this.editingUser = false;
      }
    },
    mounted () {
      EventBus.$on('edit-user', () => {
        console.log('inside edit-user event');
        this.editingUser = true;
      });
      EventBus.$on('add-user', () => {
        this.editingUser = false;
      });
    }
  };
</script>

<style scoped>
  button {
    margin: 2rem 0 0 0;
  }

  form {
    background: white;
    border-radius: 0.625rem;
    margin: 1.875rem auto;
    max-width: 26.25rem;
    padding: 2.5rem;
    text-align: left;
  }

  input {
    border: none;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    color: #555;
    display: block;
    padding: 0.625rem 0.375rem;
    width: 100%;
  }

  label {
    color: rgb(116, 114, 114);
    display: inline-block;
    font-size: 0.6rem;
    font-weight: bold;
    letter-spacing: 0.063rem;
    margin: 1.563rem 0 0.938rem;
    text-transform: uppercase;
  }
</style>
