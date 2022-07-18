<template>
  <li class="mdc-list-item list-item">
    <span class="material-icons" aria-hidden="true">
      {{ personIcon }}
    </span>
    <span class="mdc-list-item__ripple"></span>
    <span class="mdc-list-item__text">{{ user.name }}</span>
    <span
      @click="onShowMoreClick"
      class="material-icons"
      aria-hidden="true"
    >
      {{ moreIcon }}
    </span>
    <MatMenu :userID="user._id" :showMoreClicked="showMoreClicked"></MatMenu>
  </li>
</template>

<script>
import MatMenu from './MatMenu.vue';
  export default {
    name: 'MatListItem',
    data () {
      return {
        showMoreClicked: false
      };
    },
    components: {
      MatMenu
    },
    props: {
      user: Object,
      personIcon: String,
      moreIcon: String
    },
    methods: {
      onShowMoreClick () {
          this.showMoreClicked = !this.showMoreClicked;
      }
    }
};
</script>

<style scoped>
  .list-item {
    overflow: inherit;
    padding: .375rem 0 .375rem 0;
    position: relative;
  }
</style>
