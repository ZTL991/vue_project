<template>
  <PullUpList @loadList=" loadList " :isLoading=" isLoading " :isEnd=" pushList.length > 0 && isLoadComplete " ref="pullUpList" scrollSaveKey="ThemeTabScroll">
    <div class="page_home">
      <div class="page_content">
        <div class="banner">
          <img src="../static/images/home-banner.jpg" alt="">
        </div>
        <HomeTab/>
        <ListCol3 tabType="2" :list=" topicList " :isShowListTitle=" false "/>
        <Search/>
        <ListCol1 :list=" pushList "/>
      </div>
    </div>
  </PullUpList>
</template>

<script>
  import PullUpList from '../components/PullUpList'
  import HomeTab from '../components/HomeTab'
  import Search from '../components/Search'
  import ListCol3 from '../components/ListCol3'
  import ListCol1 from '../components/ListCol1'
  import { Fetch } from '../util/util'

  export default {

    name: 'ThemeTab',

    components: { PullUpList, HomeTab, Search, ListCol3, ListCol1 },

    data() {
      return {
        name: '',
        tabIndex: 0,
        searchKey: '',

        topicList: [],

        page: 1,
        pageSize: 20,
        pushList: [],
        isLoading: false, // 正在加载数据
        isLoadComplete: false, // 所有数据加载结束
      }
    },

    mounted() {
      this.getTab2Data()
      this.loadList()
    },

    activated() {
      const scrollTop = parseInt(window.sessionStorage.getItem('ThemeTabScroll'))
      if (scrollTop) this.$refs.pullUpList.$el.scrollTop = scrollTop
    },

    methods: {

      async getTab2Data() {
        const res = await Fetch({ url: '5GTravelPageSort', data: { tabType: 2 } })
        if (res.code !== '0') return
        this.topicList = res.topicList
      },

      async loadList() {
        if (this.isLoading || this.isLoadComplete) return
        this.isLoading = true
        const res = await Fetch({ url: '5GTravelSearch', data: { tabType: 2, page: this.page, pageSize: this.pageSize } })
        if (res.code !== '0') return
        this.isLoading = false
        this.pushList = [ ...this.pushList, ...res.list ]
        if ((this.page + 1) > res.maxPage) this.isLoadComplete = true
        this.page = this.page + 1
      },

    },

  }
</script>

<style scoped lang="scss">
  .page_home {
    .banner {
      width: 100%; height: 338px;
      img { display: block; width: 100%; height: 100% }
    }
  }
</style>
