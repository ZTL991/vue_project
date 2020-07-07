<template>
  <div class="page_detail">
    <div class="head">
      <div class="bg"><img :src=" picUrl " alt=""></div>
      <div class="shade"></div>
      <div class="name">{{ name }}</div>
      <div class="go_back" @click=" goBack ">返回</div>
    </div>
    <div class="introduce">
      <div class="title">主要热门景点</div>
      <div class="tag">
        <div class="item" v-for=" item in scenicSpotList " :key=" item ">{{ item }}</div>
      </div>
    </div>
    <ListCol1 :list=" list "/>
  </div>
</template>

<script>
  import ListCol1 from '../components/ListCol1'
  import { Fetch } from '../util/util'

  export default {

    components: {
      ListCol1
    },

    data() {
      return {
        query: {},
        scenicSpotList: [],
        list: [],
        name: '',
        picUrl: '',
      }
    },

    mounted() {
      this.query = this.$route.query
      this.getDetailData()
    },

    methods: {

      async getDetailData() {
        const { classifyId, inlandFlag, tabType, themeId } = this.$route.query
        const res = await Fetch({ url: '5GTravelPageDetail', data: { tabType, classifyId, inlandFlag, themeId } })
        if (res.code !== '0') return
        this.scenicSpotList = [ ...res.scenicSpotList, '……' ]
        this.list = res.value
        this.name = res.picName
        this.picUrl = res.picUrl
      },

      goBack() {
        this.$router.go(-1)
      },

    },

  }
</script>

<style scoped lang="scss">
  .page_detail {
    min-height: 100%; background-color: #f5f5f5;
    .head {
      position: relative; width: 100%; height: 227px;
      .bg {
        position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1; filter: blur(2px);
        img { display: block; width: 100%; height: 100%; object-fit: cover }
      }
      .shade { position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 2; background-color: rgba(0,0,0, .3) }
      .name {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3;
        font-size: 48px; color: #fff; font-weight: bold;
      }
      .go_back {
        position: absolute; top: 20px; left: 30px; z-index: 4; height: 50px;
        border: 2px solid #fff; border-radius: 7px; font-size: 26px; color: #fff;
        display: flex; align-items: center; justify-content: center; padding: 0 20px;
      }
    }
    .introduce {
      padding: 20px 30px; margin-bottom: 30px; background-color: #fff;
      .title { font-size: 30px; color: #222; font-weight: bold }
      .tag {
        display: flex; flex-wrap: wrap; margin-top: 26px;
        .item { height: 34px; line-height: 34px; padding: 0 10px; margin: 0 10px 10px 0; font-size: 24px; color: #808080; background-color: #ececec }
      }
    }
  }
</style>
