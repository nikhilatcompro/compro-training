<template>
    <div class="mdc-menu mdc-menu-surface action-menu">
      <ul
        class="mdc-list"
        role="menu"
        aria-hidden="true"
        aria-orientation="vertical"
        tabindex="-1"
      >
        <li class="mdc-list-item" role="edit" @click="onEditClick">
          <span class="mdc-list-item__ripple"></span>
          <span class="material-icons" aria-hidden="true">edit</span>
          <span class="mdc-list-item__text">Edit</span>
        </li>
        <li role="separator" class="mdc-list-divider"></li>
        <li class="mdc-list-item" role="delete" @click="onDeleteClick">
          <span class="mdc-list-item__ripple"></span>
          <span class="material-icons" aria-hidden="true">delete</span>
          <span class="mdc-list-item__text">Delete</span>
        </li>
        <li role="separator" class="mdc-list-divider"></li>
        <li class="mdc-list-item" role="details" @click="onDetailsClick">
          <span class="mdc-list-item__ripple"></span>
          <span class="material-icons" aria-hidden="true">details</span>
          <span class="mdc-list-item__text">Details</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import { MDCMenu } from '@material/menu';
  export default {
    name: 'MatMenu',
    data () {
      return {
        menu: null
      };
    },
    props: {
      userID: Number,
      showMoreClicked: Boolean
    },
    methods: {
      onEditClick () {
        this.$router.push(`/users/${this.userID}/edit`);
      },
      onDeleteClick () {
        this.$store.commit('deleteUser', this.userId);
      },
      onDetailsClick () {
        this.$router.push(`/users/${this.userID}`);
      }
    },
    watch: {
      showMoreClicked (NewValue) {
        this.menu.open = NewValue;
      }
    },
    mounted () {
      this.menu = new MDCMenu(this.$el);
      this.menu.open = false;
    }
  };
</script>

<style lang="scss" scoped>
  .action-menu {
    transform-origin: top right;
    top: 0;
    right: 0;
    position: absolute;
  }
  .mdc-list-item__text{
    margin-left: 1rem;
  }
</style>
