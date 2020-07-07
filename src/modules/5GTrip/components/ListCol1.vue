<template>
  <div class="component_list_col_1">
    <ul class="list">
      <li v-for=" item in list " :key=" item.thumbnailUrl || item.THUMBNAILURL " @click=" jump(item) ">
        <div class="bg">
          <img v-lazy=" item.thumbnailUrl || item.THUMBNAILURL " alt="">
        </div>
        <div class="name">
          <span>{{ item.scenicSpot || item.SCENICSPOT }}</span>
          <span>{{ renderAddr(item) }}</span>
        </div>
        <div class="play_icon"><img src="../static/images/play_icon.png" alt=""></div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {

    props: {
      list: Array,
    },

    methods: {

      jump(data) {
        const url = data.redirectUrl || data.REDIRECTVALUE
        const name = data.scenicSpot || data.SCENICSPOT
        this.report('PLAY_' + name)
        this.$router.push({ path: `/5GTravel/play/${encodeURIComponent(url)}` })
      },

      renderAddr(item) {
        try {
          let addrStr = ''
          if (item.provinceName !== '境外' && item.PROVINCENAME !== '境外') {
            addrStr += item.provinceName || item.PROVINCENAME
            addrStr += '|'
          }
          addrStr += item.cityName || item.CITYNMAE
          return addrStr
        } catch (e) {
          return ''
        }
      },

    }

  }
</script>

<style scoped lang="scss">
  .component_list_col_1 {
    padding: 0 30px;
    .list {
      overflow: hidden;
      li {
        position: relative; width: 100%; height: 340px; margin-bottom: 30px; border-radius: 10px; overflow: hidden;
        .bg {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;
          img { display: block; width: 100%; height: 100%; border-radius: 10px }
        }
        .name {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; height: 60px; padding: 0 20px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 34px; color: #fff; background-color: rgba(0,0,0, .7);
          span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
          span:first-child { max-width: 55% }
          span:last-child { max-width: 45% }
        }
        .play_icon {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3;
          width: 100px; height: 100px;
          img { display: block; width: 100%; height: 100% }
        }
        &:not(:nth-child(3n)) { margin-right: 30px }
        &:active {
          .play_icon { opacity: 0.8 }
        }
      }
    }
  }
</style>
