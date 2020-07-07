<template>
  <div class="page_home" ref="scrollBox">
    <div class="page_content" ref="contentBox">
      <div class="banner">
        <img src="../static/images/home-banner.jpg" alt="">
      </div>
      <HomeTab @changeTab=" changeTab " :tabIndex=" tabIndex "/>
      <template v-if=" tabIndex === 0 ">
        <ListCol4
          tabType="1"
          :list=" inlandListState === 0 ? inlandList : inlandListData "
          title="国内热门景点(900+)"
          :listTitleFunc=" toggleShowCity "
          :listTitleText=" inlandListState === 0 ? '全部' : '收起' "
        />
        <ListCol3 tabType="1" :list=" outlandList " :mtFlag=" true " title="世界热门景点(100+)"/>
      </template>
      <template v-else>
        <ListCol3 tabType="2" :list=" topicList " :isShowListTitle=" false "/>
      </template>
      <div class="input_row">
        <input type="text" placeholder="请输入景点关键词" v-model.trim=" searchKey ">
        <div class="button" @click=" search ">搜索</div>
      </div>
      <ListCol1 :list=" pushList "/>
      <div class="tip" v-show=" isLoading ">正在加载更多景点...</div>
      <div class="tip" v-show=" pushList.length && isLoadComplete ">没有更多了</div>
    </div>
  </div>
</template>

<script>
  import HomeTab from '../components/HomeTab'
  import ListCol4 from '../components/ListCol4'
  import ListCol3 from '../components/ListCol3'
  import ListCol1 from '../components/ListCol1'
  import { Fetch } from '../util/util'

  export default {

    components: { HomeTab, ListCol4, ListCol3, ListCol1 },

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
      this.getTab2Data()
      this.loadList()
      this.listenScroll()
    },

    methods: {

      async getTab1Data() {
        const res = await Fetch({ url: '5GTravelPageSort', data: { tabType: 1 } })
        if (res.code !== '0') return
        this.inlandListData = res.inlandList
        this.inlandList = res.inlandList.slice(0, 8)
        this.outlandList = res.outlandList
      },

      async getTab2Data() {
        const res = await Fetch({ url: '5GTravelPageSort', data: { tabType: 2 } })
        if (res.code !== '0') return
        this.topicList = res.topicList
      },

      changeTab(index) {
        this.tabIndex = index
      },

      toggleShowCity() {
        this.inlandListState = this.inlandListState === 0 ? 1 : 0
      },

      search() {
        const searchKey = this.searchKey
        if (!searchKey) return
        this.$router.push(`/5GTravel/search/${searchKey}`)
      },

      listenScroll() {
        this.$refs.scrollBox.onscroll = () => {
          if (this.isLoadComplete) return
          this.throttleHandle()
        }
      },

      throttleHandle() {
        if (this.throttleTimer) return
        this.scrollHandle()
        this.throttleTimer = setTimeout(() => {
          this.throttleTimer = null
          this.scrollHandle()
        }, 300)
      },

      scrollHandle() {
        const scrollTop = this.$refs.scrollBox.scrollTop
        const scrollBoxHeight = this.$refs.scrollBox.offsetHeight
        const offsetHeight = this.$refs.contentBox.offsetHeight
        const scrollTopHeight = scrollTop + scrollBoxHeight
        if (offsetHeight - scrollTopHeight < 100) {
          this.loadList()
        }
      },

      async loadList() {
        if (this.isLoading || this.isLoadComplete) return
        this.isLoading = true
        const res = await Fetch({ url: '5GTravelSearch', data: { page: this.page, pageSize: this.pageSize } })
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
    height: 100%; background-color: #f5f5f5; overflow-y: scroll;
    .banner {
      width: 100%; height: 338px;
      img { display: block; width: 100%; height: 100% }
    }
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
    .tip { padding: 0 0 30px 0; font-size: 24px; color: #666; text-align: center }
  }
</style>
