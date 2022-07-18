<template>
  <div>
    <ul class="mdc-list">
      <div v-for="user in users" :key="user.id">
        <MatListItem
          :user="user"
          personIcon="person"
          moreIcon="more_vert"
          @clicked-more="onShowMoreClick">
        </MatListItem>
        <li role="separator" class="mdc-list-divider"></li>
      </div>
    </ul>
  </div>
</template>

<script>
  import { MDCList } from '@material/list';
  import { MDCRipple } from '@material/ripple';
  import MatListItem from './MatListItem.vue';
  export default {
    name: 'MatList',
    props: {
      users: Array
    },
    components: {
      MatListItem
    },
    methods: {
      onShowMoreClick (userID) {
        this.$emit('clicked-more', userID);
      }
    },
    mounted () {
      // eslint-disable-next-line no-new
      const list = new MDCList(this.$el);
      list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
    }
  };
</script>

<style lang="scss" scoped>
  @use "@material/list";
  .mdc-list-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
