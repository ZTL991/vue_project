<template>
  <div class="component_list_col_3" :class="{ margin_top: mtFlag, padding_top: !isShowListTitle }">
    <ListTitle :title=" title " :icon=" listTitleIcon " :isShowListTitle=" isShowListTitle "/>
    <ul class="list">
      <li v-for=" item in list " :key=" item.picUrl " @click=" touchHandle(item) ">
        <router-link :to="{ path: '/5GTravel/detail', query: { tabType, classifyId: item.classifyId, inlandFlag: item.inlandFlag, themeId: item.themeId } }">
          <div class="shade"></div>
          <div class="bg"><img v-lazy=" item.picUrl " alt=""></div>
          <div class="name">{{ item.picName }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListTitle from './ListTitle'

  export default {

    props: {
      mtFlag: Boolean, // 是否有marginTop
      title: String,
      list: Array,
      isShowListTitle: {
        type: Boolean,
        default: true,
      },
      tabType: String,
    },

    components: { ListTitle },

    data() {
      return {
        listTitleIcon: require('../static/images/list_title_icon_2.png')
      }
    },

    methods: {

      touchHandle(data) {
        this.report('FLDJ_' + data.picName)
      },

    },

  }
</script>

<style scoped lang="scss">
  .component_list_col_3 {
    padding: 0 30px; background-color: #fff;
    .list {
      overflow: hidden;
      li {
        position: relative; float: left; width: 210px; height: 150px; margin-bottom: 30px; overflow: hidden;
        border-radius: 10px;
        .shade {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2;
          background-color: rgba(0,0,0, .3);
        }
        .bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;
          img { display: block; width: 100%; height: 100% }
        }
        .name {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); z-index: 3;
          font-size: 34px; color: #fff; white-space: nowrap;
        }
        &:not(:nth-child(3n)) { margin-right: 30px }
      }
    }
    &.margin_top { margin-top: 20px }
    &.padding_top { padding-top: 30px }
  }
</style>
