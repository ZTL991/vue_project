<template>
  <PullUpList @loadList=" loadList " :isLoading=" isLoading " :isEnd=" list.length > 0 && isLoadComplete ">
    <div class="page_search">
      <div class="page_content">
        <div class="head">
          <div class="search_name_tip">包含<span>“{{ keyword }}”</span>的搜索结果</div>
          <div class="search_num_tip" v-show=" listCount !== '' ">共找到{{ listCount }}个景点</div>
        </div>
        <ListCol1 :list=" list "/>
      </div>
    </div>
  </PullUpList>
</template>

<script>
  import PullUpList from '../components/PullUpList'
  import ListCol1 from '../components/ListCol1'
  import { Fetch } from '../util/util'

  export default {

    components: { ListCol1, PullUpList },

    data() {
      return {
        keyword: '',
        page: 1,
        pageSize: 20,
        list: [],
        listCount: '',

        isLoading: false, // 正在加载数据
        isLoadComplete: false, // 所有数据加载结束
      }
    },

    mounted() {
      const { keyword } = this.$route.params
      this.keyword = keyword
      this.loadList()
    },

    methods: {

      async loadList() {
        if (this.isLoading || this.isLoadComplete) return
        this.isLoading = true
        const keyword = this.keyword
        const res = await Fetch({ url: '5GTravelSearch', data: { searchWord: keyword, page: this.page, pageSize: this.pageSize } })
        if (res.code !== '0') return
        this.isLoading = false
        this.listCount = res.count
        this.list = [ ...this.list, ...res.list ]
        if ((this.page + 1) > res.maxPage) this.isLoadComplete = true
        this.page = this.page + 1
      },

    }

  }
</script>

<style scoped lang="scss">
  .page_search {
    .head {
      margin-bottom: 30px; text-align: center;
      .search_name_tip {
        padding: 30px 0; font-size: 30px; color: #222; background-color: #fff;
        span { color: #018fe6 }
      }
      .search_num_tip { padding: 20px 0; font-size: 30px; color: #666 }
    }
  }
</style>
