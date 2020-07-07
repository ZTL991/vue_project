<template>
  <div class="component_list_title" v-if=" isShowListTitle ">
    <div class="left_box">
      <div class="icon"><img :src=" icon " alt=""></div>
      <div class="name">{{ title }}</div>
    </div>
    <div class="right_box" v-if=" listTitleFunc " @click=" listTitleFunc ">{{ listTitleText }}<span>></span></div>
  </div>
</template>

<script>
  export default {

    props: {
      title: String,
      icon: String,
      listTitleFunc: Function,
      listTitleText: String,
      isShowListTitle: {
        type: Boolean,
        default: true,
      },
    }

  }
</script>

<style scoped lang="scss">
  .component_list_title {
    display: flex; align-items: center; justify-content: space-between; height: 90px;
    .left_box, .right_box { display: flex; align-items: center }
    .left_box {
      .icon {
        width: 40px; height: 40px; margin-right: 15px;
        img { display: block; width: 100%; height: 100%; }
      }
      .name { font-size: 34px; color: #222 }
    }
    .right_box {
      position: relative; top: 3px; font-size: 30px; color: #222;
      span { margin-left: 3px }
    }
  }
</style>
