<template>
  <div class="component_pull_up_list" ref="scrollBox">
    <div class="component_content" ref="contentBox">
      <slot></slot>
      <div class="tip" v-show=" isLoading ">正在加载更多景点...</div>
      <div class="tip" v-show=" isEnd ">没有更多了</div>
    </div>
  </div>
</template>

<script>
  export default {

    props: {
      isLoading: Boolean,
      isEnd: Boolean,
      scrollSaveKey: String,
    },

    mounted() {
      this.listenScroll()
    },

    methods: {

      listenScroll() {
        this.$refs.scrollBox.onscroll = () => {
          this.throttleHandle()
        }
      },

      throttleHandle() {
        if (this.throttleTimer) return
        if (this.scrollSaveKey) window.sessionStorage.setItem(this.scrollSaveKey, this.$refs.scrollBox.scrollTop)
        this.scrollHandle()
        this.throttleTimer = setTimeout(() => {
          this.throttleTimer = null
          this.scrollHandle()
          if (this.scrollSaveKey) window.sessionStorage.setItem(this.scrollSaveKey, this.$refs.scrollBox.scrollTop)
        }, 300)
      },

      scrollHandle() {
        if (this.isLoadComplete) return
        try {
          const scrollTop = this.$refs.scrollBox.scrollTop
          const scrollBoxHeight = this.$refs.scrollBox.offsetHeight
          const offsetHeight = this.$refs.contentBox.offsetHeight
          const scrollTopHeight = scrollTop + scrollBoxHeight
          if (offsetHeight - scrollTopHeight < 150) this.$emit('loadList')
        } catch (e) {}
      },

    },

  }
</script>

<style scoped lang="scss">
  .component_pull_up_list {
    height: 100%; background-color: #f5f5f5; overflow-y: scroll;
    .tip { padding: 0 0 30px 0; font-size: 24px; color: #666; text-align: center }
  }
</style>
