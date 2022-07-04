<template>
  <div>
    <form id="user-form" @submit.prevent="onSubmitClick">
      <label>Name</label>
      <input type="text" v-model="name" required/>
      <label>Email</label>
      <input type="email" v-model="email" required/>
      <label>D.O.B</label>
      <input type="text" placeholder="DD/MM/YYYY" v-model="dob" @keypress="validateDob" required/>
      <p v-if="dobError">Invalid date</p>
      <button v-if="editingUser" @click="onUpdateClick">Update</button>
      <button v-if="!editingUser" :disabled="dobError">Submit</button>
      <button @click="onBackClick">Cancel</button>
    </form>
  </div>
</template>

<script>
  import EventBus from '../event-bus.js';
  export default {
    name: 'user-form',
    data () {
      return {
        /**
         * date of birth
         * @type {string}
         */
        dob: '',
        /**
         * variable to conditionally
         * display invalid date
         * @type {boolean}
         */
        dobError: false,
        /**
         * variable to conditionally
         * switch between Update and Submit
         * button
         * @type {boolean}
         */
        editingUser: false,
        /**
         * user email
         * @type {string}
         */
        email: '',
        /**
         * user id
         * @type {number}
         */
        id: 0,
        /**
         * user name
         * @type {string}
         */
        name: ''
      };
    },
    methods: {
      /**
       * utility method that validates the date of birth and
       * sets the dobError data property as true or false
       * @param {void}
       * @returns {void}
       */
      validateDob () {
        const [day, month, year] = this.dob.split('/').map(item => parseInt(item));
        console.log(day, month, year);
        if (day < 0 || day > 31 || month < 0 || month > 12 || year < 1900 || year > 2022) {
          this.dobError = true;
        } else {
          this.dobError = false;
        }
      },
      /**
       * A method that gets triggered when the
       * Cancel button is clicked on app.
       * Emits an event to parent on click.
       * @param {void}
       * @returns {void}
       */
      onBackClick () {
        this.$emit('back-click'); // event back-click is also used in ShowUser.vue
      },
      /**
       * a method that gets triggered when
       * the user-form is submitted. It creates
       * a new entry and sends it to the list
       * component with the help of event bus.
       * @param {void}
       * @returns {void}
       */
      onSubmitClick () {
        const newEntry = {
          id: 0,
          name: this.name,
          email: this.email,
          dob: this.dob
        };
        EventBus.$emit('user-generated', newEntry);
      },
      /**
       * gets triggered when the update button
       * on user-form in clicked. Sends the edited
       * values to the List.vue component and
       * changes the update button to submit button.
       * @param {void}
       * @returns {void}
       */
      onUpdateClick () {
        const editedValues = {
          id: this.id,
          name: this.name,
          email: this.email,
          dob: this.dob
        };
        EventBus.$emit('values-edited', editedValues);
        this.editingUser = false;
      }
    },
    mounted () {
      EventBus.$on('edit-user', user => {
        this.editingUser = true;
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.dob = user.dob;
        this.$emit('edit-form');
      });

      EventBus.$on('clicked-add', () => {
        this.name = '';
        this.email = '';
        this.dob = '';
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
