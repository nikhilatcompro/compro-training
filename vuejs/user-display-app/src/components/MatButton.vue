<template>
  <button class="mdc-button mdc-button--raised" @click="onClick">
    <span class="mdc-button__label">{{ text }}</span>
  </button>
</template>

<script>
  import { MDCRipple } from '@material/ripple';
  export default {
    name: 'MatButton',
    props: {
      text: String
    },
    methods: {
      onClick () {
        this.$emit('click');
      }
    },
    mounted () {
      // eslint-disable-next-line no-new
      new MDCRipple(this.$el);
    }
  };
</script>

<style lang="scss" scoped>

</style>
