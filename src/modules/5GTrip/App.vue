<template>
  <keep-alive include="LocationTab,ThemeTab,searchPage">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {

    mounted() {
      this.report('ZY')
    },

  }
</script>

<style lang="scss">
  html, body { height: 100% }
  * { box-sizing: border-box; -webkit-overflow-scrolling: touch }
  body, p, h1, h2, h3, ul, li { padding: 0; margin: 0; list-style: none }
  a { text-decoration: none }
  input { outline: none }

  body { line-height: 1.4; font-size: 24px }
</style>
