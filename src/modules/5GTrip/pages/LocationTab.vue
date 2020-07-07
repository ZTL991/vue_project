<template>
  <PullUpList @loadList=" loadList " :isLoading=" isLoading " :isEnd=" pushList.length > 0 && isLoadComplete " ref="pullUpList" scrollSaveKey="LocationTabScroll">
    <div class="page_home">
      <div class="banner">
        <img src="../static/images/home-banner.jpg" alt="">
      </div>
      <HomeTab/>
      <ListCol4
        tabType="1"
        :list=" inlandListState === 0 ? inlandList : inlandListData "
        title="国内热门景点(900+)"
        :listTitleFunc=" toggleShowCity "
        :listTitleText=" inlandListState === 0 ? '全部' : '收起' "
      />
      <ListCol3 tabType="1" :list=" outlandList " :mtFlag=" true " title="世界热门景点(100+)"/>
      <Search/>
      <ListCol1 :list=" pushList "/>
    </div>
  </PullUpList>
</template>

<script>
  import PullUpList from '../components/PullUpList'
  import HomeTab from '../components/HomeTab'
  import Search from '../components/Search'
  import ListCol4 from '../components/ListCol4'
  import ListCol3 from '../components/ListCol3'
  import ListCol1 from '../components/ListCol1'
  import { Fetch } from '../util/util'

  export default {

    name: 'LocationTab',

    components: { PullUpList, HomeTab, Search, ListCol4, ListCol3, ListCol1 },

    data() {
      return {
        name: '',
        tabIndex: 0,
        searchKey: '',

        inlandListData: [],
        inlandList: [],
        inlandListState: 0, // 0-收起状态 1-展开状态
        outlandList: [],
        topicList: [],

        page: 1,
        pageSize: 20,
        pushList: [],
        isLoading: false, // 正在加载数据
        isLoadComplete: false, // 所有数据加载结束
      }
    },

    mounted() {
      this.getTab1Data()
      this.loadList()
    },

    activated() {
      const scrollTop = parseInt(window.sessionStorage.getItem('LocationTabScroll'))
      if (scrollTop) this.$refs.pullUpList.$el.scrollTop = scrollTop
    },

    methods: {

      async getTab1Data() {
        const res = await Fetch({ url: '5GTravelPageSort', data: { tabType: 1 } })
        if (res.code !== '0') return
        this.inlandListData = res.inlandList
        this.inlandList = res.inlandList.slice(0, 8)
        this.outlandList = res.outlandList
      },

      toggleShowCity() {
        this.inlandListState = this.inlandListState === 0 ? 1 : 0
      },

      async loadList() {
        if (this.isLoading || this.isLoadComplete) return
        this.isLoading = true
        const res = await Fetch({ url: '5GTravelSearch', data: { tabType: 1, page: this.page, pageSize: this.pageSize } })
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
