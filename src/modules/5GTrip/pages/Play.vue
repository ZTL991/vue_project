<template>
  <div class="page_play">
    <iframe :src=" url " frameborder="0"></iframe>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        url: ''
      }
    },

    mounted() {
      const { url } = this.$route.params
      this.url = url
    }

  }
</script>

<style scoped lang="scss">
  .page_play {
    height: 100%;
    iframe { width: 100%; height: 100% }
  }
</style>
