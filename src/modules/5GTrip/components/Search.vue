<template>
  <div class="component_search">
    <div class="input_row">
      <input type="text" placeholder="请输入景点关键词" v-model.trim=" searchKey ">
      <div class="button" @click=" search ">搜索</div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        searchKey: '',
      }
    },

    methods: {

      search() {
        const searchKey = this.searchKey
        if (!searchKey) return
        this.report('SS_' + searchKey)
        this.$router.push(`/5GTravel/search/${searchKey}`)
      },

    },

  }
</script>

<style scoped lang="scss">
  .component_search {
    .input_row {
      display: flex; align-items: center; padding: 20px 30px; margin: 20px 0; background-color: #fff;
      input {
        flex: 1; width: 0; height: 60px; margin-right: 30px; padding-left: 20px; border: 1PX solid #ccc;
        background-color: #f5f5f5; border-radius: 7px; font-size: 30px; color: #222;
      }
      .button {
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        width: 210px; height: 60px; font-size: 30px; color: #fff; background-color: #018fe6;
        border-radius: 7px;
        &:active { opacity: 0.9 }
      }
    }
  }
</style>
