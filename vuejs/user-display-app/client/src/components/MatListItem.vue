<template>
  <li class="mdc-list-item list-item">
    <!-- <span class="material-icons" aria-hidden="true">
      {{ personIcon }}
    </span> -->
    <span class="img-text-wrapper">
      <span class="img-span">
        <img class="user-profile" src="../../assets/Smiling-Man.jpg" alt="">
      </span>
  <!-- <span class="mdc-list-item__ripple"></span> -->
      <span @click="onShowMoreClick" class="mdc-list-item__text user-name">{{ user.name }}</span>
    </span>
    <span
      @click="onShowMoreClick"
      class="material-icons"
      aria-hidden="true"
    >
      {{ moreIcon }}
    </span>
    <MatMenu :userID="user.id" :showMoreClicked="showMoreClicked"></MatMenu>
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
    border-radius: .5rem;
  }
  .img-text-wrapper {
    height: 2rem;
    width: 15rem;
    display: flex;
  }
  .img-span {
    height: 2rem;
    width: 2rem;
  }
  .user-name {
    margin-left: 4rem;
  }
  .user-profile {
    border-radius: 100%;
    max-height: 100%;
    max-width: 100%;
  }
</style>
