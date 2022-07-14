import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [{ id: 1, name: 'sarthak', email: 'sarthak@ymail.com', dob: '24/08/1996' },
      { id: 2, name: 'raman', email: 'raman@gmail.com', dob: '04/01/1978' },
      { id: 3, name: 'vritti', email: 'vritti45@gmail.com', dob: '19/09/1966' }]
  },
  mutations: {
    /**
     * A mutation method that takes
     * newEntry as a payload and adds it
     * to users list.
     * @param {Object} state-centralised state
     * @param {user} newEntry-new user
     */
    addUser: (state, newEntry) => {
      newEntry.id = state.users.length + 1;
      state.users.push(newEntry);
    },
    /**
     * A mutation method that takes id
     * as a payload and deletes the user
     * of that particular id from the user
     * list.
     * @param {Object} state-centralised state
     * @param {number} id-user id
     */
    deleteUser: (state, id) => {
      const answer = prompt('press Y if you are sure you want to delete the record.');
      if (answer === 'Y' || answer === 'y') {
        state.users = state.users.filter(ele => ele.id !== id);
      }
    },
    /**
     * A mutation method that taked editedValues
     * as a payload and updates the user with
     * the matching id.
     * @param {Object} state-centralised state
     * @param {user} editedValues-edited user
     */
    updateUser: (state, editedValues) => {
      const index = editedValues.id - 1;
      state.users[index].name = editedValues.name;
      state.users[index].email = editedValues.email;
      state.users[index].dob = editedValues.dob;
    }
  }
});
