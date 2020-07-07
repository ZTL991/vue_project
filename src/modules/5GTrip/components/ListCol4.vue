<template>
  <div class="component_list_col_4">
    <ListTitle :title=" title " :icon=" listTitleIcon " :listTitleFunc=" listTitleFunc " :listTitleText=" listTitleText "/>
    <ul class="list">
      <li v-for=" item in list " :key=" item.picUrl " @click=" jump(item) ">
        <div class="shade"></div>
        <div class="bg"><img v-lazy=" item.picUrl " alt=""></div>
        <div class="content">
          <div class="name">{{ item.picName }}</div>
          <div class="tip" v-if=" item.dataFlag === '1' ">敬请期待</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListTitle from './ListTitle'

  export default {

    props: {
      title: String,
      list: Array,
      listTitleFunc: Function,
      tabType: String,
      listTitleText: String,
    },

    components: { ListTitle },

    data() {
      return {
        listTitleIcon: require('../static/images/list_title_icon_1.png')
      }
    },

    methods: {

      jump(item) {
        if (item.dataFlag === '1') return
        this.report('FLDJ_' + item.picName)
        this.$router.push({ path: '/5GTravel/detail', query: { tabType: this.tabType, classifyId: item.classifyId, inlandFlag: item.inlandFlag, themeId: item.themeId } })
      },

    }

  }
</script>

<style scoped lang="scss">
  .component_list_col_4 {
    padding: 0 30px; background-color: #fff;
    .list {
      overflow: hidden;
      li {
        position: relative; float: left; width: 150px; height: 150px; margin-bottom: 30px; overflow: hidden;
        border-radius: 10px;
        .shade {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2;
          background-color: rgba(0,0,0, .3);
        }
        .bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;
          img { display: block; width: 100%; height: 100% }
        }
        .content {
          position: absolute; bottom: 10px; left: 0; right: 0; z-index: 3; text-align: center;
          .name {
            white-space: nowrap; font-size: 34px; color: #fff;
          }
          .tip { font-size: 24px; color: #fff }
        }
        &:not(:nth-child(4n)) { margin-right: 30px }
      }
    }
  }
</style>
